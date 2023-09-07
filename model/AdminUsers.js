const { Schema, models, model } = require("mongoose")

const AdminUsersSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
}, {
    timestamps: true,
})

export const AdminUsers = models?.AdminUsers || model('AdminUsers', AdminUsersSchema);