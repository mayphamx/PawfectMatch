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

const chatContainer = document.getElementById("chatContainer");

// Check if the user is authenticated
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in, you can access the database
    // Reference to the database collection for messages
    const messagesRef = db.collection("messages");

    // Reference to the input field and form
    const messageInput = document.getElementById("message-input");
    const messageForm = document.getElementById("message-form");

    // Listen for form submission
    messageForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const message = messageInput.value.trim();
      if (message !== "") {
        // Add the new message document to the "messages" collection
        messagesRef.add({
          username: user.displayName, // Assuming the user's display name is available
          message: message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
          console.log("Message document added with ID: ", docRef.id);
        })
        .catch(error => {
          console.error("Error adding message document: ", error);
        });

        // Clear the input field
        messageInput.value = "";
      }
    });

    // Listen for new messages using the onSnapshot event listener
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

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
      username,
      message,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${username === messages.username ? "sent" : "received"
      }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});