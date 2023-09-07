const { Schema, models, model } = require("mongoose")

const CampingDataSchema = new Schema({
    primaryTitle: {type: String, required: true},
    primaryInfo: String,
    primaryImage: [{type: String}],
    activeBotton: Boolean,
    textBotton: String,
}, {
    timestamps: true,
})

export const CampingData = models?.CampingData || model('CampingData', CampingDataSchema);