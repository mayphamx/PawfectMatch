// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzyudCeG9nMM-QJ2d3dIMfNh8MwUBpucs",
  authDomain: "pawfectmatch-ad734.firebaseapp.com",
  databaseURL: "https://pawfectmatch-ad734-default-rtdb.firebaseio.com",
  projectId: "pawfectmatch-ad734",
  storageBucket: "pawfectmatch-ad734.appspot.com",
  messagingSenderId: "1090112866224",
  appId: "1:1090112866224:web:cd6ea2db0cb770bd7cb875",
  measurementId: "G-ETT9N3LBPX"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Check if the user is authenticated
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    const messagesRef = db.collection("messages");

    const messageInput = document.getElementById("message-input");
    const messageForm = document.getElementById("message-form");

    messageForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const message = messageInput.value.trim();
      if (message !== "") {
        messagesRef.add({
          username: user.displayName,
          message: message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
          console.log("Message document added with ID: ", docRef.id);
        })
        .catch(error => {
          console.error("Error adding message document: ", error);
        });

        messageInput.value = "";
      }
    });

    messagesRef.orderBy("timestamp")
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            const messageData = change.doc.data();
            const messageElement = document.createElement("li");
            messageElement.textContent = `${messageData.username}: ${messageData.message}`;
            document.getElementById("messages").appendChild(messageElement);
          }
        });
      });
  } else {
    document.getElementById("chat-container").style.display = "none";
    document.getElementById("login-prompt").style.display = "block";
  }
});

// Submit form
document.getElementById("message-form").addEventListener("submit", sendMessage);

// Send message to firestore
function sendMessage(e) {
  e.preventDefault();

  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  if (message !== "") {
    db.collection("messages").add({
      username: user.displayName,
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log("Message sent successfully.");
      messageInput.value = "";
    })
    .catch(error => {
      console.error("Error sending message: ", error);
    });
  }
}

// Listen for new messages and display them
db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = ""; // Clear previous messages

  snapshot.forEach(doc => {
    const messageData = doc.data();
    const messageElement = document.createElement("li");
    messageElement.textContent = `${messageData.username}: ${messageData.message}`;
    messagesContainer.appendChild(messageElement);
  });
});