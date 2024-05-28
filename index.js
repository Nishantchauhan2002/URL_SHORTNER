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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/", staticRoute);

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
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
