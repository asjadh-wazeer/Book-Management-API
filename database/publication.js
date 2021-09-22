//idula naaga schema create panna porom... so enguluku mongoose tewa
const mongoose = require("mongoose")

//create publication schema
const PublicationSchema = mongoose.Schema (//S capital la ikanum 
    {
        id:Number,
        name:String,
        books:[String]
    }
)

//Create a model : bcz u can't directly use schema.u have to to use it in terms of the model
const PublicationModel = mongoose.model("publications",PublicationSchema);//remember,in mongodb we had created one database called books

module.exports = PublicationModel