const { Schema, models, model } = require("mongoose")

const ClubUsersSchema = new Schema({
    name: {type: String, required: true},
    nameId: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
}, {
    timestamps: true,
})

export const ClubUsers = models?.ClubUsers || model('ClubUsers', ClubUsersSchema);