const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const ArticleSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
            unique: true
        },
        nombre: {
            type: String
        },
        cantidad: {
            type: Number
        },
        precio: {
            type: Number
        },
        marca: {
            type: String
        },
        modelo: {
            type: String
        },
        num_serie: {
            type: String
        },
        estado: {
            type: String
        },
        caracteristicas: {
            type: String
        },
        ubicacion: {
            type: String
        },
        imagen_url: {  // Campo para la URL de la imagen
            type: String,
            default: "http://localstorage:3000/file-1717954187867.png"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

ArticleSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("articles", ArticleSchema);
