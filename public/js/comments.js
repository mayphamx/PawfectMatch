// SHOW COMMENTS ON PLAYDATE PAGE BY ID
const commentFormHandler = async function (event) {
  event.preventDefault();

  const playdate_id = document.querySelector('.new-comment-form').dataset.playdate_id;

  const comment = document.querySelector('#comment').value.trim();

  if(comment) {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        playdate_id,
        comment,
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