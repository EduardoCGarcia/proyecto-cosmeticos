const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        lastname: {
            type: String
        },
        num_cuenta: {
            type: String,
            unique: true
        },
        /* email: {
            type: String,
            unique: true
        }, */
        password: {
            type: String,
        },
        role: {
            type: ["user", "admin"],
            default: "user"
        },
        /* avatar: {
            type: String
        }, */
    },
    {
        timestamps: true,
        versionKey: false
    }
)

UserSchema.plugin(mongooseDelete, {overrideMethods:"all"});

module.exports =  mongoose.model("users", UserSchema);