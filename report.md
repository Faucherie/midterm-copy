
I enjoyed working on this project, and for a while, it progressed better than I had anticipated. The primary challenge I faced was time management. I still need to implement the reader section and enhance the complexity associated with the author ID. Currently, the author for the author page is set to id = 1. This straightforward implementation, however, presents several issues. For instance, modifying the author settings, such as switching from user 1 to user 2, doesn't actually alter the drafts being viewed; they remain the same. The settings change only affects the author's name and the blog title, which is quite limiting.

I believe I laid much of the groundwork necessary to refine this logic when I developed the edit button functionality. In this feature, we select the article ID and pass it to the editor, enabling us to view and edit the article.

Regarding the extension, I feel there was potential for more substantial development. Currently, it's merely a basic CSS styling. However, I designed the CSS using variables with the intention of adding a new table to the database. This table would allow users to choose from pre-made color schemes or create their own by assigning colors to these variables. The CSS variables I used are as follows:
 ```css
--primaryColour: #043d7a; 
--secondaryColour: #343a40; 
--accentColour1: #ced4da; 
--accentColour2: #007bff; 
--accentColour3: #6c757d; 
--accentColour4: #adb5bd;
--contrastColour1: #dc3545;
```