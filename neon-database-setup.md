# Neon PostgreSQL Database Setup Guide

This guide walks you through setting up a PostgreSQL database on Neon and connecting it to your Koyeb-deployed application.

## Step 1: Create a Neon Account

1. Go to https://neon.tech/
2. Click "Sign Up" (or "Get Started for Free")
3. Sign up using GitHub, Google, or an email address
4. Complete the registration process

## Step 2: Create a New Project

1. Once logged in, click "New Project" on the dashboard
2. Enter a name for your project (e.g., "my-server-project")
3. Select the region closest to your Koyeb deployment for optimal performance
   - If your Koyeb app is deployed in Europe, choose a European region
   - If deployed in the US, choose a US region
4. Click "Create Project"

## Step 3: Access Your Database

1. After project creation, you'll be taken to the project dashboard
2. Note your database connection details:
   - On the dashboard, find the "Connection Details" section
   - Make sure "Connection string" is selected in the dropdown
   - Copy the provided PostgreSQL connection string

## Step 4: Create Database Tables

You have multiple options to create your database tables:

### Option 1: Using the Neon SQL Editor

1. In your project dashboard, click on the "SQL Editor" tab
2. Enter your SQL commands to create tables, for example:

```sql
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. Click "Run" to execute the SQL

### Option 2: Using Your Application's Database Scripts

1. Update your local `.env` file with the Neon connection string
2. Run your database setup scripts locally:

```bash
npm run db:reset
```

## Step 5: Connect Your Koyeb Application to Neon

1. Go to your Koyeb dashboard: https://app.koyeb.com/
2. Navigate to your application
3. Click on "Settings" → "Environment variables"
4. Add the following environment variables:
   - `DATABASE_URL`: Your full Neon connection string
   - `DB_HOST`: The hostname from your Neon connection string
   - `DB_USER`: The username from your Neon connection string
   - `DB_PASSWORD`: The password from your Neon connection string
   - `DB_NAME`: The database name from your Neon connection string
   - `DB_PORT`: 5432 (default PostgreSQL port)
5. Set these as "Secret" type for sensitive values
6. Click "Update" to save these variables

## Step 6: Redeploy Your Application

1. In your Koyeb dashboard, redeploy your application to apply the new environment variables
2. Monitor the deployment logs for any database connection issues

## Step 7: Verify the Database Connection

1. Once deployed, check your application logs in Koyeb
2. Look for successful database connection messages
3. Test your application endpoints that interact with the database

## Step 8: Database Management

To manage your Neon database:

1. Use the Neon dashboard to:

   - Monitor database performance
   - Check storage usage
   - View active connections
   - Set up database branches (for development/testing)

2. For database administration tasks:
   - Use the built-in SQL Editor in Neon
   - Connect using a PostgreSQL client like pgAdmin, using the connection details provided by Neon

## Troubleshooting Common Issues

1. **Connection Issues**:

   - Verify the connection string is correctly copied to Koyeb
   - Check if IP restrictions are enabled in Neon (usually not by default)

2. **Authentication Errors**:

   - Ensure the username/password in the connection string is correct
   - Try resetting the password in Neon if needed

3. **Database Creation Issues**:
   - If you're running migration scripts that need to create the database, make sure your database user has the necessary permissions

## Security Best Practices

1. Never commit your Neon credentials to your repository
2. Use environment variables for database connection details
3. Consider setting up a separate database user with limited permissions for your application
4. Regularly rotate database credentials
5. Enable SSL for database connections (enabled by default in Neon)

## Scaling Your Database

Neon automatically handles scaling. As your application grows:

1. Monitor your database usage through the Neon dashboard
2. Consider upgrading your plan if you exceed free tier limits
3. Use database branches for testing new features without affecting production
