const express = require("express");
const router = express.Router();
const article = require("./../data/scheme");
const Article = require("./../data/scheme");

router.get('/', async (req, res)=>{
    const articles = await Article.find()
    res.render('schemes/index_blog', {articles: articles});
})

router.get("/new", (req, res) => {
  res.render("schemes/new", { article: new Article() });
});

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("schemes/edit", { article: article });
});

router.get("/:slug", async (req, res) => {
  // res.send(req.params.id)
  let article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("schemes/show", { article: article });
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
  res.redirect("/schemes");
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      res.redirect(`/schemes/${article.slug}`);
    } catch (e) {
      res.render(`schemes/${path}`, { article: article });
    }
  };
}

module.exports = router;
