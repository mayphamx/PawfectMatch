// CREATE button for new playdate form
const createButtonHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#playdate-title').value.trim();
  const date = document.querySelector('#playdate-date').value.trim();
  const location = document.querySelector('#playdate-location').value.trim();
  const description = document.querySelector('#playdate-description').value.trim();
  const username = document.querySelector('#playdate-username').value.trim();

  if (title && date && location && description && username) {
    const response = await fetch(`/api/playdate`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        date, 
        location, 
        description,
        username}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const responseData = await response.json();
      console.log("Response Data is This: " +  JSON.stringify(responseData));
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create playdate');
    }
  }
};

// DELETE button for existing playdates
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');


    const response = await fetch(`/api/playdate/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete playdate');
    }
  }
};


document.querySelector('.playdate-create').addEventListener('submit', createButtonHandler);

document.querySelectorAll('.playdate-delete').forEach(button => {
  button.addEventListener('click', delButtonHandler);
});