const express = require("express");
const router = express.Router();
const hootsCtrl = require("../controllers/hoots");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

// All paths start with '/api/hoots'

// Protect all defined routes
router.use(ensureLoggedIn);

// Nested comments routes
router.use("/:hootId/comments", require("./comments"));

// GET /api/hoots (INDEX action)
router.get("/", hootsCtrl.index);
// POST /api/hoots (CREATE action)
router.post("/", hootsCtrl.create);
// SHOW /api/hoots/:hootId (SHOW action)
router.get("/:hootId", hootsCtrl.show);
// PUT /api/hoots/:hootId (UPDATE action)
router.put("/:hootId", hootsCtrl.update);
// DELETE /api/hoots/:hootId (DELETE action)
router.delete("/:hootId", hootsCtrl.deleteHoot);

module.exports = router;
