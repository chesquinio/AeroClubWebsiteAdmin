const { Schema, models, model } = require("mongoose")

const AeroClubDataSchema = new Schema({
    primaryTitle: {type: String, required: true},
    primaryInfo: String,
    primaryImage: [{type: String}],
    activeBotton: Boolean,
    textBotton: String,
}, {
    timestamps: true,
})

export const AeroClubData = models?.AeroClubData || model('AeroClubData', AeroClubDataSchema);