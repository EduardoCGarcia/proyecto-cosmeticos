const { ventasModel } = require("../models");
const { matchedData } = require("express-validator");
const handleHttpError = require("../utils/handleError");

/**
 * Obtiene todas las ventas
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await ventasModel.find({}).populate('articulos.articulo').populate('cliente');
        res.send(data);
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_GET_ITEMS");
    }
};

/**
 * Obtener un detalle de una venta
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await ventasModel.findById(id).populate('articulos.articulo').populate('cliente');
        res.send(data);
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_GET_ITEM");
    }
};

/**
 * Crea una nueva venta
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const { codigo_venta, fecha, cliente, articulos, total } = matchedData(req);
        const ventaData = {
            codigo_venta,
            fecha,
            cliente,
            articulos,
            total
        };

        const data = await ventasModel.create(ventaData);
        res.send(data);
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_CREATE_ITEM");
    }
};

/**
 * Elimina una venta
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await ventasModel.delete({ _id: id });
        res.send(data);
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_DELETE_ITEM");
    }
};

/**
 * Actualiza una venta
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await ventasModel.findByIdAndUpdate(id, body, { new: true }).populate('articulos.articulo').populate('cliente');
        res.send(data);
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_UPDATE_ITEM");
    }
};

/**
 * Obtiene todas las ventas de un cliente específico
 * @param {*} req 
 * @param {*} res 
 */

const getVentasPorFecha = async (req, res) => {
    try {
        const { fechaVenta } = matchedData(req);

        // Convertir la fecha a un rango de inicio y fin del día
        const startDate = new Date(fechaVenta);
        startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date(fechaVenta);
        endDate.setUTCHours(23, 59, 59, 999);

        // Realizar la consulta usando el rango de fechas
        const data = await ventasModel.find({
        fecha: {
            $gte: startDate,
            $lte: endDate
        }
        }).populate('articulos.articulo').populate('cliente');

        console.log(fechaVenta);
        res.send(data);
/*
        const { fechaVenta } = matchedData(req);
        const data = await ventasModel.find({ fecha: fechaVenta }).populate('articulos.articulo').populate('cliente');
        console.log(fechaVenta);
        res.send(data);
        */
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_GET_VENTAS_POR_FECHA");
    }
};

const getVentasPorCliente = async (req, res) => {
    try {
        const { clienteId } = matchedData(req);
        const data = await ventasModel.find({ cliente: clienteId }).populate('articulos.articulo').populate('cliente');
        res.send(data);
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_GET_VENTAS_POR_CLIENTE");
    }
};

module.exports = { createItem, getItems, getItem, deleteItem, updateItem, getVentasPorCliente, getVentasPorFecha };
