const express = require("express");
const { seed } = require("./data/index");
const {Spell} = require("./models/Spell");
const {Wizard} = require("./models/Wizard");
const bcrypt = require('bcrypt');

const app = express();
const port = 3011;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
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

        // Pokemon IS A type -> /pokemons/types
        // Trainer IS A human -> "/humans/trainers"
        // Dog IS A animal -> "/animals/dogs"

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

// POST /register
// TODO - takes req.body of {username, password} and creates a new user with the hashed password
app.post("/register", async (req, res, next) => {
  try {
    let { student_name, isStudent, hogwartsHouse,password } = req.body;
    //create the salt
    let salt = await bcrypt.genSalt(5);
    //use bcrypt to hash the password
    const hashedPw = await bcrypt.hash(password, salt);
    //add user to db
   let createdUser= await Wizard.create({ student_name, isStudent, hogwartsHouse,password: hashedPw });
   if(createdUser){
    res.send(`successfully created new wizard ${username}`)
   }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.listen(port, () => {
    seed();
    console.log(`App listening on http://localhost:${port}`);
});