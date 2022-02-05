const { Sequelize } = require("sequelize");
const { Capital, Country, City } = require("./models");

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
        const capital = await country.createCapital(
            {
                capitalName: req.body.capitalName, 
                citySize: req.body.citySize
            }
        );
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
        const capital = await country.getCapital({where: {countryId: country.id}});
        const city = await country.getCities({where: {countryId: country.id}});
        return {country, capital, city};
    } catch (error) {
        console.log(error);
    }
};

const addCity = async (req) => {
    try {
        const country = await Country.findOne({where: {countryName: req.params.country}});
        const city = await City.create(
            {
                cityName: req.body.cityName,
                citySize: req.body.citySize,
                countryId: country.id
            }
        );
        console.log(city);
        return city;
    } catch (error) {
        console.log(error);
    }
}; 

const addCities = async (req) => {
    try {
        const country = await Country.findOne({where: {countryName: req.params.country}});
        const body = req.body;
        const cities = body.map(item => {
            item.countryId = country.id
            City.create(item);
            console.log(item);
            return item;
        });
        // const createdCities = await City.bulkCreate(cities);
        return cities;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    addCapital,
    addCountry,
    findOneCapital,
    findOneCountry,
    addCities,
    addCity
};