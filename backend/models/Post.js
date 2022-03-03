const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    img:{
        type:String,
        default:""
    },
    image_id:{
        type:String,
        default:""
    },
    likes:{
        type: Array,
        default:[]
    },
    caption:{
        type: String,
        max: 500
    },
    techStack:{
        type: Array,
        default:[]
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
    ]
    
},
{timestamps:true}
);

module.exports = mongoose.model("Post",  PostSchema);