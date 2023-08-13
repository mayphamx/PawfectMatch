import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


// Firebase chat configuration
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

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function writeUserData(userId, name, email, imageUrl) {
const database = getDatabase(firebaseapp);
const reference = ref(database, 'users/'+userId);
set(reference, {
  username: 'name',
  email: 'email',
  profile_picture : 'imageUrl'
  });
}
writeUserData('1', 'Dahlia', 'dahli@email.com', 'imageUrl');


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
