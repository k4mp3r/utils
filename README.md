# Collection of Useful Utilities

## Bitwarden
* This script is designed to take a bitwarden export file, remove duplicates, and sort logins into folders based on password.
* To use this script
  * export your bitwarden vault onto your local machine.
    * https://bitwarden.com/help/export-your-data/
  * Place exported file in this directory and rename to `bitwarden_export.json`
  * Run `node bitwardenReview.js`
  * The output file `bitwarden_import.json` will have removed any duplicates and sorted logins into folders as defined below.
* Read the important warnings below before proceeding and for instructions on importing.
  * https://bitwarden.com/help/import-data/
* Use at your own risk.

**IMPORTANT**: bitwarden imports do not update existing logins, so you will have duplicates. I recommend exporting, running this script, importing. Verify everything is working as desired, all items should now have duplicates with the new items add the the correct folders.
  * If everything works, delete all items and folders from the vault and reimport the same file and you should be good to go.

**VERY IMPORTANT**: Once done, delete the import and export files from your computer AND empty the trash/recycle bin

**VERY VERY IMPORTANT**: DO NOT COMMIT PASSWORD VALUES TO GITHUB. UPDATE, RUN THE SCRIPT, THEN REVERT.