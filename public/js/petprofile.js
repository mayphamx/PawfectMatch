// !one js per handlebars!

// create button form js code 
// **
const createPetButtonHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#petprofile-name').value.trim();
  const catdog = document.querySelector('#petprofile-catdog').value.trim();

// **required
  if (pet_name && catdog) {
    const response = await fetch(`/api/petprofiles`, {
      method: 'POST',
// **send everything from models - allow null false
      body: JSON.stringify({ pet_name, catdog}),
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

// !!! MULTER BUTTON

const form = document.getElementById("form");

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById("name");
    const files = document.getElementById("files");
    const formData = new FormData();
    formData.append("name", name.value);
    for(let i =0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
    }
    fetch(`/api/petprofiles`, {
        method: 'POST',
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));
}