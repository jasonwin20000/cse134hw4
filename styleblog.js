let blogPosts = [];

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

function insertBlogPost() {
    const titleInput = document.getElementById("blogTitle");
    const dateInput = document.getElementById("blogDate");
    const summaryInput = document.getElementById("blogSummary");
    const blogPostsDiv = document.getElementById("blogPosts");

    blogPosts.push({
        title: titleInput.value,
        date: dateInput.value,
        summary: summaryInput.value,
    });

    localStorage.setItem('posts', JSON.stringify(blogPosts));

    let postIndex = blogPosts.length;

    const newPost = document.createElement("h2");
    const newPostContent = document.createTextNode(`Title: ${blogPosts[postIndex - 1].title} Date: ${blogPosts[postIndex - 1].date} Summary: ${blogPosts[postIndex - 1].summary}`);
    newPost.appendChild(newPostContent);
    blogPostsDiv.appendChild(newPost);

    const newEditBtn = document.createElement("button");
    const newEditBtnContent = document.createTextNode(" Edit");
    const newEditIcon = document.createElement("i");
    newEditIcon.setAttribute("class", "fa fa-pencil");
    newEditBtn.prepend(newEditIcon);
    newEditBtn.appendChild(newEditBtnContent);
    blogPostsDiv.appendChild(newEditBtn);

    const newDeleteBtn = document.createElement("button");
    const newDeleteBtnContent = document.createTextNode(" Delete");
    const newDeleteIcon = document.createElement("i");
    newDeleteIcon.setAttribute("class", "fa fa-trash");
    newDeleteBtn.prepend(newDeleteIcon);
    newDeleteBtn.appendChild(newDeleteBtnContent);
    blogPostsDiv.appendChild(newDeleteBtn);

    const newHr = document.createElement("hr");
    blogPostsDiv.appendChild(newHr);

    const editPromptDialog = document.getElementById("editPrompt");
    const saveEditBtn = document.getElementById("saveBtn2");

    newEditBtn.addEventListener("click", () => {
        editPromptDialog.showModal();
        saveEditBtn.addEventListener("click", () => {
            const editTitleInput = document.getElementById("editTitle");
            const editDateInput = document.getElementById("editDate");
            const editSummaryInput = document.getElementById("editSummary");
        
            let editedContent = {
                title: editTitleInput.value,
                date: editDateInput.value,
                summary: editSummaryInput.value,
            };
        
            let newContent = document.createTextNode(`Title: ${editedContent.title} Date: ${editedContent.date} Summary: ${editedContent.summary}`);
        
            blogPosts.splice(postIndex - 1, 1, editedContent);
        
            let deleteContent = newPost.childNodes[0];
            newPost.removeChild(deleteContent);
            newPost.appendChild(newContent);
            localStorage.setItem('posts', JSON.stringify(blogPosts));
            
            editTitleInput.value = "";
            editDateInput.value = "";
            editSummaryInput.value = "";
        }, {once: true}); 
    });

    
    newDeleteBtn.addEventListener("click", () => {
        newPost.nextElementSibling.remove();
        newPost.nextElementSibling.remove();
        newPost.nextElementSibling.remove();
        newPost.remove();
        blogPosts.splice(newPost, 1);
        localStorage.setItem('posts', JSON.stringify(blogPosts));
    }); 

    titleInput.value = "";
    dateInput.value = "";
    summaryInput.value = "";
}