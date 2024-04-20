const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        },
    ],
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WishList'
        },
    ],
    isAdmin:{
        type: Boolean,
        default: false
    },
    hasShippingAddress: {
        type: Boolean,
        default: false
    },
    shippingAddress:{
        firstname:{
            type: String,
            required: false
        },
        lastname:{
            type: String,
            required: false
        },
        address:{
            type: String,
            required: false
        },
        city:{
            type: String,
            required: false
        },
        state:{
            type: String,
            required: false
        },
        postalcode:{
            type: String,
            required: false
        },
        province:{
            type: String,
            required: false
        },
        country:{
            type: String,
            required: false
        },
        phone:{
            type: String,
            required: false
        },
    }
},
{
    timestamps: true
});


//compile the schema to model objects
const User = mongoose.model('User', userSchema);
module.exports = User;