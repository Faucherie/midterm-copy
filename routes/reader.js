/**
 * reader.js
* 
 */

const express = require("express");
const router = express.Router();

/**
 * @desc Displays the reader home page
 */
router.get("/home", (res) => {
    let userId = 1; // Example id need to take the logic from getting the article to getting a user

    let userQuery = "SELECT user_name, blog_title FROM users WHERE user_id = ?";
    let articlesQuery = "SELECT * FROM articles WHERE author_id = ?";

    global.db.get(userQuery, [userId], (err, row) => {
        if (err) {
            res.redirect("/");
        } else {
            global.db.all(articlesQuery, [userId], (err, articles) => {
                if (err) {
                    res.redirect("/");
                } else {
                    let publishedArticles = articles.filter(article => article.is_published);

                    res.render("reader-home.ejs", { 
                        blogTitle: row.blog_title, 
                        blogAuthor: row.user_name,
                        publishedArticles: publishedArticles
                    });
                }
            });
        }
    });
});

/**
 * @desc Displays the article to read it
 */
router.get("/read", (res) => {
        res.render("reader-article.ejs");
});


// Export the router object so index.js can access it
module.exports = router;
