

  // Import the functions you need from the SDKs
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
  import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyClGUQ19AyxGa44qHWZMsqrUPtl7_CCTWQ",
    authDomain: "voting-app-e8e20.firebaseapp.com",
    projectId: "voting-app-e8e20",
    storageBucket: "voting-app-e8e20.appspot.com", // ✅ fixed typo
    messagingSenderId: "326282693756",
    appId: "1:326282693756:web:62d101d8543726d11fcdf9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Function to show user messages
  function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
      messageDiv.style.opacity = 0;
      messageDiv.style.display = "none"; // ✅ hide message after fade
    }, 5000);
  }

  // SIGN UP FUNCTIONALITY
  const signUp = document.getElementById('rgsubmit');
  signUp.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('rName').value;
    const lastName = document.getElementById('rLastname').value;
    const number = document.getElementById('rNumber').value;
    const Gender = document.getElementById('rGender').value;
    const DOB = document.getElementById('rDate').value;
    const card = document.getElementById('rCard').value;
    const cardDets = document.getElementById('rcard-dets').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: email,
          firstName: firstName,
          lastName: lastName,
          number: number,
          Gender: Gender,
          DOB: DOB,
          card: card,
          cardDets: cardDets
        };

        showMessage('Account Created Successfully', 'signUpMessage');

        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
          .then(() => {
            setTimeout(() => {
              window.location.href = 'index.html'; // ✅ wait before redirect
            }, 2000);
          })
          .catch((error) => {
            console.error("Error writing document", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          showMessage('Email Address Already Exists !!!', 'signUpMessage');
        } else {
          showMessage('Unable to create user', 'signUpMessage');
        }
      });
  });

  // SIGN IN FUNCTIONALITY
  const signIn = document.getElementById('login-btn');
  signIn.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        showMessage('Login is successful', 'signInMessage');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);

        setTimeout(() => {
          window.location.href = 'index.html'; // ✅ delayed redirect
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

