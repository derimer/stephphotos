// Import the repository modules responsible for handling data operations on the tables
// Import the repository modules responsible for handling data operations on the tables
const ItemRepository = require("./models/ItemRepository");
const ImageRepository = require("./models/ImageRepository");
const ContactRepository = require("./models/ContactRepository");
const AdminRepository = require("./models/AdminRepository");

// Create an empty object to hold data repositories for different tables
const tables = {};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table
tables.images = new ImageRepository();
tables.Contact = new ContactRepository();
tables.accueil = new AdminRepository();

tables.item = new ItemRepository();
/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
