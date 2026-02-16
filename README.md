# Slice & Spice | Premium Fast Food Delivery

Welcome to the Slice & Spice Next.js application. This project is built with Next.js 15, React, Tailwind CSS, and Firebase.

## Getting Started

To run the development server:
```bash
npm run dev
```

## Custom Domains

Your application is configured to use the custom domain: **slicespice.co.ke**. To finish setting this up in the Firebase Console:

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Select your project: **studio-2954956221-d79a9**.
3.  In the left sidebar, navigate to **Build** > **App Hosting**.
4.  Select your backend from the list.
5.  Click on the **Settings** tab.
6.  In the **Domains** section, click **Add custom domain**.
7.  Enter `slicespice.co.ke` and follow the prompts to verify ownership via DNS.

## Pushing to GitHub

To create a GitHub repository for this project, follow these steps:

1.  **Create a Repository**: Go to [GitHub](https://github.com/new) and create a new, empty repository.
2.  **Initialize Git**: Open your terminal in the project root and run:
    ```bash
    git init
    git add .
    git commit -m "Initial commit: Gold Standard Slice & Spice App"
    ```
3.  **Link and Push**: Replace `<YOUR_GITHUB_REPO_URL>` with the URL of the repo you just created:
    ```bash
    git remote add origin <YOUR_GITHUB_REPO_URL>
    git branch -M main
    git push -u origin main
    ```

## Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components (ShadCN).
- `src/firebase`: Firebase configuration and custom hooks for Firestore and Auth.
- `src/ai`: Genkit AI flows for personalized recommendations.
- `docs/backend.json`: Blueprint for the application's data structure and authentication.

## Admin Access

To access the **Admin Command Center** at `/admin/dashboard`:
1.  Sign in to the application.
2.  Ensure your User UID is added to the `roles_admin` collection in Firestore.
3.  Access the dashboard via the User Profile menu in the navigation bar.
