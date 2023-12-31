

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

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("Please Tell Us Your Name");

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
  const message = `<li class=${username === messages.username ? "sent" : "receive"
      }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});