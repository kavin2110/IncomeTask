const container = document.querySelector('.container');


function loadTodo(id) {
    // Retrieve todos from localStorage
    const lstodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

    // Find the todo by ID
    const todo = lstodos.find(todo => todo.id == id);

    if (!todo) {
        alert('Todo not found!');
        window.location.href = 'index.html'; // Redirect to home if not found
        return;
    }

    
    const title = document.createElement('h1');
    title.textContent = todo.Month;
    title.style.textAlign = 'center';

    const description = document.createElement('h3');
    description.textContent = `Income: ${todo.Income}`;

    const description1 = document.createElement('h3');
    description1.textContent = `Expenses: ${todo.Expense}`;

    const buttonsContainer = document.createElement('div');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';

   
    editButton.addEventListener('click', () => {
        window.location.href = `edit.html?id=${id}`;
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '20px';

   
    deleteButton.addEventListener('click', () => {
      
        const isConfirmed = confirm('Are you sure you want to delete this todo?');
        if (!isConfirmed) return;

        
        const updatedTodos = lstodos.filter(todo => todo.id != id);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        
        alert('Todo deleted successfully!');
        window.location.href = 'index.html';
    });

    buttonsContainer.append(editButton, deleteButton);

  
    container.append(title, description, description1, buttonsContainer);
}

// Read the id from the URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Call the loadTodo function
loadTodo(id);
