require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./connection");
// const Capital = require("./capital");
const {Country, Capital} = require("./models");
const countryRouter = require("./routes");


app.use(express.json());

app.use("/country", countryRouter);

app.listen('80', async () => {
    await connection.authenticate();
    await Country.sync({alter: true});
    await Capital.sync({alter: true});
    console.log('app is listening');
});