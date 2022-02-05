const { DataTypes } = require("sequelize");
const connection = require("./connection");

const Capital = connection.define("capital", 
    {
        capitalName: {
            type: DataTypes.STRING,
            unique: true
        },
    }, 
);

const Country = connection.define("country", 
    {
        countryName: {
            type: DataTypes.STRING,
            unique: true
        }
    }, 
);

Country.hasOne(Capital);
Capital.belongsTo(Country);

module.exports = {Country, Capital}