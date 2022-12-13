const Sequelize = require("sequelize");
const { database } = require("../db");

const Spell = database.define("spell", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        timeStamps:true
       
    },
   
    spellName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    itemType: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = {
    Spell}
