import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { db } from "./firebaseConfig.js";
import { doc, onSnapshot, getDoc } from "firebase/firestore";

//--------------------------------------------------------------
// If you have custom global styles, import them as well:
//--------------------------------------------------------------
import '/src/styles/style.css';

//--------------------------------------------------------------
// Custom global JS code (shared with all pages)can go here.
//--------------------------------------------------------------

// This is an example function. Replace it with your own logic.
function sayHello() {
  // TODO: implement your logic here
}
document.addEventListener('DOMContentLoaded', sayHello);

import {
    onAuthReady
} from "./authentication.js"

// Function to read the quote of the day from Firestore
function readQuote(day) {
    const quoteDocRef = doc(db, "quotes", day); // Get a reference to the document

    onSnapshot(quoteDocRef, docSnap => { // Listen for real-time updates
        if (docSnap.exists()) {          //Document existence check
            document.getElementById("quote-goes-here").innerHTML = docSnap.data().quote;
        } else {
            console.log("No such document!");
        }
    }, (error) => {                      //Listener/system error
        console.error("Error listening to document: ", error);
    });
}

// Function to fetch the signed-in user's name and display it in the UI
function showName() {
      const nameElement = document.getElementById("name-goes-here"); 

      onAuthReady((user) => {

          if (!user) {
              if (window.location.pathname.endsWith('main.html')) {
                  location.href = 'index.html';
              }
              return;
          }

          const name = user.displayName || user.email;
          if (nameElement) nameElement.textContent = `${name}!`;
      });
}


readQuote("tuesday");
showName();