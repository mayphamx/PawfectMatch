const commentFormHandler = async function (event) {
  event.preventDefault();

  const playdate_id = document.querySelector('.new-comment-form').dataset.playdate_id;

  const text = document.querySelector('#comment').value.trim();
  // console.log(playdateId, text);
  if(text) {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        playdate_id,
        text,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    document.location.reload();
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', commentFormHandler);