import express from "express";
import scrapeMediumArticles from "../utils/scraper.js";

const router = express.Router();

// GET METHOD: '/articles'
// Description: 'Redirecting to full article on Medium'
router.get("/articles", (req, res) => {
  try {
    const url = req.query.articleUrl;
    if (!url) {
      throw new Error("URL is required");
    }

    // Redirect to the URL
    res.redirect(url);
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(400).json({ error: error.message });
  }
});

// POST METHOD: '/scrape'
// Description: 'Accepts a topic & initiates scraping. Returns the top 5 articles'
router.post("/scrape", async (req, res) => {
  try {
    const searchQuery = req.body.searchQuery;
    const content = await scrapeMediumArticles(searchQuery);
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to scrape articles" });
  }
});

export default router;
