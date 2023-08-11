const commentFormHandler = async function (event) {
  event.preventDefault();

  const meetup_id = document.querySelector('.new-comment-form').dataset.meetup_id;

  const text = document.querySelector('#comment').value.trim();
  // console.log(meetupId, text);
  if(text) {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        meetup_id,
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