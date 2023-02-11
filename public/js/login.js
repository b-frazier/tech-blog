const loginForm = async (e) => {
  e.preventDefault();

  // values entered in by the user
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // sends post request ot our login route
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // if response is okay, redirect to profile page
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signUpForm = async (e) => {
  e.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const showPassword = () => {
  const passwordBox = document.querySelector('#password-signup');
  if (passwordBox.type === 'password') {
    passwordBox.type = 'text';
  } else {
    passwordBox.type = 'password';
  }
};

document.querySelector('.login-form').addEventListener('submit', loginForm);
document.querySelector('.signup-form').addEventListener('submit', signUpForm);
