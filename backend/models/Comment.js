const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author:{
        userId: String,
        userName: String,
        img: String
    },
    content:{
        type: String,
        max: 500
    }
},
{timestamps:true}
);

module.exports = mongoose.model("Comment",  CommentSchema);