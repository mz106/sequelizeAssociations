const router = require("express").Router();
const { addCity } = require("./utils");
const { addCountry, findOneCountry, addCities } = require("./utils");

router.post("/", async (req, res) => {
    try {
        const country = await addCountry(req);
        console.log(JSON.stringify(country, null, 2));
        res.status(201).json(country);
    } catch (error) {
        console.log(error);
    }
});

router.post("/cities/:country", async (req, res) => {
    try {
        const cities = await addCities(req);
        console.log(JSON.stringify(cities, null, 2));
        res.status(201).json(cities);
    } catch (error) {
        console.log(error);
    }
});

router.post("/city/:country", async (req, res) => {
    try {
        const city = await addCity(req);
        res.status(201).json(city);
    } catch (error) {
        console.log(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const country = await findOneCountry(req);
        console.log(JSON.stringify(country, null, 2));
        res.status(200).json(country);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;