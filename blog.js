// array to store blog posts
let blogPosts = [];


/**
 * Controls the main page area and adds event listen to the new blog post button as well as the save button in the dialog.
 *
 */
export function newBlogPost() {
    const newPostBtn = document.getElementById("newPostBtn");
    const promptDialog = document.getElementById("customPrompt");
    const saveBtn = document.getElementById("saveBtn");

    newPostBtn.addEventListener("click", () => {
        promptDialog.showModal();
    });
 
    saveBtn.addEventListener("click", () => {
        insertBlogPost();
    });
}


/**
 * Inserts a new blog post into the page when user presses the save button in the prompt dialog. Displays the blog post as well as
 * buttons that allow the user to edit or delete the blog post from the page.
 * 
 */
function insertBlogPost() {
    const titleInput = document.getElementById("blogTitle");
    const dateInput = document.getElementById("blogDate");
    const summaryInput = document.getElementById("blogSummary");
    const blogPostsDiv = document.getElementById("blogPosts");

    // insert blog post into array
    blogPosts.push({
        title: titleInput.value,
        date: dateInput.value,
        summary: summaryInput.value,
    });

    // insert blog post into local storage
    localStorage.setItem('posts', JSON.stringify(blogPosts));

    let postIndex = blogPosts.length;

    // new element to display blog post
    const newPost = document.createElement("h2");
    const newPostContent = document.createTextNode(`Title: ${blogPosts[postIndex - 1].title} Date: ${blogPosts[postIndex - 1].date} Summary: ${blogPosts[postIndex - 1].summary}`);
    newPost.appendChild(newPostContent);
    blogPostsDiv.appendChild(newPost);

    // new element to edit blog post
    const newEditBtn = document.createElement("button");
    const newEditBtnContent = document.createTextNode("Edit");
    newEditBtn.appendChild(newEditBtnContent);
    blogPostsDiv.appendChild(newEditBtn);

    // new element to delete blog post
    const newDeleteBtn = document.createElement("button");
    const newDeleteBtnContent = document.createTextNode("Delete");
    newDeleteBtn.appendChild(newDeleteBtnContent);
    blogPostsDiv.appendChild(newDeleteBtn);

    const editPromptDialog = document.getElementById("editPrompt");
    const saveEditBtn = document.getElementById("saveBtn2");

    // event listener for the edit button, shows new prompt dialog 
    newEditBtn.addEventListener("click", () => {
        editPromptDialog.showModal();

        // event listener for the save button in the new prompt dialog to save edits
        saveEditBtn.addEventListener("click", () => {
            const editTitleInput = document.getElementById("editTitle");
            const editDateInput = document.getElementById("editDate");
            const editSummaryInput = document.getElementById("editSummary");
        
            // edit the blog post data
            let editedContent = {
                title: editTitleInput.value,
                date: editDateInput.value,
                summary: editSummaryInput.value,
            };
        
            let newContent = document.createTextNode(`Title: ${editedContent.title} Date: ${editedContent.date} Summary: ${editedContent.summary}`);
        
            // update array with new input
            blogPosts.splice(postIndex - 1, 1, editedContent);
        
            // edit the html to display edited blog post
            let deleteContent = newPost.childNodes[0];
            newPost.removeChild(deleteContent);
            newPost.appendChild(newContent);

            // update local storage
            localStorage.setItem('posts', JSON.stringify(blogPosts));
            
            // reset fields in dialog
            editTitleInput.value = "";
            editDateInput.value = "";
            editSummaryInput.value = "";
        }, {once: true}); 
    });

    // event listener for the delete button to delete blog post
    newDeleteBtn.addEventListener("click", () => {
        // removes the buttons and the content of the blog post
        newPost.nextElementSibling.remove();
        newPost.nextElementSibling.remove();
        newPost.remove();

        // removes the blog post from array
        blogPosts.splice(newPost, 1);

        // update local storage
        localStorage.setItem('posts', JSON.stringify(blogPosts));
    }); 

    // reset fields in dialog
    titleInput.value = "";
    dateInput.value = "";
    summaryInput.value = "";
}