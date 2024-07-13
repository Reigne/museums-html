function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const address = document.getElementById('address').value;
  const profilePicture = document.getElementById('profilePicture').files[0]; // Assuming single file upload
  
  // Check if user already exists in localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    alert('Username already exists. Please choose a different username.');
    return;
  }

  // Save profile picture to localStorage
  const reader = new FileReader();
  reader.readAsDataURL(profilePicture);
  reader.onload = function () {
    const profilePictureBase64 = reader.result;

    // Create new user object
    const newUser = {
      username: username,
      password: password,
      address: address,
      profilePicture: profilePictureBase64
    };

    // Add new user to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Optionally save users to JSON file
    saveUsersToJson(users);

    // Redirect to home.html
    window.location.href = 'login.html';

    alert('Registration successful!');
    
    
  };

  reader.onerror = function (error) {
    console.error('Error uploading profile picture:', error);
    alert('Error uploading profile picture. Please try again.');
  };
}

function saveUsersToJson(data) {
  // Example function to save users to JSON file or API
  fetch('data/users.json', {
    method: 'PUT', // or 'POST'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Updated users data:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
