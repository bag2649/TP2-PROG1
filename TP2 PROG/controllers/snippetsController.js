"use strict";

// Récupère le modèle Snippet
const Snippet = require('../models/snippet');


// Utilise la méthode find() afin de récupérer tous les snippets
// Retourne un Promesse
exports.getSnippets = (req, res, next) => {
  Snippet.find().sort({ createdAt: -1})
  .then(snippets => {
    res.render('index', {
      snippets: snippets,
      pageTitle: 'Accueil'
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
};



// Récupère un snippet grâce à son id
exports.getSnippet = (req, res, next) => {
  const snippetId = req.params.snippetId;
  Snippet.findById(snippetId)
  .then(snippet => {
    res.render('snippet', {
      snippet: snippet,
      pageTitle: 'Snippet'
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
};

exports.getAddSnippet = (req, res, next) => {
  res.render('add-snippet', {
    pageTitle: "Ajouter un snippet",
    errorMessage: null
  })
};

exports.createSnippet = (req, res, next) => {
  const { title, content, url, tags } = req.body
  let tag = tags.split(" ");
  const snippet = new Snippet({
    title: title,
    content: content,
    url: url,
    tags: tag,

  });

  snippet.save()
    .then(result => {
      res.redirect('/')
    })
    .catch(err => {
      return res.render('add-snippet', {
        pageTitle: "Ajouter un snippet",
        errorMessage: err.errors
      })
    })


}

exports.getEditSnippet = (req, res, next) => {
  const snippetId = req.params.snippetId;
  Snippet.findById(snippetId)
    .then(snippet =>{
      res.render('edit-snippet', {
        pageTitle: "Modifier l'snippet",
        snippet: snippet,
        errorMessage: null
      })
    })
    .catch(err => {
      console.log('err', err)
    })
}


exports.updateSnippet = (req, res, next) => {
  const { snippetId, title, content, url, tags } = req.body
  let tag = tags.split(" ");
  Snippet.findById(snippetId)
  .then(snippet => {
    snippet.title = title;
    snippet.content = content;
    snippet.url = url;
    snippet.tags = tag;
    return snippet.save()
  })
  .then( result => {
    res.redirect('/')
  })
  .catch(err => {
    return res.render('edit-snippet', {
      pageTitle: "Modifier l'snippet",
      errorMessage: err.errors,
      snippet : {
        _id: snippetId,
        title: title,
        content: content,
        url: url,
        tags: tag,
      }
    })
  })
}


exports.deleteSnippet = (req, res, next) => {
const snippetId = req.params.snippetId

Snippet.findByIdAndRemove(snippetId)
  .then(_ => {
    res.redirect("/")
  })
  .catch(err => {
    console.log('err', err)
  })
}

