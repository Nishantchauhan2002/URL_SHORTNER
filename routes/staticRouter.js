const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  const allurls = await URL.find({});

  if (!allurls) {
    return res.json({ err: "No data found" });
  }

  return res.render("home", {
    urls: allurls,
  });
});

module.exports = router;
