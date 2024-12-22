
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Create your tables with SQL commands here (watch out for slight syntactical differences with SQLite vs MySQL)

CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    blog_title TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS email_accounts (
    email_account_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email_address TEXT NOT NULL,
    user_id  INT, --the user that the email account belongs to
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS articles (
    article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP,
    is_published BOOLEAN NOT NULL DEFAULT FALSE, --Come back to check if not null is needed becuase it defualts to null
    num_reads INTEGER DEFAULT 0,
    num_likes INTEGER DEFAULT 0,
    FOREIGN KEY (author_id) REFERENCES users(user_id)
);

-- Insert default data (if necessary here)

-- Set up users
INSERT INTO users ('user_name', 'blog_title') VALUES ('Test User Name', 'Test Blog Title');
INSERT INTO users ('user_name', 'blog_title') VALUES ('Test User Name2', 'Test Blog Title2');

-- Set up Articles
    -- Published articles tests
INSERT INTO articles ('title','author_id','content','created_at','last_modified','published_at', 'is_published') VALUES ('Published Article',1,'This is a published article.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO articles ('title','author_id','content','created_at','last_modified','published_at', 'is_published') VALUES ('Published Article2',1,'This is another published article.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);
    
    -- Unpublished article tests
INSERT INTO articles ('title','author_id','content','created_at','last_modified','published_at', 'is_published') VALUES ('Unpublished Article',1,'This is a unpublished article.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);

INSERT INTO articles ('title','author_id','content','created_at','last_modified','published_at', 'is_published') VALUES ('Unpublished Article2',1,'This is another unpublished article.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);



COMMIT;

