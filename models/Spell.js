const Sequelize = require("sequelize");
const { database } = require("../db");

const Spell = database.define("spell", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
   
    item: {
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
    Spell
}