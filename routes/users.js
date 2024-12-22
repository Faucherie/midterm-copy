/**
 * users.js
 * These are example routes for user management
 * This shows how to correctly structure your routes for the project
 * and the suggested pattern for retrieving data by executing queries
 *
 * NB. it's better NOT to use arrow functions for callbacks with the SQLite library
* 
 */

const express = require("express");
const router = express.Router();

/**
 * @desc Display all the users
 */
router.get("/list-users", (req, res, next) => {
    // Define the query
    query = "SELECT * FROM users"

    // Execute the query and render the page with the results
    global.db.all(query, 
        function (err, rows) {
            if (err) {
                next(err); //send the error on to the error handler
            } else {
                res.json(rows); // render page as simple json
            }
        }
    );
});

/**
 * @desc Displays a page with a form for creating a user record
 */
router.get("/add-user", (req, res) => {
    res.render("add-user.ejs");
});

/**
 * @desc Add a new user to the database based on data from the submitted form
 */
router.post("/add-user", (req, res, next) => {
    // Define the query
    user_query = "INSERT INTO users (user_name) VALUES( ? );";
    email_query = "INSERT INTO email_accounts (user_id, email_address) VALUES (?, ?);";

    //Define the query parameters
    user_query_parameters = [req.body.user_name];
    email_query_parameters = [null, req.body.email];

    /* Nested queries to first add the user, then add the email */
    // user query
    global.db.run(user_query, user_query_parameters, function (err) {
        if (err) {
            next(err); //send the error on to the error handler
        } else {
            const userId = this.lastID;
            
            // email query
            global.db.run(email_query, [userId, req.body.email], function (err) {
                if (err) {
                    next(err); // Send the error on to the error handler
                } else {
                    const user_name = req.body.user_name;
                    
                    const email_address = req.body.email;
                    
                    const successDevMessage = `New user and email added with user id ${userId}!`;
                    
                    const successUserMessage = `Welcome ${user_name}! Your email ${email_address} has been successfully added as user ${userId}!`;
                    
                    //res.send(successDevMessage);
                    res.send(successUserMessage);

                    next();
                }
            });
        };
    });
});


// Export the router object so index.js can access it
module.exports = router;
