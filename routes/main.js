/**
 * main.js
 * These are routes for main page management
 * This shows how to correctly structure your routes for the project
 * and the suggested pattern for retrieving data by executing queries
 *
 * NB. it's better NOT to use arrow functions for callbacks with the SQLite library
* 
 */

const express = require("express");
const router = express.Router();


/**
 * @desc Displays the Main home page
 */
router.get("/", (req, res, next) => {
    res.render("main-homepage.ejs");
});


// Export the router object so index.js can access it
module.exports = router;
