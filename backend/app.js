require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo');

const port = process.env.PORT || 3000; // Valor por defecto si PORT no está definido
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Importa y usa tus rutas desde un archivo separado
app.use("/api", require('./routes'));

// Conectar a la base de datos y luego iniciar el servidor
dbConnect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Tu app está lista en http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos', error);
    });
