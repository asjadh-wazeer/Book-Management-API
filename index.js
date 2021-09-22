require("dotenv").config()

const express = require("express");
const mongoose = require('mongoose');
var bodyParser = require("body-parser");

//database
const database = require("./database/database"); //    (./ bcz same file(same parent) )

//export models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");


const booky = express() //initialize

booky.use(bodyParser.urlencoded({extended:true}));

//this is for extra security
booky.use(bodyParser.json());


//connect the mongooges with the database
mongoose.connect(process.env.MONGO_URL,/*now my database is secured*/ 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
).then(()=>console.log("Connection Established"))


/*
Route            /
Description      Get all the books
Access           PUBLIC
Parameter        NONE
Methods          GET
*/ 

//Get all the book
booky.get("/",async(req,res)=>{
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
})

/*
Route            /is
Description      Get specific book on ISBN
Access           PUBLIC
Parameter        isbn
Methods          GET
*/
booky.get("/is/:isbn",async (req,res)=>{
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});
     
    //null !0=1 , !1=0
    if(!getSpecificBook){
        return res.json({error: `No book for the ISBN of ${req.params.isbn}`});
    }
    return res.json({book: getSpecificBook});

})

/*
Route            /c
Description      Get specific book on Category
Access           PUBLIC
Parameter        Category
Methods          GET
*/
booky.get("/c/:category",async (req,res)=>{
    const getSpecificBook = await BookModel.findOne({category : req.params.category}) 
        
    
    if(!getSpecificBook){
        return res.json({error: `No book for the category of ${req.params.category}`});
    }
    return res.json({book: getSpecificBook});
})




/* 
Route            /ln
Description      Get specific book on Languages
Access           PUBLIC
Parameter        language
Methods          GET
*/
booky.get("/ln/:language",async(req,res)=>{
    const getSpecificBook = await BookModel.findOne({language : req.params.language})
    if(!getSpecificBook){
        return res.json({error: `No book for the language of ${req.params.language}`});
    }
    return res.json({book: getSpecificBook});
})




/*
Route            /author
Description      Get all authors
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
booky.get("/author",async(req,res)=>{
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors)
})


/* */
/* 
Route            /au
Description      Get a specific author on id
Access           PUBLIC
Parameter        id
Methods          GET
*/

booky.get("/au/:id",async(req,res)=>{
    const getSpecificAuthor = await AuthorModel.findOne({id : req.params.id})
    
    if(!getSpecificAuthor){
        return res.json({error: `This author ${req.params.id} is not founded`});
    }
    return res.json({Author: getSpecificAuthor});
})





/**now ***/

/*
Route            /author/book
Description      Get a list of authors based on books
Access           PUBLIC
Parameter        isbn
Methods          GET
*/
booky.get("/author/book/:isbn",async(req,res)=>{
    

    const getSpecificAuthor = await AuthorModel.findOne({isbn:req.params.isbn})
    
    /*const getSpecificAuthor = database.author.filter (
        (author)=> author.books.includes(req.params.isbn)
    )*/
    if(!getSpecificAuthor){
        return res.json ({
            error:`No author found for the book of ${req.params.isbn}`
        })
    }
    return res.json({authors : getSpecificAuthor})
})



/*
Route            /publications
Description      Get all the publications
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.get("/publications" ,async (req,res) => {
    const getAllPublication = await PublicationModel.find();
    return res.json(PublicationModel);
})


/*now */
/* 
Route            /p
Description      Get a specific publications
Access           PUBLIC
Parameter        id
Methods          GET
*/

booky.get("/p/:id",async(req,res)=>{

    const getSpecificPublication = await PublicationModel.findOne({id:req.params.id})
   
        if (!getSpecificPublication){
            return res.json({error: `No publication found on ${req.params.id}`})
        }
        return res.json({Publication : getSpecificPublication})
})

/**now */
/* 
Route            /publication/book/
Description      Get a list of publications based on a book
Access           PUBLIC
Parameter        isbn
Methods          GET
*/

