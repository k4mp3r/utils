/**
 * This script is designed to take a bitwarden export file, remove duplicates, and sort logins into folders based on
 * password.
 * 
 * To use this script, export your bitwarden vault onto your local machine. Place in this directory and rename to 
 * bitwarden_export.json then run `node bitwardenReview.js` The output file `bitwarden_import.json` will have removed any
 * duplicates and sort logins into folders as defined below.
 * 
 * IMPORTANT: bitwarden imports do not update existing logins, so you will have duplicates. I recommend exporting, running this script,
 * importing. Verify everything is working as desired, all items should now have duplicates with the new items add the the correct folders.
 * If everything works, delete all items and folders from the vault and reimport the same file and you should be good to go.
 * 
 * VERY IMPORTANT: Once done, delete the import and export files from your computer AND empty the trash/recycle bin
 * VERY VERY IMPORTANT: DO NOT COMMIT PASSWORD VALUES TO GITHUB. UPDATE, RUN THE SCRIPT, THEN REVERT.
 */


import data from './bitwarden_export.json' assert { type: "json" };
import * as fs from 'fs';

let unique = [];
// DO NOT COMMIT THESE VALUES. UPDATE, RUN THE SCRIPT, THEN REVERT.
const BAD_PASS_LIST = ['', '']; // List of old compromised passwords.
const LEGACY_PASS_LIST = ['', '']; // List of patterns found in old passwords not yet compromised, but should be updated.
const VALID_PASS_PATTERNS = ['']; // List of patterns found in valid passwords.
// FOLDER ID's from exported data
const BAD_PASS_FOLDER = '';
const LEGACY_PASS_FOLDER = '';
const NEEDS_REVIEW_FOLDER = ''
const VERIFIED_PASS_FOLDER = ''

console.log(data.items.length);

// Remove duplicates from items array
data.items.map((item, index) => {
  if (!item.name == data.items[index + 1]?.name) {
    unique.push(item)
  }
});

// Assign logins to folders based on password
unique.map(item => {
  if (item.type == 1) {
    console.log(item.id, item.login?.password)
    if (BAD_PASS_LIST.some(pass => item.login?.password.includes(pass))) {
      item.folderId = BAD_PASS_FOLDER
      return;
    } else if (LEGACY_PASS_LIST.some(pass => item.login?.password.includes(pass))) {
      item.folderId = LEGACY_PASS_FOLDER
      return;
    } else if (VALID_PASS_PATTERNS.some(pass => item.login?.password.includes(pass))) {
      item.folderId = VERIFIED_PASS_FOLDER
      return;
    } else {
      item.folderId = NEEDS_REVIEW_FOLDER
      return;
    }
  }
});

// Replace bitwarden data with updated items.
data.items = unique;

// Output file to import into empty vault.
fs.writeFile('bitwarden_to_import.json', JSON.stringify(data), 'utf8', (err) => {
  if (err)
    console.log(err);
  else {
    console.log(`File written successfully with with ${data.items.length} items.`);
  }
});