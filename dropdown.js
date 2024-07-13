document.addEventListener("DOMContentLoaded", () => {
  // Fetch museums data
  fetch("data/museums.json")
    .then((response) => response.json())
    .then((data) => {
      const museumList = document.getElementById("museum-list");

      for (const [region, museums] of Object.entries(data)) {
        const regionItem = document.createElement("li");
        const regionLink = document.createElement("a");
        regionLink.href = `museum-list.html?region=${encodeURIComponent(
          region
        )}`; // Link to museum-list.html with region parameter
        regionLink.textContent = region;
        regionItem.appendChild(regionLink);

        const museumSubList = document.createElement("ul");
        museums.forEach((museum) => {
          const museumItem = document.createElement("li");
          const museumLink = document.createElement("a");

          // Pass museum details as query parameters
          museumLink.href = `museum.html?region=${encodeURIComponent(
            region
          )}&name=${encodeURIComponent(museum.name)}`;

          museumLink.textContent = museum.name;
          museumItem.appendChild(museumLink);
          museumSubList.appendChild(museumItem);
        });

        regionItem.appendChild(museumSubList);
        museumList.appendChild(regionItem);
      }
    })
    .catch((error) => console.error("Error loading museum data:", error));

  // Fetch logged-in user details from sessionStorage
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const usernameContainer = document.getElementById("username-container");
  const profilePicContainer = document.getElementById("profile-pic-container");
  const logoutContainer = document.getElementById("logout-container");

  if (currentUser) {
    // Set the profile picture and username in the navbar
    const userProfilePic = document.getElementById("user-profile-pic");
    const username = document.getElementById("username");

    userProfilePic.src = currentUser.profilePicture; // Assuming profilePicture is a URL or base64 string
    userProfilePic.alt = currentUser.username;

    username.textContent = currentUser.username;
    username.href = "profile.html"; // Change href to profile page

    // Show profile picture and logout link, hide login link
    profilePicContainer.style.display = "block";
    logoutContainer.style.display = "block";

    // Add event listener to logout link
    const logoutLink = document.getElementById("logout");
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior

      // Remove currentUser from sessionStorage
      sessionStorage.removeItem("currentUser");

      // Redirect to login page
      window.location.href = "login.html";
    });
  } else {
    // Hide profile picture and logout link, show login link
    username.href = "login.html"; // Ensure login link is set correctly
    profilePicContainer.style.display = "none";
    logoutContainer.style.display = "none";
  }
});
