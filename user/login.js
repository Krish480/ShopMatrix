// user/login.js
const userLoginForm = document.getElementById('userLoginForm');
// Custom Toast
function showToast(type, message, position = "top") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: position,
    position: "center",
    style: {
      background: type === "success"
        ? "linear-gradient(to right, blue, purple, indigo)"
        : "linear-gradient(to right, #f87171, #f43f5e)"
    }
  }).showToast();
}

// Redirect if already logged in
window.addEventListener('DOMContentLoaded', () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const doc = await firebase.firestore().collection("users").doc(user.uid).get();
        if (doc.exists && doc.data().role === "user") {
          // Redirect only if on login page
          if (window.location.pathname.includes("login.html")) {
            const name = doc.data().name || user.email;
            localStorage.setItem('userName', name);
            showToast("success", `Welcome back, ${name}!`, "top");
            setTimeout(() => window.location.href = "User.html", 2000);
          }
        } else {
          // Wrong role → logout, no redirect loop
          await auth.signOut();
          localStorage.clear();
          showToast("error", "Access denied! Not a user account.", "bottom");
        }
      } catch (error) {
        console.error("Auth State Error:", error);
      }
    }
  });
});

// Login functionality
userLoginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    const doc = await firebase.firestore().collection("users").doc(user.uid).get();
    if (doc.exists && doc.data().role === "user") {
      const name = doc.data().name || user.email;
      localStorage.setItem('userName', name);

      showToast("success", `Welcome ${name}! Login successful. Redirecting...`, "top");
      userLoginForm.reset();
      setTimeout(() => window.location.href = "User.html", 2000);
    } else {
      await auth.signOut();
      localStorage.clear();
      showToast("error", "Access denied! Not a user account.", "bottom");
    }

  } catch (error) {
    console.error("Login Error:", error);
    const messages = {
      "auth/user-not-found": "Invalid username or password!",
      "auth/wrong-password": "Invalid username or password!",
      "auth/invalid-email": "Invalid email address!",
      "auth/too-many-requests": "Too many attempts! Try again later."
    };
    showToast("error", messages[error.code] || "Something went wrong! Please try again.", "bottom");
  }
});
