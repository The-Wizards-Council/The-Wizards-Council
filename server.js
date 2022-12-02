const express = require("express");
const { seed } = require("./data/index");
const { Spell } = require("./models/Spell");
const { Wizard } = require("./models/Wizard");

const app = express();
const port = 3011;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//EXAMPLES ON HOW TO WRITE ROUTES
//CRUD ROUTES FOR Wizards and Spells go here
// Verb
// GET - SELECT - (Searching a Resource or Querying)
// POST - INSERT - (Creating a Resource)
// PUT - UPDATE - (Updating a Resource)
// DELETE - DELETE - (Deleting a Resource)
// delete route done by Ahn 12/2/2022
app.delete("/wizards/:id", async (req, res) => {
  const wizard = await Wizard.findByPk(req.params.id);
  const deletedWizard = await wizard.destroy();
  res.send(deletedWizard);
});

app.delete("/spells/:id", async (req, res) => {
  const spell = await Spell.findByPk(req.params.id);
  const deletedSpell = await spell.destroy();
  res.send(deletedSpell);
});

// Noun
// Pokemons
// Trainers

// Thing #1 to note about Restful API Best Practices.
// Your endpoints (the nouns) should be pluralized

// When you think of REQ.QUERY think of FILTERING
// (The only thing it's used for is pagination)
// app.get("/witches", async (req, res) => {
//     // If you
//     const {type} = req.query;
//     let witch = await Witch.findAll({where: {type}});

//     res.send(witch)
// });

// We have been thinking about Object Oriented Programming since Week 5.

// We learned that with OOP we have the four principles:
// 1. Inheritence
// Objects have an IS A relationship

// Pokemon IS A type -> /pokemons/types
// Trainer IS A human -> "/humans/trainers"
// Dog IS A animal -> "/animals/dogs"

app.listen(port, () => {
  seed();
  console.log(`App listening on http://localhost:${port}`);
});
