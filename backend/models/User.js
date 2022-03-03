const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        min:3,
        max:20,
        unique: true
    },
    email:{
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 6,
    },
    profilePicture:{
        type:String,
        default:""
    },
    profilePic_id:{
        type:String,
        default:""
    },
    coverPicture:{
        type: String,
        default:""
    },
    followers:[
            {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following:[
            {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    bio:{
        type: String,
        default: "" 
    },
    techStack:{
        type: Array,
        default:[]
    }
    
},
{timestamps:true}
);

module.exports = mongoose.model("User",  UserSchema);