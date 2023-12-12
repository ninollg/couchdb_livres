const express = require("express");
const LivresRouter = express.Router();

const LivresController = require("../controller/LivresController.js");

LivresRouter.get("/livres", LivresController.liste);
LivresRouter.get("/livres/:idLivre", LivresController.afficherLivre);
LivresRouter.get("/livres/:idLivre/pages", LivresController.afficherPages);
LivresRouter.get("/livres/:idLivre/pages/:numPage", LivresController.afficherPage);
LivresRouter.post("/livres", LivresController.ajouterLivre);
LivresRouter.delete("/livres/:numLivre", LivresController.supprimerLivre);
LivresRouter.put("/livres", LivresController.modifierLivre);



module.exports={LivresRouter}