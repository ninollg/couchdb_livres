const express = require("express");
const LivresRouter = express.Router();

const LivresController = require("../controller/LivresController.js");

LivresRouter.get("/livres", LivresController.liste);


module.exports={LivresRouter}