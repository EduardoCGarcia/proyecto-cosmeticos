const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

// Subesquema para los artículos dentro de una venta
const VentaItemSchema = new mongoose.Schema(
    {
        articulo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'articles', // Referencia al esquema de artículos
            required: true
        },
        cantidad: {
            type: Number,
            required: true,
            min: 1
        },
        precio_unitario: {
            type: Number,
            required: true
        }
    },
    {
        _id: false // No se necesita un _id para cada artículo en la venta
    }
);

// Esquema para las ventas
const VentaSchema = new mongoose.Schema(
    {
        codigo_venta: {
            type: String,
            unique: true,
            required: true
        },
        fecha: {
            type: Date,
            default: Date.now,
            required: true
        },
        cliente: {
            type: String,
            required: true
        },
        articulos: [VentaItemSchema], // Array de subesquemas
        total: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

VentaSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("ventas", VentaSchema);
