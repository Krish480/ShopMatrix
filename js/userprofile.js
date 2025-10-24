// userprofile.js
// --- DOM Refs ---
const editBtn = document.getElementById("editProfileBtn");
const editForm = document.getElementById("editForm");
const saveBtn = document.getElementById("saveChangesBtn");

const nameEl = document.getElementById("userName");
const emailEl = document.getElementById("userEmail");
const phoneEl = document.getElementById("userPhone");
const addressEl = document.getElementById("userAddress");
const dobEl = document.getElementById("userDOB");
const genderEl = document.getElementById("userGender");

const profilePic = document.getElementById("profilePic");
const editPicBtn = document.getElementById("editPicBtn");
const picOptions = document.getElementById("picOptions");
const uploadPicBtn = document.getElementById("uploadPicBtn");
const deletePicBtn = document.getElementById("deletePicBtn");

const backBtn = document.getElementById("backBtn");

// --- Edit Form Toggle ---
editBtn.addEventListener("click", () => {
    editForm.classList.toggle("hidden");

    // Pre-fill form fields
    document.getElementById("editName").value = nameEl.textContent;
    document.getElementById("editEmail").value = emailEl.textContent;
    document.getElementById("editPhone").value = phoneEl.textContent;
    document.getElementById("editAddress").value = addressEl.textContent;
    document.getElementById("editDOB").value = dobEl.textContent;

    const genderRadios = document.getElementsByName("gender");
    genderRadios.forEach(radio => radio.checked = radio.value === genderEl.textContent);
});

// --- Save Changes ---
saveBtn.addEventListener("click", () => {
    nameEl.textContent = document.getElementById("editName").value;
    emailEl.textContent = document.getElementById("editEmail").value;
    phoneEl.textContent = document.getElementById("editPhone").value;
    addressEl.textContent = document.getElementById("editAddress").value;
    dobEl.textContent = document.getElementById("editDOB").value;

    const genderRadios = document.getElementsByName("gender");
    genderRadios.forEach(radio => { if (radio.checked) genderEl.textContent = radio.value; });

    editForm.classList.add("hidden");
    alert("Profile updated successfully ✅");
});

// --- Profile Pic Update/Delete ---
editPicBtn.addEventListener("click", () => picOptions.classList.toggle("hidden"));

uploadPicBtn.addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file"; fileInput.accept = "image/*"; fileInput.click();
    fileInput.onchange = () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => profilePic.src = e.target.result;
            reader.readAsDataURL(file);
        }
    };
    picOptions.classList.add("hidden");
});

deletePicBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete the profile picture?")) {
        profilePic.src = "https://wallpapers.com/images/hd/default-profile-picture-icon-1fz242lyrnv4gv48.png";
    }
    picOptions.classList.add("hidden");
});

// --- Click outside picOptions to hide ---
document.addEventListener("click", (e) => {
    if (!picOptions.contains(e.target) && !editPicBtn.contains(e.target)) picOptions.classList.add("hidden");
});

// --- Back Button ---
backBtn.addEventListener("click", () => {
    if (document.referrer) window.history.back();
    else window.location.href = "User.html"; // fallback
});

auth.onAuthStateChanged(async (user) => {
    if (!user) return window.location.href = "login.html";
    const doc = await db.collection('users').doc(user.uid).get();
    if (!doc.exists) return window.location.href = "login.html";
    const data = doc.data();

    nameEl.textContent = data.name;
    emailEl.textContent = data.email;

    // pre-fill edit form
    document.getElementById("editName").value = data.name;
    document.getElementById("editEmail").value = data.email;
});

