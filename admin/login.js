// admin/login.js
const adminLoginForm = document.getElementById("adminLoginForm");
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
window.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const doc = await firebase.firestore().collection("users").doc(user.uid).get();
        if (doc.exists && doc.data().role === "admin") {
          if (window.location.pathname.includes("login.html")) {
            showToast("success", `Welcome back, ${user.email}!`, "top");
            setTimeout(() => window.location.href = "admin.html", 2000);
          }
        } else {
          await auth.signOut();
          localStorage.clear();
          showToast("error", "Access denied! Not an admin account.", "bottom");
        }
      } catch (error) {
        console.error("Auth State Error:", error);
      }
    }
  });
});

// Login functionality
adminLoginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const cred = await auth.signInWithEmailAndPassword(email, password);
    const uid = cred.user.uid;
    const doc = await firebase.firestore().collection("users").doc(uid).get();

    if (!doc.exists || doc.data().role !== "admin") {
      await auth.signOut();
      localStorage.clear();
      showToast("error", "Not an admin account!", "bottom");
      return;
    }

    showToast("success", "Login successful! Redirecting...", "top");
    adminLoginForm.reset();
    setTimeout(() => window.location.href = "admin.html", 2000);

  } catch (error) {
    console.error("Login Error:", error);
    const messages = {
      "auth/invalid-email": "Invalid email or password!",
      "auth/user-not-found": "Invalid email or password!",
      "auth/wrong-password": "Invalid email or password!",
      "auth/too-many-requests": "Too many attempts! Try again later."
    };
    showToast("error", messages[error.code] || "Something went wrong! Please try again.", "bottom");
  }
});
