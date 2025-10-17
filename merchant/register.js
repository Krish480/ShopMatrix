const registerForm = document.getElementById('merchantRegisterForm');

// Custom Toast Function
function showToast(type, message, position = "top") {
    Toastify({
        text: message,
        duration: 3000,
        gravity: position, // top or bottom
        position: "center",
        style: {
            background: type === "success"
                ? "linear-gradient(to right, purple, blue, indigo)"  
                : "linear-gradient(to right, #f87171, #f43f5e)" // red
        }
    }).showToast();
}

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const businessName = document.getElementById('businessName').value.trim();
    const businessId = document.getElementById('businessId').value.trim();
    const businessType = document.getElementById('businessType').value;
    const taxId = document.getElementById('taxId').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const address = document.getElementById('address').value.trim();

    if (password !== confirmPassword) {
        showToast("error", "Passwords do not match!", "bottom");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Store business name in localStorage for dashboard display
            localStorage.setItem('businessName', businessName || email);

            showToast("success", "Merchant registered successfully!", "top");
            registerForm.reset();

            setTimeout(() => {
                window.location.href = "../merchant/dashboard.html";
            }, 2000);
        })
        .catch(error => {
            const invalidErrors = ["auth/email-already-in-use", "auth/invalid-email", "auth/weak-password"];

            if (invalidErrors.includes(error.code)) {
                if (error.code === "auth/email-already-in-use") showToast("error", "Email already registered!", "bottom");
                else if (error.code === "auth/weak-password") showToast("error", "Password should be at least 6 characters!", "bottom");
                else showToast("error", "Invalid email address!", "bottom");
            } else {
                showToast("error", "Something went wrong! Please try again.", "bottom");
            }
            console.error("Registration Error:", error);
        });
});
