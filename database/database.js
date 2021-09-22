const books =[            /*array of object */
    {
        ISBN : "12345Book",
        title: "Tesla!!",
        pubDate:"2021-08-05",
        language:"en",
        numPage:250,
        author: [1,2],
        publication:[1],
        category:["tech","space","education"] 
    }
]

const author = [
    {
        id:1,
        name:"aradhana",
        books:["12345Book","secreatBook"]
    },
    {
        id:2,
        name:"Elon Musk",
        books:["12345Book"]
    }
]

const publication = [
    {
        id:1,
        name:"writex",
        books:["12345Book"]
    }
]

module.exports = {books,author,publication}