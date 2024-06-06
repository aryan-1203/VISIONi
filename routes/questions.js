const express = require("express");
const article = require("./../data/questions");
const router = express.Router();
const Article = require("./../data/questions");

router.get('/', async (req, res)=>{
    const articles = await Article.find()
    res.render('questions/index_blog', {articles: articles});
})

router.get("/new", (req, res) => {
  res.render("questions/new", { article: new Article() });
});

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("questions/edit", { article: article });
});

router.get("/:slug", async (req, res) => {
  // res.send(req.params.id)
  let article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("questions/show", { article: article });
});

router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/questions");
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      res.redirect(`/questions/${article.slug}`);
    } catch (e) {
      res.render(`questions/${path}`, { article: article });
    }
  };
}

module.exports = router;
