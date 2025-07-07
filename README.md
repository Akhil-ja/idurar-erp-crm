<div align="center">
    <a href="https://www.idurarapp.com/">
  <img src="https://avatars.githubusercontent.com/u/50052356?s=200&v=4" width="128px" />
    </a>
    <h1>Open Source ERP / CRM Accounting Invoice Quote</h1>
    <p align="center">
        <p>IDURAR ERP CRM | Simple To Use</p>
    </p>
</div>

IDURAR is an Open Source ERP / CRM (Invoice / Quote / Accounting) based on the MERN Stack (Node.js / Express.js / MongoDB / React.js) with Ant Design (AntD) and Redux.

## Features:
- Invoice Management
- Payment Management
- Quote Management
- Customer Management
- Ant Design Framework (AntD) 🐜
- Built on MERN Stack (Node.js / Express.js / MongoDb / React.js) 👨‍💻

## Recent Development Updates

This section outlines recent enhancements and the testing approach for new features.

### Invoice AI Summary Integration

**Description:** Integrated Gemini AI to provide automated summaries for invoice item notes. This feature enhances readability and quick comprehension of detailed invoice entries.

**Changes:**
-   **Backend:**
    -   Added Gemini AI dependency.
    -   Implemented logic to summarize invoice item notes using Gemini AI.
    -   Updated Invoice model to include notes field and validation.
    -   Modified PDF export to include the summarized notes.
-   **Frontend:**
    -   Implemented UI to display invoice item and main invoice notes.

**Testing:**
-   **Manual Testing:**
    -   Verified that invoice item notes are correctly summarized by the AI.
    -   Confirmed that the summarized notes are displayed in the UI and included in PDF exports.

### Query Management Feature

**Description:** Implemented a comprehensive Query management system, allowing users to create, read, update, and delete customer queries. This includes managing query status, resolution, and associated notes.

**Changes:**
-   **Backend:**
    -   Added Query model with schema validation (`backend/src/models/appModels/Query.js`).
    -   Implemented API endpoints for creating, reading, updating, deleting, and listing queries (`backend/src/controllers/appControllers/queryController/`).
    -   Developed endpoints for adding and removing notes associated with queries.
-   **Frontend:**
    -   Set up core Query module structure and routing (`frontend/src/modules/queryModule/`).
    -   Implemented Query list view and basic form fields (`frontend/src/modules/queryModule/Forms/QueryForm.jsx`).
    -   Developed Query read view and initial notes subsystem (`frontend/src/modules/queryModule/ReadQueryModule/`).
    -   Addressed API call and rendering issues related to Query management.

**Testing:**
-   **Postman Collection:** A Postman collection (`backend/src/tests/QueryTests.postman_collection.json`) is provided for comprehensive API testing of the Query endpoints (create, read, update, delete, add note, remove note, paginated list).
-   **Manual Testing:**
    -   Verified full CRUD operations for queries through the frontend UI.
    -   Tested adding and removing notes from queries.
    -   Confirmed correct display of query lists and individual query details.

### Query PDF Download Functionality

**Description:** Added the ability to download Query details as a PDF document. This feature allows users to generate printable reports of individual queries, including their descriptions, status, resolution, and associated notes.

**Changes:**
-   **Backend:**
    -   Created a new Pug template (`backend/src/pdf/Query.pug`) for rendering Query data into a PDF format.
    -   Updated the PDF generation controller (`backend/src/controllers/pdfController/index.js`) to recognize and process `Query` models, directing them to the new `Query.pug` template.
-   **Frontend:**
    -   Added a "Download PDF" button to the Query read view (`frontend/src/modules/queryModule/ReadQueryItem.jsx`), enabling users to trigger the PDF generation and download.
    -   Integrated the `FilePdfOutlined` icon for visual clarity.

**Testing:**
-   **Manual Testing:**
    -   Verified that clicking the "Download PDF" button on a Query's detail page successfully generates and downloads a PDF file.
    -   Confirmed that the generated PDF contains accurate Query information (description, status, resolution, customer details, and notes).
    -   Checked for proper formatting and styling of the PDF content.

### UI Refinement: Removed "Add Note" from Query Table

**Description:** Streamlined the user interface by removing the "Add Note" option from the three-dot menu within the Query data table. This change aims to simplify the table's context menu, as note management is now handled directly within the Query's detail view.

**Changes:**
-   **Frontend:**
    -   Removed the "Add Note" menu item from `frontend/src/modules/queryModule/QueryDataTableModule.jsx`.

