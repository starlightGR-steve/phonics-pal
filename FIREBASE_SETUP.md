# Firebase Storage Setup Guide

## Firebase Storage Security Rules

To allow your app to upload and download audio files, you need to configure Firebase Storage security rules.

### Steps:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **phonicspal-tcb**
3. Navigate to **Storage** in the left sidebar
4. Click on the **Rules** tab
5. Replace the default rules with the following:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Allow read/write access to the 'audio' folder
    match /audio/{audioId} {
      // Allow anyone to read audio files
      allow read: if true;

      // Allow anyone to write/delete audio files
      // For production, you should add authentication rules
      allow write, delete: if true;
    }
  }
}
```

6. Click **Publish** to save the rules

### Production Security (Optional but Recommended)

For production use, you should add authentication to prevent unauthorized uploads. Here's an example with Firebase Authentication:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /audio/{audioId} {
      // Allow anyone to read audio files
      allow read: if true;

      // Only allow authenticated users to write/delete
      allow write, delete: if request.auth != null;
    }
  }
}
```

### Testing the Integration

1. Make sure the Firebase Storage rules are published
2. Run your app: `npm run dev`
3. Open the app in your browser: http://localhost:5173
4. Click the Settings icon and select "Cloud" storage
5. Try recording or generating AI audio for a card
6. The audio should be uploaded to Firebase Storage
7. Refresh the page - your audio should persist

### Viewing Uploaded Files

To see your uploaded audio files:
1. Go to Firebase Console → Storage
2. Click on the **Files** tab
3. You should see an `audio/` folder with your uploaded files

### Storage Location Toggle

The app includes a toggle in Settings to switch between:
- **Local Storage** (IndexedDB): Audio saved in browser only
- **Cloud Storage** (Firebase): Audio saved to Firebase, accessible across devices

## Troubleshooting

### CORS Errors
If you see CORS errors, make sure your Firebase Storage bucket has proper CORS configuration.

### Upload Failures
- Check that your Firebase Storage rules allow write access
- Verify your API key is correct in `src/firebase.js`
- Check browser console for detailed error messages

### Files Not Loading
- Ensure Firebase Storage rules allow read access
- Check that files were successfully uploaded (verify in Firebase Console)
- Clear browser cache and try again
