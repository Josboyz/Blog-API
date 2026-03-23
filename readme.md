# Blog API

API backend simple pour un blog avec articles CRUD.

## Cloner le projet

```bash
git clone https://github.com/Josboyz/Blog-API.git
cd Blog-API
```

## Installation

```bash
npm install
```

## Lancer le serveur

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## Utilisation

### Interface Web
- URL : `http://localhost:3000`
- Créer, lister, et supprimer des articles depuis le navigateur

### API Endpoints

#### Créer un article
```
POST /api/articles
Content-Type: application/json

{
  "titre": "Mon article",
  "contenu": "Contenu de l'article",
  "auteur": "Jean",
  "date": "2026-03-23",
  "categorie": "Tech",
  "tags": ["javascript", "node"]
}
```

#### Lister tous les articles
```
GET /api/articles
```

#### Lister avec filtres
```
GET /api/articles?categorie=Tech&auteur=Jean&date=2026-03-23
```

#### Récupérer un article par ID
```
GET /api/articles/1
```

#### Chercher des articles
```
GET /api/articles/search?query=javascript
```

#### Modifier un article
```
PUT /api/articles/1
Content-Type: application/json

{
  "titre": "Titre modifié",
  "contenu": "Contenu modifié",
  "auteur": "Jean",
  "date": "2026-03-23",
  "categorie": "Tech",
  "tags": ["node"]
}
```

#### Supprimer un article
```
DELETE /api/articles/1
```

## Documentation API

Swagger UI disponible sur : `http://localhost:3000/api-docs`

## Technologies

- Node.js + Express
- SQLite
- Swagger (documentation API)

## Fichiers du projet

```
src/
  app.js              - Application principale
  db.js               - Connexion base de données
  controllers/
    article_controller.js
  models/
    article_model.js
  routes/
    articles.js
swagger/
  swagger.js          - Configuration Swagger
index.html            - Interface web
package.json          - Dépendances
```
