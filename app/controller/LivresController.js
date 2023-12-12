const LivresModel = require("../model/LivresModel.js");

const Joi = require('joi').extend(require('@joi/date'))

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

module.exports = { livreSchema };

const liste = async (req, res) => {
    try {
        const Livres = await LivresModel.Livres();
        res.json(Livres);
    } catch (error) {
        res.status(500).json({ erreur: error.message });
    }
};

const afficherLivre = async (req, res) => {
    const livreId = req.params.idLivre;
    try {
        const livre = await LivresModel.afficherLivre(livreId);
        res.json(livre);
    } catch (error) {
        res.status(404).json({ erreur: 'Livre non trouvé' });
    }
};

const afficherPages = async (req, res) => {
    const livreId = req.params.idLivre;
    try {
        const pages = await LivresModel.afficherPages(livreId);
        res.json(pages);
    } catch (error) {
        res.status(404).json({ erreur: 'Livre non trouvé' });
    }
};

const afficherPage = async (req, res) => {
    const { idLivre, numPage } = req.params;
    try {
        const page = await LivresModel.afficherPage(idLivre, numPage);
        if (page) {
            res.json(page);
        } else {
            res.status(404).json({ erreur: 'Page non trouvée' });
        }
    } catch (error) {
        res.status(404).json({ erreur: 'Livre non trouvé' });
    }
};

const ajouterLivre = async (req, res) => {
    const nouveauLivre = req.body;
    try {
        const response = await LivresModel.ajouterLivre(nouveauLivre);
        res.json({ message: 'Livre ajouté avec succès', id: response.id });
    } catch (error) {
        res.status(500).json({ erreur: error.message });
    }
};

const supprimerLivre = async (req, res) => {
    const numLivre = req.params.numLivre;
    try {
        await LivresModel.supprimerLivre(numLivre);
        res.json({ message: 'Livre supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ erreur: error.message });
    }
};

const modifierLivre = async (req, res) => {
    const modifLivre = req.body;
    try {
        const response = await LivresModel.modifierLivre(modifLivre);
        res.json({ message: 'Livre modifié avec succès', id: response.id });
    } catch (error) {
        res.status(500).json({ erreur: error.message });
    }
};

module.exports = {
    liste,
    afficherLivre,
    afficherPages,
    afficherPage,
    ajouterLivre,
    supprimerLivre,
    modifierLivre,
    
};