require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const authRouter = require('./router/authRouter');
const app = express();
const authenticate = require('./middleware/authenticate');
// CORS setup for local dev
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/api/auth', authRouter);


// Passport config
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, (profile, done) => {
  return done(null, profile);
}));

app.use(passport.initialize());

// Auth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:3000/start' }),
  (req, res) => {
    // Generate JWT
    const token = jwt.sign({
      id: req.user.id,
      displayName: req.user.displayName,
      emails: req.user.emails,
      photos: req.user.photos,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Redirect to frontend with token in URL
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

app.get('/api/user', authenticate, (req, res) => {
  res.json({ user: req.user });
});



app.use(express.json());


app.get('/',(req,res)=>{
  res.send("Hello World");
})

const PORT = process.env.PORT || 5000;
const start = async () => { 
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();