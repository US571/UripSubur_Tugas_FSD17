const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

// Import functions from contact.js
const {
  saveContact,
  listContact,
  detailContact,
  deleteContact,
} = require("./contact");

// YARGS Commands
yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Add new contact",
    builder: {
      name: { describe: "Full name", demandOption: true, type: "string" },
      email: { describe: "Email", demandOption: false, type: "string" },
      mobile: { describe: "Mobile number", demandOption: true, type: "string" },
    },
    handler(argv) {
      saveContact(argv.name, argv.email, argv.mobile);
    },
  })

  .command({
    command: "list",
    describe: "Show contact list",
    handler() {
      listContact();
    },
  })

  .command({
    command: "detail",
    describe: "Show contact detail",
    builder: {
      name: { describe: "Full name", demandOption: true, type: "string" },
    },
    handler(argv) {
      detailContact(argv.name);
    },
  })

  .command({
    command: "delete",
    describe: "Delete a contact",
    builder: {
      name: { describe: "Full name", demandOption: true, type: "string" },
    },
    handler(argv) {
      deleteContact(argv.name);
    },
  })

  .demandCommand()
  .parse();