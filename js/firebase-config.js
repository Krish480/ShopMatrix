// Import the Firebase scripts (only add this once in your HTML <head>)
/*
<script src="https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"></script>
*/

const firebaseConfig = {
  apiKey: "AIzaSyAvmzU76XDNfSNgto2bcdbl6wPpRKJ9p8w",
  authDomain: "shopmatrix-23995.firebaseapp.com",
  projectId: "shopmatrix-23995",
  storageBucket: "shopmatrix-23995.appspot.com",
  messagingSenderId: "590775224243",
  appId: "1:590775224243:web:2bc94810a3aca673916dc6"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
