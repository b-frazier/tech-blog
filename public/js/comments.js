const comment = document.querySelector('#comment').value.trim();
console.log(comment);

async function addComment(e) {
  e.preventDefault();

  if (comment) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
  }
}

const commentBtn = document.querySelector('#comment-btn');
commentBtn.addEventListener('click', addComment);
