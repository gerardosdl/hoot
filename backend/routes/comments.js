const express = require("express");
const router = express.Router({ mergeParams: true });
const commentsCtrl = require("../controllers/comments");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

// All paths start with '/api/hoots'

// Protect all defined routes
router.use(ensureLoggedIn);

// POST /api/hoots/:hootId/comments
router.post("/", commentsCtrl.create);
// PUT /api/hoots/:hootId/comments/:commentId
router.put("/:commentId", commentsCtrl.update);
// DELETE /api/hoots/:hootId/comments/:commentId
router.delete("/:commentId", commentsCtrl.deleteComment);

module.exports = router;
