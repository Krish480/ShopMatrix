const userLoginForm = document.getElementById('userLoginForm');

// 🔥 Custom Toast function
function showToast(type, message, position = "top") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: position, // "top" or "bottom"
    position: "center",
    style: {
      background: type === "success"
        ? "linear-gradient(to right, blue, purple, indigo)"
        : "linear-gradient(to right, #f87171, #f43f5e)"
    }
  }).showToast();
}

// 🔹 Redirect if already logged in
window.addEventListener('DOMContentLoaded', () => {
  auth.onAuthStateChanged(user => {
    if (user) {
      const name = user.displayName || localStorage.getItem('userName') || user.email;
      document.getElementById('userGreeting').textContent = `Hello, ${name}`;
      showToast("success", `Welcome back, ${name}!`, "top");
      setTimeout(() => window.location.href = "User.html", 2000);
    }
  });
});

// 🔹 Login functionality
userLoginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      const name = user.displayName || localStorage.getItem('userName') || user.email;

      showToast("success", `Welcome ${name}! Login successful. Redirecting...`, "top");
      userLoginForm.reset();

      setTimeout(() => window.location.href = "User.html", 2000);
    })
    .catch((error) => {
      console.error("Login Error:", error);

      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        showToast("error", "Invalid username or password!", "bottom");
      } else if (error.code === "auth/invalid-email") {
        showToast("error", "Invalid email address!", "bottom");
      } else if (error.code === "auth/too-many-requests") {
        showToast("error", "Too many attempts! Try again later.", "bottom");
      } else {
        showToast("error", "Something went wrong! Please try again.", "bottom");
      }
    });
});
