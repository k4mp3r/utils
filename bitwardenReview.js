/**
 * READ THE README AND ALL COMMENTS BEFORE PROCEEDING!!!
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