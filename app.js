const path = require("path");

const express = require("express");

const app = express();

const db = require("./data/database");

const session = require("express-session");

const mongodbStore = require('connect-mongodb-session');

const mongoose = require('mongoose');

const methodOverride = require('method-override')

const MongoDBStore = mongodbStore(session);

const sessionStore = new MongoDBStore({
    uri :'mongodb+srv://CONNECtIt:CONNECtIt@cluster0.jzll7mx.mongodb.net/?retryWrites=true&w=majority',
    databaseName : 'auth-demo',
    collection : 'sessions'
})


mongoose.set('strictQuery', true);
// mongoose.connect('mongodb://127.0.0.1:27017/myblog');

// Isko pehle use karna hai 
app.use(methodOverride('_method'))
// Isko upar vale k baad use karna hai 

const defroute = require("./routes/default_routes");
const tracroute = require("./routes/tracroute");
const harroute = require("./routes/harroute");
const demoRoutes = require("./routes/demo");
const articleRouter = require('./routes/articles');
const schemeRouter = require('./routes/schemes');
const questionRouter = require('./routes/questions');
const Article = require('./data/article')

app.set("views", path.join(__dirname, "views"));
// console.log(path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret : 'VISIONi',
  resave : false,
  saveUninitialized : false,
  store : sessionStore
}));

app.use(demoRoutes);
app.use("/", defroute);
app.use("/", tracroute);
app.use("/", harroute);
app.use('/articles', articleRouter);
app.use('/schemes', schemeRouter);
app.use('/questions', questionRouter);
// app.use("/",articleRoutes);



// app.use(function (req, res) {
//   res.status(404).render("404");
// });

// app.use(function (error, req, res, next) {
//   res.status(500).render("500");
// });


// MONGOOSE SECTION (Linking the data to database)
try {
  mongouri="mongodb+srv://CONNECtIt:CONNECtIt@cluster0.jzll7mx.mongodb.net/?retryWrites=true&w=majority";
  mongoose.connect( mongouri, ()=>{
      console.log("mongoose server up and running for Ques/Ans")
  })
  
} catch (error) {
  console.log(error);
  
}

// SCHEMA
const composeSchema ={
  title:String,
  content:String
}

// CREATING THE COLLECTION 
const post = mongoose.model("blogs",composeSchema);

// compose
app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const Post = new post({
      title: req.body.title,
      content: req.body.content
  });

  Post.save();
  res.redirect("/blogs");
})
// Blog page intialization
const bloginfo = "Welcome to VISIONi, dedicated to helping farmers succeed. We understand the challenges and hard work that goes into running a farm, and we're here to support you every step of the way. Our services range from providing expert advice on sustainable farming practices, to connecting farmers with local markets to sell their produce. We also offer a variety of resources such as crop planning guides, weather forecasts, and access to the latest agricultural technology. Our goal is to empower farmers with the tools and knowledge they need to thrive in their operations. Join our community of farmers today and start reaping the benefits of our resources and support.";
app.get("/blogs",  function(req, res){
  post.find({},(err,posts) => {
  //    console.log(posts.title);
      res.render("blogs",{
      initial:bloginfo,
      blogpost:posts
     });

  });
  
});

// custom post pages

app.get("/blogpost/:Postid" , (req, res) => {
  const reqid = req.params.Postid;
  post.findOne({_id:reqid}, (err,post)=>{
      if(err){
          console.log(err);
      }else{
          res.render("post", {
              title: post.title,
              body: post.content
          });
      }
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
db.connectToDatabase().then(function () {
  app.listen(3000);
});


