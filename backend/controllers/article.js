const { articlesModel } = require("../models");
const { matchedData, body } = require("express-validator");
const fs = require("fs");
const handleHttpError = require("../utils/handleError");
const { response } = require("express");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../article`

/**
 * Obtiene los todos los articulos 
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await articlesModel.find({});
        res.send(data);
    } catch (e) {
        console.log(e);
        handleHttpError(res, "EEROR_GET_ITEMS");
    }
}

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await articlesModel.find({ _id: id });
        res.send(data);
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
};

/**
 * Crea un nuevo articulo
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        req = matchedData(req);

        const data = await articlesModel.create(req);
        res.send(data);
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }

};

const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await articlesModel.delete({ _id: id })
        res.send(data);
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }

};

const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await articlesModel.findByIdAndUpdate(id, body);
        res.send(data);
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }

};
module.exports = { createItem, getItems, getItem, deleteItem, updateItem };