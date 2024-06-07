const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const ArticleSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
         //   require:true,
         //   index: true,
            unique:true
        },
        nombre: {
            type: String
        },
        cantidad:{
            type:Number
        },
        marca: {
            type: String,
        },
        modelo: {
            type: String,
        },
        num_serie: {
            type: String,
        },
        estado: {
            type: String,
        },
        caracteristicas: {
            type: String,
        },
        ubicacion: {
            type: String,
        },
        
    },
    {
        timestamps: true,
        versionKey: false
    }
)

ArticleSchema.plugin(mongooseDelete, {overrideMethods:"all"});

module.exports =  mongoose.model("articles", ArticleSchema);