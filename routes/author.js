/**
 * author.js
 * These are routes for author management
 * This shows how to correctly structure your routes for the project
 * and the suggested pattern for retrieving data by executing queries
 *
 * NB. it's better NOT to use arrow functions for callbacks with the SQLite library
* 
 */

const express = require("express");
const router = express.Router();


/**
 * @desc Displays the author home page with drafs and published articles and Gets Blog Title and author name for the first User
 */
router.get("/home", (req, res) => {
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
                    let draftArticles = articles.filter(article => !article.is_published);
                    let publishedArticles = articles.filter(article => article.is_published);

                    res.render("author-home.ejs", { 
                        blogTitle: row.blog_title, 
                        blogAuthor: row.user_name,
                        draftArticles: draftArticles,
                        publishedArticles: publishedArticles
                    });
                }
            });
        }
    });
});

/**
 * @desc Publish button updates `is_published` to true/1
 */
router.post("/publish-article", (req, res) => {
    let articleId = req.body.article_id;  
    let updateQuery = "UPDATE articles SET is_published = 1 WHERE article_id = ?;";

    global.db.run(updateQuery, [articleId], function (err) {
        if (err) {
            // Handle error appropriately
            return res.status(500).json({ error: "Database error: " + err.message });
        } else {
            res.redirect("/author/home");  // Redirect back to the author home page
        }
    });
});

/**
 * @desc Delete button removes article from database
 */
router.post("/delete-article", (req, res) => {
    let articleId = req.body.article_id; 
    let deleteQuery = "DELETE FROM articles WHERE article_id = ?;";

    global.db.run(deleteQuery, [articleId], function (err) {
        if (err) {
            // Handle error appropriately
            return res.status(500).json({ error: "Database error: " + err.message });
        } else {
            res.redirect("/author/home");  // Redirect back to the author home page
        }
    });
});

/**
 * @desc Edit button gets the article id and uses passes it to author-edit to build that page.
 */
router.get("/edit-article/:articleId", (req, res) => {
    let articleId = req.params.articleId;
    let articleQuery = "SELECT * FROM articles WHERE article_id = ?";

    global.db.get(articleQuery, [articleId], function (err, row) {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        } else {
            // Pass the article details to the EJS template
            res.render("author-edit.ejs", { article: row });
        }
    });
});

/**
 * @desc Updates the selected article
 */
router.post("/update-article", (req, res) => {
    let articleId = req.body.articleId;
    let title = req.body.title;
    let content = req.body.content;

    let updateArticleQuery = "UPDATE articles SET title = ?, content = ? WHERE article_id = ?";
    global.db.run(updateArticleQuery, [title, content, articleId], function (err) {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        } else {
            res.redirect("/author/home");
        }
    }); // need to update last_modified after updating article
});


/**
 * @desc Displays a page containing the authors settings to change the users name and blog title
 */
router.get("/settings", (req,res) => {
    res.render("author-settings.ejs");
});

/**
 * @desc Updates the Authors name and blog title
 */
router.post("/update-user", (req, res) => {
    let userId = 1; // Example id need to take the logic from getting the article to getting a user

    // Check if user_name or blog_title are empty strings
    if (req.body.user_name === "" || req.body.blog_title === "") {
        return res.status(400).json({ error: "Username and blog title must not be empty" });
    }

    let updateQuery = "UPDATE users SET user_name = ?, blog_title = ? WHERE user_id = ?;";
    let queryParams = [req.body.user_name, req.body.blog_title, userId];

    global.db.run(updateQuery, queryParams, function (err) {
        if (err) {
            // Handle the error appropriately
            return res.status(500).json({ error: "Database error: " + err.message });
        } else {
            res.redirect("/author/home"); // Redirect to the homepage or show a success message
        }
    });
}); 

/**
 * @desc Displays a page containing the authors settings to change the users name and blog title
 */
router.get("/new-draft", (req, res) => {
    res.render("author-new", { article: {} });
});


/**
 * @desc Save the new draft
 */
router.post("/create-draft", (req, res) => {
    let userId = 1; // Example id need to take the logic from getting the article to getting a user

    let insertQuery = "INSERT INTO articles (title, author_id, content) VALUES (?, ?, ?);";
    let queryParams = [req.body.title, userId, req.body.content];

    global.db.run(insertQuery, queryParams, function (err) {
        if (err) {
            // Handle the error appropriately
            return res.status(500).json({ error: "Database error: " + err.message });
        } else {
            res.redirect("/author/home"); // Redirect to the homepage or show a success message
        }
    });
});

// Export the router object so index.js can access it
module.exports = router;
