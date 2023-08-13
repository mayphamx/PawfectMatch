// ! DASHBOARD PAGE WILL SHOW USERS PLAYDATES TO CREATE, UPDATE, AND DELETE

// CREATE button for new playdate form
const createButtonHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#playdate-name').value.trim();
  const description = document.querySelector('#playdate-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/playdates`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create playdate');
    }
  }
};

// DELETE button for existing playdates
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const playdateID = event.target.getAttribute('data-id');


    const response = await fetch(`/api/playdates/${playdateID}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete playdate');
    }
  }
};

/// UPDATE button for existing playdate form
const updButtonHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#playdate-name').value.trim();
  const description = document.querySelector('#playdate-desc').value.trim();
  const playdateID = event.target.getAttribute('data-id');

  if (name && description &&playdateId) {
    const response = await fetch(`/api/playdates/${playdateID}`, {
      method: 'PUT',
      body: JSON.stringify({name, description}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update playdate');
    }
  }
};

document.querySelectorAll('playdate-update').forEach(button => {
  button.addEventListener('click', updButtonHandler);
});


document.querySelector('.newplaydate-form').addEventListener('submit', createButtonHandler);

document.querySelectorAll('playdate-delete').forEach(button => {
  button.addEventListener('click', delButtonHandler);
});