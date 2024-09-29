# Frequently Asked Questions (FAQ)

## General
**Q: What is the purpose of this project?**  
A: The Digital Art Gallery showcases digital artwork with a focus on a visually stunning and professional presentation.

## Setup Issues
**Q: I am getting errors during npm install. What should I do?**  
A: Ensure you have the correct versions of Node.js and npm. If errors persist, try running `npm cache clean --force` and reinstall.

## Development
**Q: How do I add new artwork to the gallery?**  
A: Artworks are managed through Firebase Firestore. Refer to `GalleryContext.js` for the data fetching and filtering logic.

## Troubleshooting
**Q: My Firebase backup is not working. What should I check?**  
A: Verify your Cloud Scheduler job is active and correctly configured. Check IAM permissions for the service account.
