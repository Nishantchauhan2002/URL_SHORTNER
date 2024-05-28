const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const shortId = shortid();
  const body = req.body;

  if (!body.url) return res.status(400).json({ msg: "url Is Required" });

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render("home", {
    id: shortId,
  });
  // return res.json({ id: shortId });
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortUrl,
  handleAnalytics,
};
