const { Schema, models, model } = require("mongoose")

const TennisDataSchema = new Schema({
    primaryTitle: {type: String, required: true},
    primaryInfo: String,
    primaryImage: [{type: String}],
    activeBotton: Boolean,
    textBotton: String,
}, {
    timestamps: true,
})

export const TennisData = models?.TennisData || model('TennisData', TennisDataSchema);