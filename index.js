const express = require("express");
const { connectToMongoDb } = require("./connect");
const path = require("path");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = 3828;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Connected with mongodb ")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//telling the app that if any route starts with any below mentioned symbol then which route we have to use 
app.use("/", staticRoute);
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  if (!entry) return res.status(404).json({ err: "No shortId" });
  else {
    res.redirect(entry.redirectURL);
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
