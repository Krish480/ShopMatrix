// user/register.js
const registerForm = document.getElementById('userRegisterForm');
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
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    showToast("error", "Passwords do not match!", "bottom");
    return;
  }

  try {
    // Check if email already exists in Firestore
    const usersRef = firebase.firestore().collection("users");
    const querySnapshot = await usersRef.where("email", "==", email).get();

    if (!querySnapshot.empty) {
      const existingRole = querySnapshot.docs[0].data().role;
      showToast("error", `This email is already registered as ${existingRole}!`, "bottom");
      return;
    }

    // Create user in Firebase Auth
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Set displayName in Firebase Auth
    await user.updateProfile({ displayName: name });
    localStorage.setItem('userName', name);

    // Add user document in Firestore
    await usersRef.doc(user.uid).set({
      name: name,
      email: email,
      role: "user"
    });

    showToast("success", `Welcome ${name}! Registration successful. Redirecting...`, "top");
    registerForm.reset();

    setTimeout(() => window.location.href = "User.html", 2000);

  } catch (error) {
    console.error("Registration Error:", error);

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
