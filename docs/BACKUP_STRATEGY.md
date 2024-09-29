# Firestore Backup Strategy

## Overview
Regular backups of your Firestore database are crucial to prevent data loss due to errors, corruption, or accidental deletions. This guide outlines how to automate Firestore backups using Google Cloud’s native tools.

## Tools Required
- Google Cloud Platform (GCP) account
- Access to Google Cloud Console
- Firestore Database
- Cloud Storage Bucket for storing backups

## Steps for Backup Configuration

### Step 1: Create a Cloud Storage Bucket
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Navigate to **Storage** > **Buckets** and click **Create Bucket**.
3. Choose a unique name for your bucket (e.g., `digital-art-gallery-backups`).
4. Set the location type to match your Firestore database (Multi-region or Single region).
5. Click **Create** to set up the bucket.

### Step 2: Enable Firestore Backups
1. Navigate to **Firestore** in the Cloud Console.
2. Click on the **Backups** tab.
3. Click **Create a Backup Schedule**.
4. Configure the schedule:
   - **Frequency**: Choose daily, weekly, or custom intervals based on your needs.
   - **Retention Policy**: Set the retention period to ensure old backups are automatically deleted after a specified time.
5. Select the storage bucket you created earlier (`digital-art-gallery-backups`).
6. Click **Save** to enable the scheduled backups.

### Step 3: Automate Backup Exports with Cloud Scheduler
To set up an automated export of your Firestore database to Cloud Storage:
1. Navigate to **Cloud Scheduler** and click **Create Job**.
2. Configure the job:
   - **Name**: `firestore-backup-job`
   - **Frequency**: Set the schedule (e.g., `0 3 * * *` for daily backups at 3 AM).
   - **Target Type**: HTTP
   - **URL**: `https://firestore.googleapis.com/v1/projects/your-project-id/databases/(default)/exportDocuments`
3. **Authentication**: Set to **Service Account** and select an account with `Firestore Admin` permissions.
4. In the **Request Body**, add:
   ```json
   {
     "outputUriPrefix": "gs://digital-art-gallery-backups"
   }
