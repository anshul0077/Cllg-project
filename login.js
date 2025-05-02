import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyClGUQ19AyxGa44qHWZMsqrUPtl7_CCTWQ",
  authDomain: "voting-app-e8e20.firebaseapp.com",
  projectId: "voting-app-e8e20",
  storageBucket: "voting-app-e8e20.appspot.com",
  messagingSenderId: "326282693756",
  appId: "1:326282693756:web:62d101d8543726d11fcdf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Basic alert fallback
function showMessage(msg, id) {
  alert(msg);
}

// SIGN UP
const signUp = document.getElementById('rgsubmit');
signUp.addEventListener('click', (event) => {
  event.preventDefault();

  const name = document.getElementById("rName").value;
  const lastName = document.getElementById("rLastname").value;
  const number = document.getElementById("rNumber").value;
  const dob = document.getElementById("rDate").value;
  const gender = document.getElementById("rGender").value;
  const card = document.getElementById("rCard").value;
  const cardDets = document.getElementById("rcard-dets").value;
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email,
        name,
        lastName,
        number,
        dob,
        gender,
        card,
        cardDets,
        password,
        // Don't store password here
      };

      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          showMessage('User registered successfully!', 'signUpMessage');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 2000);
        })
        .catch((error) => {
          console.error("Firestore error:", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists!', 'signUpMessage');
      } else {
        showMessage('Unable to create user', 'signUpMessage');
      }
    });
});

// SIGN IN
const signIn = document.getElementById('login-btn');
signIn.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.getElementById('login-id').value;
  const password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      showMessage('Login is successful', 'signInMessage');

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        showMessage('Incorrect Email or Password', 'signInMessage');
      } else {
        showMessage('Account does not exist', 'signInMessage');
      }
    });
});
