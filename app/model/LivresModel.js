const nano = require('nano')('http://lln4432a:Lel!ege2003!@127.0.0.1:5984');
const dbLivres = nano.db.use('api_livres');

const Livres = async () => {
  const query = {
    selector: {},
    fields: ["titre"],
  };
  let liste = await dbLivres.find(query);
  return liste.docs;
};

const afficherLivre = async (livreId) => {
  const livre = await dbLivres.get(livreId);
  return livre;
};

const afficherPages = async (livreId) => {
  const livre = await dbLivres.get(livreId);
  const pages = livre.pages || [];
  return pages;
};

const afficherPage = async (livreId, numPage) => {
  const livre = await dbLivres.get(livreId);
  const pages = livre.pages;
  const page = pages.find((p) => p.numero === parseInt(numPage, 10));
  return page;
};

const ajouterLivre = async (nouveauLivre) => {
  const { value, error } = livreSchema.validate(nouveauLivre);
  if (error) {
    throw new Error(error.message);
  } else {
    const response = await dbLivres.insert(nouveauLivre);
    return { id: response.id };
  }
};

const supprimerLivre = async (numLivre) => {
    //   j'ai utilisé chatgpt pour ce query
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
  } else {
    throw new Error('Livre non trouvé');
  }
};

const modifierLivre = async (modifLivre) => {
  const { value, error } = livreSchema.validate(modifLivre);
  if (error) {
    throw new Error(error.message);
  } else {
    const response = await dbLivres.insert(modifLivre);
    return { id: response.id };
  }
};

module.exports = {
  Livres,
  afficherLivre,
  afficherPages,
  afficherPage,
  ajouterLivre,
  supprimerLivre,
  modifierLivre
};