**Testing:**
-   **Manual Testing:**
    -   Confirmed that the "Add Note" option no longer appears in the Query table's action menu.
    -   Verified that existing note functionality within the Query detail view remains unaffected.

## Getting Started

Follow these steps to set up and run the Idurar ERP/CRM application locally.

#### Step 1: Clone the repository

```bash
git clone https://github.com/idurar/idurar-erp-crm.git
```

```bash
cd idurar-erp-crm
```

#### Step 2: Create Your MongoDB Account and Database Cluster

- Create your own MongoDB account by visiting the MongoDB website and signing up for a new account.
- Create a new database or cluster by following the instructions provided in the MongoDB documentation. Remember to note down the "Connect to your application URI" for the database, as you will need it later. Also, make sure to change `<password>` with your own password.
- Add your current IP address to the MongoDB database's IP whitelist to allow connections (this is needed whenever your IP changes).

#### Step 3: Edit the Environment File

- Navigate to the `/backend` directory.
- Create a file named `.env` if it doesn't exist.
- This file will store environment variables for the project to run.

#### Step 4: Update Environment Variables

In the `backend/.env` file, configure the following:

```
DATABASE="your-mongodb-uri"
GEMINI_API_KEY="your-gemini-api-key"
JWT_SECRET="your_private_jwt_secret_key"
NODE_ENV="production"
OPENSSL_CONF='/dev/null'
```
- Replace `"your-mongodb-uri"` with the actual URI of your MongoDB database.
- Replace `"your-gemini-api-key"` with your actual Gemini API key.
- Replace `"your_private_jwt_secret_key"` with a strong, unique secret key for JWT.

#### Step 5: Install Backend Dependencies

In your terminal, navigate to the `/backend` directory:

```bash
cd backend
```

Then, run the following command to install the backend dependencies:

```bash
npm install
```

#### Step 6: Run Setup Script

While still in the `/backend` directory, execute the following command to run the setup script:

```bash
npm run setup
```

This script performs necessary database migrations and initialization tasks.

#### Step 7: Run the Backend Server

In the same terminal, run the following command to start the backend server:

```bash
npm run dev
```

This will start the backend server, listening for incoming requests.

#### Step 8: Install Frontend Dependencies

Open a new terminal window, navigate to the `/frontend` directory:

```bash
cd frontend
```

Then, run the following command to install the frontend dependencies:

```bash
npm install
```

#### Step 9: Run the Frontend Server

After installing the frontend dependencies, run the following command in the same terminal to start the frontend server:

```bash
npm run dev
```

This will start the frontend server, and you'll be able to access the application on `localhost:3000` in your web browser.

**Troubleshooting OpenSSL Errors:**
If you encounter an OpenSSL error while running the frontend server (common with Node.js v17+), try one of these solutions:
- Upgrade to Node.js v20 or higher.
- Enable legacy OpenSSL provider:
    - On Unix-like (Linux, macOS, Git bash, etc.):
        ```bash
        export NODE_OPTIONS=--openssl-legacy-provider
        ```
    - On Windows Command Prompt:
        ```bash
        set NODE_OPTIONS=--openssl-legacy-provider
        ```
    - On PowerShell:
        ```powershell
        $env:NODE_OPTIONS = "--openssl-legacy-provider"
        ```
After applying a solution, run `npm run dev` again.

## Contributing

- [How to contribute](https://github.com/idurar/idurar-erp-crm/blob/master/CONTRIBUTING.md#how-to-contribute)
- [Reporting issues](https://github.com/idurar/idurar-erp-crm/blob/master/CONTRIBUTING.md#reporting-issues)
- [Working on issues](https://github.com/idurar/idurar-erp-crm/blob/master/CONTRIBUTING.md#working-on-issues)
- [Submitting pull requests](https://github.com/idurar/idurar-erp-crm/blob/master/CONTRIBUTING.md#submitting-pull-requests)
- [Commit Guidelines](https://github.com/idurar/idurar-erp-crm/blob/master/CONTRIBUTING.md#commit-guidelines)
- [Coding Guidelines](https://github.com/idurar/idurar-erp-crm/blob/master/CONTRIBUTING.md#coding-guidelines)
- [Questions](https://github.com/idurar/idurar-erp-crm/blob/master/CONTRIBUTING.md#questions)

## License

IDURAR is Free Open Source Released under the GNU Affero General Public License v3.0.