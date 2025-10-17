const registerForm = document.getElementById("adminRegisterForm");

// 🔥 Custom Toast Function
function showToast(type, message, position = "top") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: position, // top or bottom
    position: "center",
    style: {
      background: type === "success"
        ? "linear-gradient(to right, blue, purple, indigo)"
        : "linear-gradient(to right, #f87171, #f43f5e)"
    }
  }).showToast();
}

// 🔹 Registration Logic
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    showToast("error", "Passwords do not match!", "bottom");
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    showToast("success", `Welcome ${name}! Admin registered successfully.`, "top");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);

  } catch (error) {
    console.error(error);
    showToast("error", error.message, "bottom");
  }
});
