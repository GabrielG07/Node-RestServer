// =========================================
//  Puerto
// =========================================
process.env.PORT = process.env.PORT || 3000;

// =========================================
//  Entorno
// =========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =========================================
//  Vencimiento del Token
// =========================================
// 60 Segundo
// 60 Minutos
// 24 horas
// 30 Días
process.env.CADUCIDAD_TOKEN = '48h';

// =========================================
//  SEED de autenticación
// =========================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


// =========================================
//  Base de datos
// =========================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// =========================================
//  Google Client ID
// =========================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '629548821617-g1oedif43hvq7neqneidtfmklnrr6a41.apps.googleusercontent.com';