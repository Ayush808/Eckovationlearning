const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true,
    },
    enrolled: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    curriculum: [
        {
            topic: String,
            subtopic: [String]
        }
    ],
    instructor: [
        {
            name: String,
            qualification: String,
            about: String
        }
    ]
},
    { timestamps: true }
)


module.exports = mongoose.model('Course', courseSchema)