const db = require('../db');

const createArticle = (article) => {
  const { titre, contenu, auteur, date, categorie, tags } = article;
  const tagsString = tags ? JSON.stringify(tags) : null;
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [titre, contenu, auteur, date, categorie, tagsString], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, ...article, tags: tags || [] });
      }
    });
  });
};

const getArticles = (filters) => {
  const { categorie, auteur, date } = filters || {};
  let sql = 'SELECT * FROM articles';
  const conditions = [];
  const params = [];

  if (categorie) {
    conditions.push('categorie = ?');
    params.push(categorie);
  }
  if (auteur) {
    conditions.push('auteur = ?');
    params.push(auteur);
  }
  if (date) {
    conditions.push('date = ?');
    params.push(date);
  }

  if (conditions.length) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      const normalized = rows.map((r) => ({
        ...r,
        tags: r.tags ? JSON.parse(r.tags) : []
      }));
      resolve(normalized);
    });
  });
};

const getArticleById = (id)=>{
    return new Promise((resolve, reject)=>{
        const sql= 'SELECT * FROM articles WHERE id=?';
        db.get(sql, [id], (err,row)=>{
            if(err) return reject(err);
            if(!row) return resolve(null);
            row.tags=row.tags ? JSON.parse(row.tags) : [];
            resolve(row);
        })
    })
}

const updateArticle = (id, article) => {
  const {titre, contenu, auteur, date, categorie, tags} = article;
  const tagsString=tags ? JSON.stringify(tags): null;
  return new Promise((resolve, reject)=>{
    const sql ='UPDATE articles SET titre = ?, contenu = ?, auteur = ?, date = ?, categorie = ?, tags = ? WHERE id = ?';
    db.run(sql, [titre,contenu,auteur,date,categorie,tagsString, id], function (err) {
      if (err) return reject(err);
      if (this.changes === 0) return resolve(null);
      resolve({id, ...article});
    })
  })
}

const deleteArticle = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM articles WHERE id = ?';
    db.run(sql, [id], function (err){
      if (err) return reject(err);
      if (this.changes === 0) return resolve(false);
      resolve(true);
    })
  })
}

const searchArticles = (query) => {
  const like = `%${query}%`;
  const sql = 'SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ?';
  return new Promise((resolve, reject) => {
    db.all(sql, [like, like], (err, rows) => {
      if (err) return reject(err);
      const normalized = rows.map((r) => ({
        ...r,
        tags: r.tags ? JSON.parse(r.tags) : []
      }));
      resolve(normalized);
    });
  });
};

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  searchArticles
};