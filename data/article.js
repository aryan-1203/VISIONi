const mongoose = require("mongoose");
const { marked } = require('marked')
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
mongoose.set('strictQuery', true);


try {
  mongouri =
    "mongodb+srv://CONNECtIt:CONNECtIt@cluster0.jzll7mx.mongodb.net/?retryWrites=true&w=majority";
  mongoose.connect(mongouri, () => {
    console.log("mongoose server up and running for blogs");
  });
} catch (error) {
  console.log(error);
}

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
});

articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
  }

  next()
});

module.exports = mongoose.model("MeraNayaTest", articleSchema);
