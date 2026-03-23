const articleModel = require('../models/article_model');

const createArticle = async (req, res) => {
  try {
    const { titre, contenu, auteur, date, categorie, tags } = req.body;
    
    if (!titre || !contenu) {
      return res.status(400).json({ error: 'Titre et contenu requis' });
    }
    
    const article = await articleModel.createArticle({
      titre, contenu, auteur, date, categorie, tags
    });
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getArticles = async (req, res) => {
  try {
    const filters = req.query; // { categorie, auteur, date }
    const articles = await articleModel.getArticles(filters);
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await articleModel.getArticleById(id);
    if (!article) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, contenu, auteur, date, categorie, tags } = req.body;
    
    if (!titre || !contenu) {
      return res.status(400).json({ error: 'Titre et contenu requis' });
    }
    
    const updated = await articleModel.updateArticle(id, {
      titre, contenu, auteur, date, categorie, tags
    });
    if (!updated) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await articleModel.deleteArticle(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }
    res.status(200).json({ message: 'Article supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchArticles = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Paramètre query requis' });
    }
    const results = await articleModel.searchArticles(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  searchArticles
};