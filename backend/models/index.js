const models = {
    usersModel : require("./mongo/users"),
    articlesModel : require("./mongo/article"),
    storageModel: require("./mongo/storage")
};

module.exports = models;