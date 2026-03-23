const express = require ('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger/swagger');
const articleRouter = require('./routes/articles');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../')));

// API routes
app.use('/api/articles', articleRouter);

// Route pour servir index.html sur la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
    console.log(`Voici le lien: http://localhost:${PORT}`);
    console.log(`Pour les API articles: GET/POST http://localhost:${PORT}/api/articles`);
});

module.exports = app;