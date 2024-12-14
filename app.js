import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("Public"))


 
const blogList = [
    { id: "1", Catogorie: "Travel", Title: "The Magic of Travel: Discovering New Horizons", Content: "Travel is more than just visiting new places", Image: "http://localhost:3000/Images/traveler.jpeg" },
    { id: "2", Catogorie: "Tech", Title: "A Beginner’s Guide to AI: Transforming Our World", Content: "Artificial Intelligence (AI) is changing the way we live...", Image: "http://localhost:3000/Images/AI.avif" },
    { id: "3", Catogorie: "Science", Title: "The Journey to Better Health: Key Tips and Trends", Content: "Health is one of the most important aspects of our lives...", Image: "http://localhost:3000/Images/health.avif", Bloger: "Malik Mubashir" },
    {id: '4', Catogorie: "Travel", Title : "New Jerney tword tech and better income", Content : "Lorem ipsam is dummy text and its comoletly dummy but usefull.", Image:"http://localhost:3000/Images/p4.avif"},
    {id: "5", Catagorie : "Tech", Title: "Title is title",Content: "Once he is alive funny", Image:"http://localhost:3000/Images/p2.jpeg"}
   ]; 
 

const editorsPicks = []

app.get("/", (req, res) => {  

    const data ={
        Posts : blogList,
        editorPics:editorsPicks,
        blogs:blogList,

    }

    res.render("Pages/home",data)
})



app.get("/create-post", (req, res) => {
    res.render("./Posts/new.ejs",)
    
})


app.get("/about", (req, res ) => {
    res.render("Pages/about")
})

app.get("/contact-us", (req, res) => {
    res.render("Pages/contact")
})


app.post("/add-post", (req, res) => {
      const newPost ={
        id:Date.now().toString(36) + Math.random().toString(36).substring(2, 9),
        Bloger: req.body["authorName"],
        Catogorie: req.body["category"],
        Image:req.body["image"],
        Title : req.body["title"],
        Content :req.body["content"],
      }
     
      blogList.push(newPost);
      res.redirect("/")
})



app.get("/View/:id" , (req, res) => {
    const reqId = req.params.id;
    const post = blogList.find( Post  => Post.id === reqId);
    if (post) {
        const data ={
            Post:post,
            Posts:blogList,   
        }
        res.render("./Posts/post.ejs",data)
    } else {
        res.status(404).render("./errors/404.ejs")
    }

})


app.get("/edit/:id", (req, res) => {
    const postId = req.params.id ;
    const post = blogList.find(Post => Post.id === postId)
    if (post){
        res.render("./Posts/edit",{Post:post})

    }
    else{
        res.status(404).render("./errors/404.ejs")
    }
})


// Post Method of update post
app.post("/update/:id", (req, res) => {
    const postId = req.params.id;
    const post = blogList.find(Post => Post.id === postId);

    if (post) {
        post.Blogger = req.body["authorName"];
        post.Image =   req.body["Image"];
        post.Title = req.body["title"];
        post.Catogorie =  req.body["category"];
        post.Content =   req.body["content"];
        res.redirect("/"); 
    } else {
        res.status(404).render("./errors/404.ejs");
    }
});




app.post("/delete/:id", (req, res) => {
    const postIdToDelete = req.params.id;
    const postIndex = blogList.findIndex(Post  => Post.id === postIdToDelete);
    if (postIndex !== -1) {
       blogList.splice(postIndex ,1);
       res.redirect("/")
    } else {
        res.status(404).render("./errors/404.ejs")
    }
    
})
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})