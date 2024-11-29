const express = require("express");

const apiRouter = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, read, add } = require("../../../controllers/itemActions");

// Route to get a list of items
apiRouter.get("/", browse);

// Route to get a specific item by ID
apiRouter.get("/:id", read);

// Route to add a new item
apiRouter.post("/", add);

/* ************************************************************************* */

module.exports = apiRouter;
