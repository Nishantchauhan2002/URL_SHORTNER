const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortUrl);
router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;
