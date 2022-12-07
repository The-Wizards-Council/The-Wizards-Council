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
   //Yohonna: Get routes for spells and wizards  

 //Yohonna: get all wizards
 app.get("/wizards", async(req, res) => {
    let wizard = await Wizard.findAll(req.params.id);
    res.send(wizard)
});

//Yohonna:get wizards by id 
   app.get("/wizards/:id", async (req, res) => {
    console.log(req.params.id)
    let wizard = await Wizard.findByPk(req.params.id);
    res.send(wizard)
});


//Yohonna:get spells by id 
app.get("/spells/:id", async (req, res) => {
    console.log(req.params.id)
    let spell = await Spell.findByPk(req.params.id);
    res.send(spell)
});

//Yohonna:get all spells 
app.get("/spells", async(req, res) => {
    let spell = await Spell.findAll(req.params.id);
    res.send(spell)
});

//Kris POST routes
    //Kris: POST new wizards
 app.post("/wizards", async(req, res, next) => {
    
  try {
  const wizard = await Wizard.create(req.body);
  res.send(wizard);
   } catch (error) {
  next(error);
  }
});
// Kris: POST new spells 
app.post("/spells", async(req, res, next) => {
  try {
  const spell = await Spell.create(req.body);
  res.send(spell);
  } catch (error) {
  next(error);
  }
});

//Kris: PUT wizards
// Update a single item to the Wizard and Spell database by id
app.put("/:id", async (req, res, next) => {
  try {
    await Wizard.update(req.body, {
      where: { id: req.params.id },
    });
    let putWizards = await Item.findAll();
    res.json(putWizards);
  } catch (error) {
    next(error);
  }
});
//Kris: PUT Spells
app.put("/:id", async (req, res, next) => {
  try {
    await Spell.update(req.body, {
      where: { id: req.params.id },
    });
    let putSpells = await Item.findAll();
    res.json(putSpells);
  } catch (error) {
    next(error);
  }
});


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
app.listen(port, () => {
  seed();
  console.log(`App listening on http://localhost:${port}`);
});
