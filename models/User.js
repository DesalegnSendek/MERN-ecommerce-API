const mongoose = require('mongoose');


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
            required: true
        },
        lastname:{
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        state:{
            type: String,
            required: true
        },
        postalcode:{
            type: String,
            required: true
        },
        province:{
            type: String,
            required: true
        },
        country:{
            type: String,
            required: true
        },
        phone:{
            type: String,
            required: true
        },
    }
},
{
    timestamps: true
});


//compile the schema to model objects
const User = mongoose.model('User', userSchema);
module.exports = User;