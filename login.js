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
let btn=document.querySelector("#login-btn")
btn.addEventListener("click",()=>{
    alert("jello")
})

const signUp = document.getElementById('login-btn');
  signUp.addEventListener('click', (event) => {
    event.preventDefault();


    const email = document.getElementById('l-email').value;
    const password = document.getElementById('l-password').value;
    const firstName = document.getElementById('l-text').value;
    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: email,
          firstName: firstName,
          password:password
         
        };

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