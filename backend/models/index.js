const models = {
    usersModel : require("./mongo/users"),
    articlesModel : require("./mongo/article"),
    storageModel: require("./mongo/storage"),
    ventasModel: require("./mongo/venta")
};

module.exports = models;