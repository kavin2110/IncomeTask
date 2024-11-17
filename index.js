document.addEventListener('DOMContentLoaded', () => {
  
    function loadTodoDetails() {
        
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id'); // Example: "Income.html?id=123"

        if (!id) {
            console.error('No ID provided in the URL');
            return;
        }

        // Retrieve todos from localStorage
        const lstodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

        // Find the todo by ID
        const todo = lstodos.find(todo => todo.id == id);

        if (!todo) {
            console.error('Todo not found');
            alert('No todo item found with the provided ID');
            return;
        }

        // Display the todo details
        const todoDetails = document.querySelector('.todoDetails');
        if (todoDetails) {
            todoDetails.innerHTML = `
                <h2>Income: ${todo.Income}</h2>
                <p>Expense: ${todo.Expense}</p>
                <p>Month: ${todo.Month}</p>
            `;
        } else {
            console.error('todoDetails element not found');
        }
    }

    // Add a new todo
    function addTodo() {
        const addForm = document.querySelector('.addForm');

        if (!addForm) {
            console.error('addForm element not found.');
            return;
        }

        addForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Access form fields
            const income = addForm.todoTitle ? addForm.todoTitle.value : '';
            const expense = addForm.todoDescription ? addForm.todoDescription.value : '';
            const month = addForm.todoCompleted ? addForm.todoCompleted.value : '';

            if (!income || !expense || !month) {
                alert('Please fill out all fields.');
                return;
            }

            // Create a new todo
            const newTodo = {
                Income: income,
                Expense: expense,
                Month: month,
                id: new Date().getTime() // Generate unique ID
            };

            try {
               
                const lstodos = JSON.parse(localStorage.getItem('todos')) || [];

          
                lstodos.push(newTodo);

             
                localStorage.setItem('todos', JSON.stringify(lstodos));

                // Reset form after submission
                addForm.reset();
                alert('Data added successfully');
            } catch (error) {
                console.error('Failed to add todo', error);
            }
        });
    }

    // Load the list of todos
    function loadTodos() {
        const IncomeList = document.querySelector('.IncomeList');

        if (!IncomeList) {
            console.error('IncomeList element not found.');
            return;
        }

        // Clear previous content
        IncomeList.innerHTML = "";

        // Retrieve todos from localStorage
        const lstodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

        // Create an unordered list
        const ulist = document.createElement('ul');

        // Loop through the todos
        lstodos.forEach(todo => {
            const anchor = document.createElement('a');
            anchor.href = `Income.html?id=${todo.id}`;
            const listItem = document.createElement('li');
            listItem.textContent = todo.Month;
            anchor.appendChild(listItem);
            ulist.appendChild(anchor);
        });

        // Append the unordered list to the IncomeList div
        IncomeList.appendChild(ulist);
    }

 
    loadTodos();
    addTodo();
    loadTodoDetails();
});
