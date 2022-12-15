const express = require("express");
const { seed } = require("./data/index");

const {Spell} = require("./models/Spell");
const {Wizard} = require("./models/Wizard");
const bcrypt = require('bcrypt');


const app = express();
const port = 3011;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  // POST /register
// TODO - takes req.body of { student_name, isStudent, hogwartsHouse,password} and creates a new user with the hashed password
app.post("/register", async (req, res, next) => {
  try {
    let { student_name, isStudent, isSuperUser, hogwartsHouse,password } = req.body;
    //create the salt
    let salt = await bcrypt.genSalt(5);
   
    //use bcrypt to hash the password
    const hashedPw = await bcrypt.hash(password, salt);

    //add user to db
   let createdUser= await Wizard.create( { student_name, isStudent, isSuperUser, hogwartsHouse,password:hashedPw });
   console.log(createdUser);
   if(createdUser){
    res.send(`successfully created new wizard ${student_name}`)
   }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post("/login", async (req, res, next) => {
    try{
      let { student_name, password } = req.body;
      //search db and find where username matches what is passed in
      let loginUser= await Wizard.findOne({
         where: { student_name
        } 
      });
      if(loginUser){
        let isMatching = await bcrypt.compare(password, loginUser.password);
        if(isMatching){
          res.send(`successfully logged in user ${student_name}`);
        }else{
          res.send(401, 'incorrect username or password');
        }
        }
      }catch(error){
        console.error(error);
        next(error);
      }
    });


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
  //  Kris: POST new wizards
 app.post("/wizards", async(req, res, next) => {
    
  try {
  const wizard = await Wizard.create(req.body);
  res.send(wizard);
   } catch (error) {
  next(error);
  }
});
//Kris: POST new spells 
app.post("/spells", async(req, res, next) => {
  try {
  const spell = await Spell.create(req.body);
  res.send(spell);
  } catch (error) {
  next(error);
  }
});

//Kris: PUT wizards
//Update a single item to the Wizard and Spell database by id
app.put("/wizards/:id", async (req, res, next) => {
  try {
    await Wizard.update(req.body, {
      where: { id: req.params.id },
    });
    let putWizards = await Wizard.findAll();
    res.json(putWizards);
  } catch (error) {
    next(error);
  }
});
//Kris: PUT Spells
app.put("/spells/:id", async (req, res, next) => {
  try {
    await Spell.update(req.body, {
      where: { id: req.params.id },
    });
    let putSpells = await Spell.findAll();
    res.json(putSpells);
  } catch (error) {
    next(error);
  }
});


//delete route done by Ahn 12/2/2022
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
