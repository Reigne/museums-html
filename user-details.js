document.addEventListener("DOMContentLoaded", () => {
  // Retrieve logged-in user details from sessionStorage
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  if (currentUser) {
    const userDetailsContainer = document.getElementById("user-details-container");

    // Create elements for user details display
    const userImage = document.createElement("img");
    userImage.classList.add("user-image");
    userImage.src = currentUser.profilePicture; // Assuming profilePicture is a URL or base64 string
    userImage.alt = currentUser.username;
    userDetailsContainer.appendChild(userImage);

    const userDetails = document.createElement("div");
    userDetails.classList.add("user-details");

    const userName = document.createElement("h2");
    userName.textContent = currentUser.username;
    userDetails.appendChild(userName);

    const userAddress = document.createElement("p");
    userAddress.textContent = `Address: ${currentUser.address}`;
    userDetails.appendChild(userAddress);

    userDetailsContainer.appendChild(userDetails);

    // Display favorite museums for the current user
    const favoriteMuseumsKey = currentUser.username; // Use username as the key for favorite museums
    const favoriteMuseums = JSON.parse(localStorage.getItem(favoriteMuseumsKey)) || [];
    const museumContainer = document.getElementById("museum-container");

    favoriteMuseums.forEach((museum) => {
      const museumItem = document.createElement("div");
      museumItem.classList.add("museum-item");

      const museumLink = document.createElement("a");
      museumLink.href = `museum.html?region=${encodeURIComponent(museum.region)}&name=${encodeURIComponent(museum.name)}`;

      const museumImage = document.createElement("img");
      museumImage.src = museum.images[0]; // Assuming images is an array and you want to display the first image
      museumImage.alt = museum.name; // Use museum name as alt text for accessibility
      museumLink.appendChild(museumImage);

      const museumName = document.createElement("div");
      museumName.classList.add("museum-name");
      museumName.textContent = museum.name;
      museumLink.appendChild(museumName);

      museumItem.appendChild(museumLink);
      museumContainer.appendChild(museumItem);
    });
  } else {
    // Handle case when no user is logged in
    const userDetailsContainer = document.getElementById("user-details-container");
    userDetailsContainer.textContent = "No user logged in.";
  }
});
