// user, title, profilePics, links: {fb, twi, }, posts, bookmarks

const { Schema, model } = require('mongoose')
const Post = require('./Post')


const profile = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    title: {
        type: String,
        maxlength: 100,
        trim: true
    },
    bio: {
        type: String,
        maxlength: 500,
        trim: true
    },
    profilePic: String,
    links: {
        website: String,
        facebook: String,
        twitter: String,
        github: String
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {
    timestamps: true
})

const Profile = model('Profile', profile)
module.exports = Profile