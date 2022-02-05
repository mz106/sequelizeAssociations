const router = require("express").Router();
const { addCountry, findOneCountry } = require("./utils");

router.post("/", async (req, res) => {
    try {
        const country = await addCountry(req);
        console.log(JSON.stringify(country, null, 2));
        res.status(201).json(country);
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