booky.get("/publication/book/:isbn",async(req,res)=>{
    
    const getPublications = await PublicationModel.findOne({isbn : req.params.isbn})
    
        if (!getPublications){
            return res.json({error: `No publication found on ${req.params.isbn}`})
        }
        return res.json({book : getPublications})
})


//***************POST*******************


/* 
Route            /book/new
Description      Add new books
Access           PUBLIC
Parameter        NONE
Methods          POST
*/
booky.post("/book/new",async (req,res)=>{
    const {newBook} = req.body; 
    const addNewBook = BookModel.create(newBook);
    return res.json({
        books:addNewBook,
        message:"Book was added!!!"
    })

    
})



/* 
Route            /author/new
Description      Add new authors
Access           PUBLIC
Parameter        NONE
Methods          POST
*/
booky.post("/author/new",async (req,res)=>{  
    const { newAuthor } = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json(
        {
        author:addNewAuthor,
        message:"Author was added!!!"
    }
    )
})



/* 
Route            /publication/new
Description      Add new publication
Access           PUBLIC
Parameter        NONE
Methods          POST
*/
booky.post("/publication/new",async(req,res)=>{  
    const {newPublication} = req.body;
    const addNewPublication = PublicationModel.create(newPublication)

        return res.json({
            publication : addNewPublication,
            message : "Publication was added!!!"
        })
})

/**********  PUT  **********/ /*NEW*/
/* 
Route            /book/update/
Description      Update book on ISBN
Access           PUBLIC
Parameter        NONE
Methods          PUT
*/
booky.put("/book/update/:isbn",async(req,res)=>{ /*we want to use await also.that's why we have to use async here*/
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn 
        },
        {
            //you want to update title 
            title: req.params.bookTitle  //title is unique //it's not something add or which can have an array something that
        },
        {
            new:true  //it show every updated things in frontend
        }
    );
    return res.json({
        books:updatedBook
    });

});

/*********UPDATING NEW AUTHOR ************/
/* 
Route            /book/author/update/
Description      Update or add new author
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/
booky.put("/book/author/update/:isbn",async(req,res)=>{ 
    //update book database
    const updatedBook=await BookModel.findOneAndUpdate(
        { //searching isbn through our parameter
            ISBN:req.params.isbn
        },
        {
            $addToSet: { 
                authors:req.body.newAuthor
            }
        },
        {
            new:true
        })
        // update the author database
        const updatedAuthor=await AuthorModel.findOneAndUpdate(
            {
                id:req.body.newAuthor
            },
            {
                $addToSet: {
                    books:req.params.isbn
                }
            },
            {
                new:true
            }
        )
        return res.json( 
            {
                books:updatedBook,
                authors:updatedAuthor,
                message:"New author was added"
            }
        )
});


/* 
Route            /publication/new
Description      Update or add new publication
Access           PUBLIC
Parameter        NONE
Methods          PUT
*/


booky.put("/publication/update/book/:isbn", (req,res) => {
    //Update the publication database
    database.publication.forEach((pub) => {
      if(pub.id === req.body.pubId) {
        return pub.books.push(req.params.isbn);
      }
    });
  
    //Update the book database
    database.books.forEach((book) => {
      if(book.ISBN === req.params.isbn) {
        book.publication = req.body.pubId;
        return;
      }
    });
  
    return res.json(
      {
        books: database.books,
        publications: database.publication,
        message: "Successfully updated publications"
      }
    );
  });



/************DELETE************/

/* 
Route            /publication/new
Description      Delete a book
Access           PUBLIC
Parameter        NONE
Methods          DELETE
*/ 
 
booky.delete("/book/delete/:isbn",async (req,res)=>{  
    const updatedBookDatabase = await BookModel.findOneAndDelete(
        { 
            ISBN:req.params.isbn
        }
    )
    return res.json({
        books:updatedBookDatabase
    });
});







booky.listen(3000,()=>{
    console.log("server is running")
})  