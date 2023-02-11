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
