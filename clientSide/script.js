 var id;
 var response;
 // Fetch and display existing todo items on page load
 fetch('https://typecript-todo-api-f653ff8527ee.herokuapp.com/api/v1/posts/')
 .then(response => response.json())
 .then(data => {
     if (data.length > 0) {
         data.forEach(todo => {
             console.log("TodoItems", todo);
             updateTodoList(todo);
         });
     } else {
         console.log('No existing todo items.');
     }
 })
 .catch(error => {
     console.error('Error fetching todo items:', error);
 });

function addTodo() {
 // Get values from input fields
 var title = document.getElementById('title').value;
 var description = document.getElementById('description').value;
 var author = document.getElementById('author').value;
 var published = document.getElementById('published').checked;

 // Create a new todo object
 var todo = {
     title: title,
     description: description,
     author: author,
     published: published
 };

 // Use AJAX to post data to the server
 fetch('https://typecript-todo-api-f653ff8527ee.herokuapp.com/api/v1/posts/', {
     method: 'POST',
     headers: {
         'Content-Type': 'application/json',
     },
     body: JSON.stringify(todo),
 })
 .then(response => response.json())
 .then(data => {
     // Update the todo list
     updateTodoList(data);
     // Clear input fields
document.getElementById('title').value = '';
document.getElementById('description').value = '';
document.getElementById('author').value = '';
document.getElementById('published').checked = false;
 })
 .catch(error => {
     console.error('Error adding todo:', error);
 });
}

var addButton = document.getElementById('addTodoItems')
var updateButton = document.getElementById('editTodo')

function updateTodoList(todo) {
// Update the list of todo items
var todoList = document.getElementById('todoList');
var listItem = document.createElement('li');

// Create separate elements for title and buttons
var titleElement = document.createElement('span');
response = titleElement
titleElement.innerHTML = `Title: ${todo.title}<br>Description: ${todo.description}<br>Author: ${todo.author}<br>Published: ${todo.published}`;
listItem.appendChild(titleElement);


// Add edit button
var editButton = document.createElement('button');
editButton.textContent = 'Edit';

editButton.onclick  = function (){
document.getElementById('title').value = todo.title;
document.getElementById('description').value = todo.description;
document.getElementById('author').value = todo.author;
document.getElementById('published').checked = todo.published;
addButton.style.display = 'none'
updateButton.style.display = 'block'
id = todo._id
}

updateButton.onclick = function () {
    // Pass the todo object as a parameter
    updateTodo(todo);
}


listItem.appendChild(editButton);

// Add delete button
var deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.onclick = function () {
// Call your delete API here with the todo item's ID
fetch(`https://typecript-todo-api-f653ff8527ee.herokuapp.com/api/v1/posts//${todo._id}`, {
 method: 'DELETE',
})
.then(() => {
 listItem.remove();
})
.catch(error => {
 console.error('Error deleting todo:', error);
});
};
listItem.appendChild(deleteButton);

todoList.appendChild(listItem);
}


function updateTodo(todo) {
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var author = document.getElementById('author').value;
    var published = document.getElementById('published').checked;

    console.log("title", title, description, author, published);

    if (title != null || description != null || author != null || published != null) {
        console.log("Id", id);
        fetch(`https://typecript-todo-api-f653ff8527ee.herokuapp.com/api/v1/posts//${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: title, description: description, author: author, published: published }),
        })
            .then(response => response.json())
            .then(updatedTodo => {
                location.reload();
                response.textContent = `Title: ${updatedTodo.title}, Description: ${updatedTodo.description}, Author: ${updatedTodo.author}, Published: ${updatedTodo.published}`;
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
                document.getElementById('author').value = '';
                document.getElementById('published').checked = false;
                addButton.style.display = 'block';
                updateButton.style.display = 'none';
            })
            .catch(error => {
                console.error('Error editing todo:', error);
            });
    } else {
        alert("Something went wrong");
    }
}