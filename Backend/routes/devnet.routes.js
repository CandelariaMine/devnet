const express = require("express");
const { getDataVmDevnet } = require("../controllers/devnet");
const router = express.Router();

router.get('/vm', async (req, res) => {
  const data = await getDataVmDevnet();
  res.status(data.statusCode).json(data);
});

module.exports = router;
