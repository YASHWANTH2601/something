import express from "express";
import passport from "passport";
import cors from "cors";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import authRouter from "./router/authRouter.js";
import authenticate from "./middleware/authenticate.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
const app = express();
import dotenv from "dotenv";
dotenv.config();
// CORS setup for local dev
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);

// Passport config
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

app.use(passport.initialize());

// Auth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:3000/start",
  }),
  (req, res) => {
    // Generate JWT
    const token = jwt.sign(
      {
        id: req.user.id,
        displayName: req.user.displayName,
        emails: req.user.emails,
        photos: req.user.photos,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Redirect to frontend with token in URL
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

app.get("/api/user", authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
