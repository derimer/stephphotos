const express = require("express");

const router = express.Router();
const { getItems, getItemById, createItem } = require("../../../controllers/itemActions");
const { deleteItem } = require("../../../controllers/itemActions");
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, read, add } = require("../../../controllers/itemActions");

// Route to get a list of items
router.get("/", browse);
router.get("/items", getItems);
router.get("/items/:id", getItemById);
router.post("/items", createItem);
// Route to get a specific item by ID
router.get("/:id", read);
router.delete("/items/:id", deleteItem); // <-- C'est incorrect si deleteItem n'est pas défini
// Route to add a new item
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
