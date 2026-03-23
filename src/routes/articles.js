const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article_controller');

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Creer un article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               contenu:
 *                 type: string
 *               auteur:
 *                 type: string
 *               date:
 *                 type: string
 *               categorie:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Article cree
 *       400:
 *         description: Donnees invalides
 */
router.post('/', articleController.createArticle);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Lister tous les articles
 *     tags: [Articles]
 *     parameters:
 *       - name: categorie
 *         in: query
 *         type: string
 *       - name: auteur
 *         in: query
 *         type: string
 *       - name: date
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Liste d'articles
 */
router.get('/', articleController.getArticles);

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Chercher des articles
 *     tags: [Articles]
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Resultats de recherche
 */
router.get('/search', articleController.searchArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Recuperer un article par ID
 *     tags: [Articles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Article trouve
 *       404:
 *         description: Article non trouve
 */
router.get('/:id', articleController.getArticleById);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Modifier un article
 *     tags: [Articles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               contenu:
 *                 type: string
 *               auteur:
 *                 type: string
 *               date:
 *                 type: string
 *               categorie:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Article modifie
 *       404:
 *         description: Article non trouve
 */
router.put('/:id', articleController.updateArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Articles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Article supprime
 *       404:
 *         description: Article non trouve
 */
router.delete('/:id', articleController.deleteArticle);

module.exports = router;