# Verify Neon Database Setup

Follow these steps to verify your Neon database is correctly set up:

## 1. Verify Database Initialization

Run the database reset script:

```bash
npm run db:reset
```

Expected output should show successful table creation and seeding without errors.

## 2. Verify Connection in Neon Dashboard

1. Log in to your Neon dashboard
2. Go to your project
3. Click on "Tables" in the sidebar
4. You should see your tables listed (e.g., "messages" table)
5. Click on "SQL Editor" to run a query:
   ```sql
   SELECT * FROM messages;
   ```
   This should show your seeded data

## 3. Verify Server Connection

1. Start your server:

   ```bash
   npm run dev
   ```

2. Check the console for successful database connection logs
   - If you see no database errors, your connection is successful
   - If you see errors, verify your connection string and credentials

## 4. Test API Endpoints

If your API has endpoints that interact with the database:

1. Use a tool like Postman or curl to test your endpoints
2. Verify that data is being successfully stored in and retrieved from the database

## 5. Deploy to Koyeb

If all local tests pass, deploy to Koyeb:

1. Ensure all your code is committed to GitHub (excluding .env file)
2. Set up your environment variables in the Koyeb dashboard
3. Deploy your application
4. Check the deployment logs for successful database connection

## 6. Verify Production Deployment

1. Test your deployed API endpoints
2. Check the Koyeb logs for any database-related errors
3. Verify data persistence by creating test entries and confirming they're stored

If all these steps complete without errors, your Neon database is properly set up and connected to your application!
