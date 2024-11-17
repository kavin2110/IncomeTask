
const updateForm = document.querySelector('.updateForm');


const id = new URLSearchParams(window.location.search).get('id');

// Function to load the todo data into the form fields
function loadForm(id) {
    // Check if the ID exists
    if (!id) {
        alert('Invalid or missing ID!');
        window.location.href = 'index.html'; // Redirect to the home page
        return;
    }

    // Retrieve todos from localStorage
    const lstodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    console.log('Todos:', lstodos);

   
    const todo = lstodos.find(todo => todo.id == id);
    console.log('Todo found:', todo);

    if (!todo) {
        alert('Todo not found!');
        window.location.href = 'index.html'; // Redirect to the home page
        return;
    }

  
    if (!updateForm || !updateForm.Income || !updateForm.Expenses || !updateForm.Month) {
        console.error('Form or form fields are missing. Check your HTML structure.');
        return;
    }

   
    updateForm.Income.value = todo.Income || ''; // Default to empty if the key is missing
    updateForm.Expenses.value = todo.Expense || ''; // Assuming "Expenses" was a typo, fix to "Expense"
    updateForm.Month.value = todo.Month || '';
}


function handleFormSubmit(event) {
    event.preventDefault();

    
    const Income = updateForm.Income.value;
    const Expense = updateForm.Expenses.value;
    const Month = updateForm.Month.value;

   
    if (!Income || !Expense || !Month) {
        alert('All fields are required!');
        return;
    }

    
    const lstodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

    
    const index = lstodos.findIndex(todo => todo.id == id);

    if (index === -1) {
        alert('Todo not found!');
        return;
    }

    
    lstodos[index] = { ...lstodos[index], Income, Expense, Month };

    
    localStorage.setItem('todos', JSON.stringify(lstodos));

    alert('Todo updated successfully!');

    // Redirect the user to the home page
    window.location.href = 'index.html';
}


loadForm(id);


if (updateForm) {
    updateForm.addEventListener('submit', handleFormSubmit);
} else {
    console.error('Form not found! Ensure your HTML has a form with the class "updateForm".');
}
