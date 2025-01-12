// title, body, author, tags, thumbnail, readtime, likes, dislikes, comments

const {Schema, model} = require('mongoose')
const User = require('./User')
const Comment = require('./Comment')

const post = new Schema({
    title: {
        type: String,
        maxlength: 100,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: String,
    readtime: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: Comment
    }]
}, {
    timestamps: true
})

const Post = model('Post', post)
module.exports = Post