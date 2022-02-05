const req = require("express/lib/request");
const { Sequelize } = require("sequelize");
const { Capital, Country } = require("./models");

const addCapital = async (req) => {
    try {
        const country = await findOneCountry(req);
        return await Capital.create({capitalName: req.body.capitalName, countryId: country.id});
    } catch (error) {
        console.log(error);
    }
};

const addCountry = async (req) => {
    try {
        // const capital = await Capital.findOne({where: {capitalName: req.body.capitalName}});
        const country = await Country.create({countryName: req.body.countryName});
        const capital = await country.createCapital({capitalName: req.body.capitalName});
        return {country, capital};
    } catch (error) {
        console.log(error);
    }
};

const findOneCapital = async (req) => {
    try {
        return await Capital.findOne({where: {capitalName: req.body.capitalName}});
    } catch (error) {
        console.log(error);
    }
}; 

const findOneCountry = async (req) => {
    try {
        const country = await Country.findOne({where: {countryName: req.body.countryName}});
        const capital = await country.getCapital({where: {countryId: country.id}})
        return {country, capital};
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    addCapital,
    addCountry,
    findOneCapital,
    findOneCountry,
};