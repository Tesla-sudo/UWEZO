# Frontend Setup Guide

This section outlines the steps required to prepare and run the frontend development environment using React and Tailwind CSS.

# Prerequisites

Ensure the following tools are installed on your system:

Node.js (v18 or later recommended)
npm (comes with Node.js)
A code editor such as VS Code

You can verify installations using:

node -v
npm -v

# Project Initialization

Navigate to the frontend project directory and install dependencies.

npm install

This command installs all required packages defined in the package.json file.

Tailwind CSS Configuration Cleanup

Tailwind CSS is already installed and configured in this project. Perform the following cleanup steps to ensure a consistent styling setup.

1. Delete the Default React CSS File

Remove the unused default stylesheet:

src/App.css

This file is no longer needed because styling will be handled entirely using Tailwind utility classes.

2. Update index.css

Open:

src/index.css

Remove all existing CSS except the Tailwind directives at the top.

The file should look like this:

`@import "tailwindcss";`

Do not add any additional global styles unless explicitly required.

Running the Development Server

Start the local development server using:

npm run dev

After running this command:

The application will compile
A local development URL will be generated
The app will automatically reload on file changes

Typical output:

Local: http://localhost:5173/

Open the URL in your browser to view the application.

Development Workflow

All frontend development should be performed inside the:

src/

directory.

Recommended File Editing Areas
src/
│
├── components/      # Reusable UI components
├── pages/           # Application pages / views
├── assets/          # Images, icons, static files
├── hooks/           # Custom React hooks
├── services/        # API and business logic
├── utils/           # Helper functions
│
├── App.jsx          # Root component
├── main.jsx         # Application entry point
└── index.css        # Tailwind styles

# Styling Guidelines

This project follows a Tailwind-first styling approach.

Use:
className="flex items-center justify-center p-4"
Avoid:
.custom-class {
  margin: 10px;
}

unless absolutely necessary.

# Troubleshooting
If dependencies fail to install

Run:

rm -rf node_modules package-lock.json
npm install

# Begin development inside src/
