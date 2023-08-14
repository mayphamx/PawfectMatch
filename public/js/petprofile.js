// !one js per handlebars!

// create button form js code 
// **
const createPetButtonHandler = async (event) => {
  event.preventDefault();

  const pet_name = document.querySelector('#petprofile-name').value.trim();
  const animal = document.querySelector('#petprofile-animal').value.trim();
  const age = document.querySelector('#petprofile-age').value.trim();
  const breed = document.querySelector('#petprofile-breed').value.trim();
  const personality = document.querySelector('#petprofile-personality').value.trim();
  const vaccinated = document.querySelector('#petprofile-vaccinated').value.trim();
  const photo = document.querySelector('#petprofile-photo').value.trim();

// **required
  if (pet_name && animal) {
    const response = await fetch(`/api/petprofiles`, {
      method: 'POST',
// **send everything from models - allow null false
      body: JSON.stringify({ pet_name, animal, age, breed, personality, vaccinated, photo}),
      headers: {
        'Content-animal': 'application/json',
      },
    });

    if (response.ok) {
      // document.location.replace('/dashboard');
      alert('Successfully created petprofile')
    } else {
      alert('Failed to create petprofile');
    }
  }
};

document.querySelector('.newpetprofile-form').addEventListener('submit', createPetButtonHandler);

          // // !!! MULTER BUTTON
          
          // const create 
          // const form = document.getElementById("form");
          
          // form.addEventListener("submit", submitForm);
          
          // function submitForm(e) {
          //     e.preventDefault();
          //     const name = document.getElementById("name");
          //     const files = document.getElementById("files");
          //     const formData = new FormData();
          //     formData.append("name", name.value);
          //     for(let i =0; i < files.files.length; i++) {
          //             formData.append("files", files.files[i]);
          //     }
          //     fetch(`/api/petprofiles`, {
          //         method: 'POST',
          //         body: formData,
          //         headers: {
          //           "Content-animal": "multipart/form-data"
          //         }
          //     })
          //         .then((res) => console.log(res))
          //         .catch((err) => ("Error occured", err));
          // }
          
          // --------------------------------------------------
          // const form = document.getElementById("form");
          
          // form.addEventListener("submit", submitForm);
          
          // function submitForm(e) {
          //     e.preventDefault();
          //     const name = document.getElementById("name");
          //     const files = document.getElementById("files");
          //     const formData = new FormData();
          //     formData.append("name", name.value);
          //     for(let i =0; i < files.files.length; i++) {
          //             formData.append("files", files.files[i]);
          //     }
          //     fetch(`/api/petprofiles`, {
          //         method: 'POST',
          //         body: formData,
          //         headers: {
          //           "Content-animal": "multipart/form-data"
          //         }
          //     })
          //         .then((res) => console.log(res))
          //         .catch((err) => ("Error occured", err));
          // }