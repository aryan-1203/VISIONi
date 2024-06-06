const express = require("express");

const bcrypt = require("bcryptjs");

const db = require("../data/database");
const session = require("express-session");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  let sessionInputData = req.session.inputData;

  if(!sessionInputData){
    sessionInputData = {
      hasError : false,
      message : '',
      email : '',
      confirmedEmail : '',
      password : '',
    }
  }
  res.render("signup", {inputData : sessionInputData});
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/signup", async function (req, res) {
  const userData = req.body;
  const userEmail = userData.email; // userData['email'];  is also an alternative
  const userConfirmedEmail = userData["confirm-email"];
  const userPassword = userData.password;

  if (
    !userEmail ||
    !userConfirmedEmail ||
    !userPassword ||
    userPassword.trim().length < 6 ||
    userEmail !== userConfirmedEmail ||
    !userEmail.includes('@')
  ){
    console.log('Incorrect data');

    req.session.inputData = {
      hasError : true,
      message : 'Invalid input-Please make changes',
      email : userEmail,
      confirmedEmail : userConfirmedEmail,
      password : userPassword,
    }
    return res.redirect('/signup');
  }

  const existingUser = await db
    .getDb()
    .collection('users')
    .findOne({ email: userEmail });

  if (existingUser) {
    console.log('User exists already');
    return res.redirect('/signup');
  }

  const hashedPassword = await bcrypt.hash(userPassword, 10);

  const user = {
    // Creating a doc named user
    email: userEmail,
    password: hashedPassword,
  };

  // console.log(hashedPassword);
  await db.getDb().collection("users").insertOne(user);

  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const userEmail = userData.email;
  const userPassword = userData.password;
  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: userEmail });

  if (!existingUser) {
    console.log("UserEmail Not Found");
    return res.redirect("/login");
  }

  const passmatch = await bcrypt.compare(userPassword, existingUser.password);
  // console.log(passmatch);

  if (!passmatch) {
    console.log("Wrong User Credentials -> Wrong password");
    return res.redirect("/login");
  }

  console.log("Credentials Matched");

  req.session.user = {id : existingUser._id, email : existingUser.email};
  req.session.isAuthenticated = true;
  req.session.save(function(){
    res.redirect("/admin");              // Now this executes only when the data is stored to the session database
  })
});


router.get("/admin", function (req, res) {
  if(!req.session.isAuthenticated){
    return res.status(401).render('401');
  };
  res.render("index");
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect('/');
});

router.get('/blog',(req, res)=>{
  const articles = [{
    title: 'Test Article',
    createdAt: new Date(),
    description: 'Test Description'
  }]
  res.render('blog', {articles: articles});
})

module.exports = router;
