const mongoose=require('mongoose')

const userSChema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    fsense: {
        type: [Number],
        default: [0, 0, 0, 0, 0, 0],
    },
    gender: {
        type: String,
        default: 'unknown' 
    },
    bodyType: {
        type: String,
        default: 'unknown' 
    },
    skinTone: {
        type: String,
        default: 'unknown' 
    },
    occasion: {
        type: String,
        default: 'general'
    },
    season: {
        type: String,
        default: 'unknown'
    },
    notes: {
        type: String,
        default: ''
    }
});

const UserModel = mongoose.model("users", userSChema);
module.exports = UserModel;