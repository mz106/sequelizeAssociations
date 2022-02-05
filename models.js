const { DataTypes } = require("sequelize");
const connection = require("./connection");

const Capital = connection.define("capital", 
    {
        capitalName: {
            type: DataTypes.STRING,
            unique: true
        },
        citySize: {
            type: DataTypes.INTEGER,
            unique: false
        }
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

const City = connection.define("city", 
    {
        cityName: {
            type: DataTypes.STRING,
            unique: true
        },
        citySize: {
            type: DataTypes.INTEGER,
            unique: false
        }
    }
);

Country.hasOne(Capital);
Capital.belongsTo(Country);

Country.hasMany(City);
City.belongsTo(Country);

module.exports = {Country, Capital, City}