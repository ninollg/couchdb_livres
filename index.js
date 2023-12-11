const express = require("express");
const app = express();
const nano = require('nano')('http://lln4432a:Lel!ege2003!@127.0.0.1:5984');
const dbLivres = nano.db.use('api_livres');

app.use(express.json());

const Joi = require('joi');

const livreSchema = Joi.object({
  _id: Joi.string().required(),
  _rev: Joi.string().required(),
  titre: Joi.string().required(),
  numero: Joi.number().integer().required(),
  resume: Joi.string().required(),
  pages: Joi.array().items(Joi.string()),
  auteur: Joi.string().required(),
  date: Joi.date().required(),
  nombrePages: Joi.number().integer().required(),
  isbn: Joi.number().integer().required(),
});

module.exports = livreSchema;


app.get("/", (req, res) => {
  res.send("api livres");
});


app.get("/livres", async(req, res) => {
  const query = {
      "selector": {},
      "fields": ["titre"]
  }
  let liste = await dbLivres.find(query)
  res.json(liste)
});


app.get('/livres/:idLivre', async (req, res) => {
  const livreId = req.params.idLivre;
  try {
    const livre = await dbLivres.get(livreId);
    res.json(livre);
  } catch (error) {
    res.status(404).json({ error: 'Livre non trouvé' });
  }
});

app.get('/livres/:idLivre/pages', async (req, res) => {
  const livreId = req.params.idLivre;
  try {
    const livre = await dbLivres.get(livreId);
    const pages = livre.pages || [];
    res.json(pages);
  } catch (error) {
    res.status(404).json({ error: 'Livre non trouvé' });
  }
});

app.get('/livres/:idLivre/pages/:numPage', async (req, res) => {
  const { idLivre, numPage } = req.params;
  try {
    const livre = await dbLivres.get(idLivre);
    const pages = livre.pages;
    const page = pages.find((p) => p.numero === parseInt(numPage, 10));
    if (page) {
      res.json(page);
    } else {
      res.status(404).json({ error: 'Page non trouvée' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Livre non trouvé' });
  }
});

app.post('/livres', async (req, res) => {
  const nouveauLivre = req.body;
  try {
    const response = await dbLivres.insert(nouveauLivre);
    res.json({ message: 'Livre ajouté avec succès', id: response.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.delete('/livres/:numLivre', async (req, res) => {
  const numLivre = req.params.numLivre;

  try {
    const query = {
      selector: {
        numero: parseInt(numLivre, 10),
      },
      fields: ['_id', '_rev'],
    };

    const result = await dbLivres.find(query);

    if (result.docs.length > 0) {
      const livre = await dbLivres.get(result.docs[0]._id, { rev: result.docs[0]._rev });
      await dbLivres.destroy(livre._id, livre._rev);
      res.json({ message: 'Livre supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Livre non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(8080, () => {
  console.log("Server started");
});