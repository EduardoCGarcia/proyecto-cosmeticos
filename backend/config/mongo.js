const mongoose = require('mongoose');

const dbConnect = () => {
    const DB_URL = process.env.DB_URL;
    return mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('*****CONEXION CORRECTA*****');
    })
    .catch((err) => {
        console.error('*****ERROR EN LA CONEXION*****', err);
        throw err; // Propagar el error para manejarlo en app.js
    });
}

module.exports = dbConnect;
