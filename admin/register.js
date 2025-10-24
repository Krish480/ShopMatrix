// admin/register.js
const adminRegisterForm = document.getElementById('adminRegisterForm');
// Pre-approved admin emails
const allowedAdminEmails = [
  "adminshopmatrix@gmail.com",
  "adminshopmatrix100@gmail.com",
  "adminshopmatrix200@gmail.com"
];

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

// Form submit
adminRegisterForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    showToast("error", "Passwords do not match!", "bottom");
    return;
  }

  // Check if email is allowed for admin
  if (!allowedAdminEmails.includes(email)) {
    showToast("error", "This email is not authorized for admin registration!", "bottom");
    return;
  }

  try {
    // Check if email already exists in Firestore
    const usersRef = firebase.firestore().collection("users");
    const querySnapshot = await usersRef.where("email", "==", email).get();

    if (!querySnapshot.empty) {
      showToast("error", "This email is already registered!", "bottom");
      return;
    }

    // Create user in Firebase Auth
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Set displayName in Firebase Auth
    await user.updateProfile({ displayName: name });
    localStorage.setItem('userName', name);

    // Add admin document in Firestore
    await usersRef.doc(user.uid).set({
      name: name,
      email: email,
      role: "admin"
    });

    showToast("success", `Welcome ${name}! Admin registration successful. Redirecting...`, "top");
    adminRegisterForm.reset();

    setTimeout(() => window.location.href = "admin.html", 2000);

  } catch (error) {
    console.error("Admin Registration Error:", error);

    if (error.code === "auth/email-already-in-use") {
      showToast("error", "This email is already registered!", "bottom");
    } else if (error.code === "auth/weak-password") {
      showToast("error", "Password should be at least 6 characters!", "bottom");
    } else if (error.code === "auth/invalid-email") {
      showToast("error", "Invalid email address!", "bottom");
    } else {
      showToast("error", "Something went wrong! Please try again.", "bottom");
    }
  }
});
