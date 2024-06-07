const { matchedData } = require("express-validator");
const handleHttpError = require("../utils/handleError");
const { encrypt, compare } = require("../utils/handlePassword");
const { usersModel } = require("../models");
const tokenSign = require("../utils/handleJwt");


const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);

        const password = await encrypt(req.password);
        const body = { ...req, password: password };

        const dataUser = await usersModel.create(body);

        dataUser.set('password', undefined, { strict: false });

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }

        res.send({ dataUser: data });

    } catch (error) {
        console.log(error)
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
}

const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({ num_cuenta: req.num_cuenta })
            .select('password name lastname role num_cuenta avatar');

        if (!user) {
            handleHttpError(res, "USER_NOT_EXIST");
            return;
        }

        const hashPassword = user.get('password');
        const check = await compare(req.password, hashPassword);

        if (!check) {
            handleHttpError(res, "PASSWORD_INVALID", 401);
            return;
        }

        user.set('password', undefined, { strict: false });

        const data = {
            token: await tokenSign(user),
            user
        }

        res.send(data);

    } catch (error) {
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
}

module.exports = { registerCtrl, loginCtrl };