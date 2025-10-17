const merchantLoginForm = document.getElementById("merchantLoginForm");

// Custom Toast Function using Toastify
function showToast(type, message, position = "top") {
  // position = "top" or "bottom"
  Toastify({
    text: message,
    duration: 3000,
    gravity: position, // top or bottom
    position: "center",
    style: {
      background: type === "success"
        ? "linear-gradient(to right, blue, purple, indigo)"  // green gradient
        : "linear-gradient(to right, #f87171, #f43f5e)"  // red gradient
    }
  }).showToast();
}

// Redirect if already logged in
window.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      showToast("success", `Welcome back, ${user.email}!`, "top");
      setTimeout(() => window.location.href = "dashboard.html", 2000);
    }
  });
});

// Login functionality
merchantLoginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      showToast("success", "Login successful! Redirecting...", "top");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2000);
    })
    .catch((error) => {
      const invalidErrors = [
        "auth/invalid-email",
        "auth/user-not-found",
        "auth/wrong-password"
      ];

      if (invalidErrors.includes(error.code)) {
        showToast("error", "Invalid username or password!", "bottom");
      } else if (error.code === "auth/too-many-requests") {
        showToast("error", "Too many attempts! Try again later.", "bottom");
      } else {
        showToast("error", "Something went wrong! Please try again.", "bottom");
      }

      console.error("Login Error:", error);
    });
});
