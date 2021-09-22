//idula naaga schema create panna porom... so enguluku mongoose tewa
const mongoose = require("mongoose")

//create book schema
const BookSchema = mongoose.Schema (//S capital la ikanum 
    {
        ISBN : String,      //databasea mongodb la create pannuvom.inga schema va create pannurom
        title: String,
        pubDate:String,
        language:String,
        numPage:Number,
        author: [Number],
        publication:[Number],
        category:[String] 
    }
)

//Create a model : bcz u can't directly use schema.u have to to use it in terms of the model
const BookModel = mongoose.model("books",BookSchema);//remember,in mongodb we had created one database called books

module.exports = BookModel