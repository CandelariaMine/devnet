const express = require("express");
const router = express.Router();
const { getDockersData } = require("../controllers/dockers");
const axios = require('axios');
const https = require('https');

router.get("/", async (req, res, next) => {
  try {
    const data = await getDockersData();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/devnet/vm', async (req, res) => {
  // vm: virtual machine
  
});

module.exports = router;
