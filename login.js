function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Find the user with matching credentials
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // Store user details in sessionStorage
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    alert('Login successful!');

    // Redirect to home.html
    window.location.href = 'home.html';
  } else {
    alert('Invalid username or password.');
  }
}
