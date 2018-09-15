// Requires
const express = require('express');
let Categoria = require('../models/categoria');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();


// ==================================
// Mostrar todas las categorias
// ==================================
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Categoria.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    categorias,
                    cuantos: conteo
                });
            });
        });
});

// ==================================
// Mostrar una categoria por ID
// ==================================
app.get('/categoria/:id', (req, res) => {
    // Categoria.findById(...);

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

// ==================================
// Crear nueva categoria
// ==================================
app.post('/categoria', verificaToken, (req, res) => {
    // Regresa la nueva categoria
    // req.usuario._id
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

// ==================================
// Actualizar la descripcion de la categoria
// ==================================
app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    let body = {
        descripcion: req.body.descripcion
    };

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

// ==================================
// Eliminar una categoria
// ==================================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // Solo un administrador puede borrar categorias
    // Categoria.findByIdAndRemove

    let id = req.params.id;

    // res.json({
    //     ok: id
    // });

    Categoria.findByIdAndRemove(id, (err, categoriaDelete) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (categoriaDelete) {
            return res.status(400).json({
                ok: true,
                message: 'Categoria Eliminada'
            });
        }
    });
});

module.exports = app;