const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('meetup-name').value.trim();
  const description = document.querySelector('meetup-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/apimeetups`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create meetup');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');


    const response = await fetch(`/apimeetups/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete meetup');
    }
  }
};

const updButtonHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('meetup-name').value.trim();
  const description = document.querySelector('meetup-desc').value.trim();
  constmeetupId = event.target.getAttribute('data-id');

  if (name && description &&meetupId) {
    const response = await fetch(`/apimeetups/$meetupId}`, {
      method: 'PUT',
      body: JSON.stringify({name, description}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update meetup');
    }
  }
};

document.querySelectorAll('meetup-update').forEach(button => {
  button.addEventListener('click', updButtonHandler);
});


document.querySelector('.newmeetup-form').addEventListener('submit', newFormHandler);

document.querySelectorAll('meetup-delete').forEach(button => {
  button.addEventListener('click', delButtonHandler);
});