const addComment = async (e) => {
  e.preventDefault();

  const comment_body = document.querySelector('#comment-body').value.trim();
  console.log(comment_body);

  if (comment_body) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ comment_body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('after fetch:', response);
    if (response.ok) {
      document.location.reload;
    } else {
      console.error();
      //alert('It did not work');
    }
  }
};

const commentBtn = document.querySelector('#comment-btn');
commentBtn.addEventListener('click', addComment);
