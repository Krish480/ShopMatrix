// REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await firebase.firestore().collection("users").doc(user.uid).set({
        name,
        email,
        role,
      });

      alert("Registration successful!");
      window.location.href = "login.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const userDoc = await firebase.firestore().collection("users").doc(user.uid).get();

      const role = userDoc.data().role;

      if (role === "admin") window.location.href = "admin.html";
      else if (role === "merchant") window.location.href = "create-shop.html";
      else window.location.href = "user.html";
    } catch (error) {
      alert(error.message);
    }
  });
}
