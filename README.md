# Third-Party Link Capture System

## Overview

This project is designed to capture relevant third-party links from search engine results based on specified keywords associated with a company name. It filters out links from certain domains (including the company's own domain) to narrow its search. This tool was designed for HSG interns to use to aid with third-party link capture.
## Features

- **Keyword Searches**: Performs searches using predefined keywords related to sustainability aspects of a company.
- **Domain Exclusion**: Automatically excludes specific domains to ensure the search results are externally focused.
- **Dynamic Input**: Users can input any company name and URL, which the system uses to tailor the search queries.

## Technical Details

### Technologies Used

- **Node.js**: Serves as the runtime environment.
- **Express.js**: Handles HTTP requests and serves static files.
- **Fetch API**: Used for making search requests to the Bing Search API.
- **HTML/JavaScript**: Provides the frontend interface for user inputs and displays results.

### Setup and Installation

1. **Node.js Installation**: Ensure Node.js is installed on your system.
2. **Dependencies**: Install necessary NPM packages:
   ```bash
   npm install express node-fetch

### To Run
1. Clone the repository
2. Open the terminal and navigate to the local folder
3. Run the following:
   ```bash
   node server.mjs
4. Navigate to `localhost:8000` on any browser.

