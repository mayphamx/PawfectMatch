// !one js per handlebars!

// create button form js code 
// **
const createPetButtonHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#petprofile-name').value.trim();
  const description = document.querySelector('#petprofile-desc').value.trim();

// **required
  if (name && description) {
    const response = await fetch(`/api/petprofiles`, {
      method: 'POST',
// **send everything from models - allow null false
      body: JSON.stringify({ name, description  }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create petprofile');
    }
  }
};

document.querySelector('.newpetprofile-form').addEventListener('submit', createPetButtonHandler);