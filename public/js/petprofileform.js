// PET PROFILE FORM BUTTON
const createPetButtonHandler = async (event) => {
  event.preventDefault();
console.log(event);
  const pet_name = document.querySelector('#petprofile-name').value.trim();
  const animal = document.querySelector('#petprofile-animal').value.trim();
  const age = document.querySelector('#petprofile-age').value.trim();
  const breed = document.querySelector('#petprofile-breed').value.trim();
  const personality = document.querySelector('#petprofile-personality').value.trim();
  const vaccinated = document.querySelector('#petprofile-vaccinated').value.trim();
  const photo = document.querySelector('#petprofile-photo').value.trim();
  const location = document.querySelector('#petprofile-location').value.trim();

// required variables where allow null is false
  if (pet_name && animal) {
    const response = await fetch(`/api/petprofiles`, {
      method: 'POST',
// sends everything from models - allow null false
      body: JSON.stringify({ pet_name, animal, age, breed, personality, vaccinated, photo, location}),
      headers: {
        'Content-animal': 'application/json',
      },
    });
console.log(response);
    if (response.ok) {
      console.log(response);
      // add id to redirect
      document.location.replace('/petprofile' + );
    } else {
      alert('Failed to create petprofile');
    }
  }
};

document.querySelector('.newpetprofile-form').addEventListener('submit', createPetButtonHandler);
