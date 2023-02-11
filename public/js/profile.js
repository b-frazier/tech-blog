const newPost = async (e) => {
  e.preventDefault();

  const post_title = document.querySelector('#post-title');
  const post_body = document.querySelector('#post-body');

  if (post_title && post_body) {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ post_title, post_body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Whoops! Something went wrong!');
    }
  }
};

const deleteBtn = async (e) => {
  if (e.target.hasAttribute('data-id')) {
    const id = e.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post!');
    }
  }
};

document.querySelector('.new-post').addEventListener('submit', newPost);
document.querySelector('.post-list').addEventListener('click', deleteBtn);
