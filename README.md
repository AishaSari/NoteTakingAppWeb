# NoteTakingAppWeb

**NoteTakingAppWeb** is a web-based note-taking application built with JavaScript and Node.js. It provides an intuitive interface for creating, editing, and deleting notes using local storage (JSON) on a local server. This repository focuses on the web version of the application.

## Features

- **Note Management:** Create, edit, and delete notes.
- **Local Storage:** Utilizes a JSON file to persist note data.
- **Web Interface:** User-friendly UI built with HTML/CSS and JavaScript.
- **Server-Side Functionality:** Uses Node.js to handle server operations and data management.

## Requirements

- **Node.js:** Ensure Node.js (v12 or later) is installed.
- **npm:** Comes with Node.js for dependency management.

## Installation & Usage

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/AishaSari/NoteTakingAppWeb.git
   cd NoteTakingAppWeb
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Server:**

   ```bash
   node server.js
   ```

4. **Access the App:**

   Open your browser and navigate to `http://localhost:3000` (or the port specified in your `server.js`) to start using the application.

## Note on the Windows Version

There is also a **NoteTakingAppWindows** repository that offers a Windows desktop version of the app. The Windows version is built using [Electron](https://www.electronjs.org/), providing a native offline experience with similar note-taking functionality. While the web version runs on a local server and is accessible via a browser, the Windows version is packaged as a standalone application for desktop use.

## Contributing

Contributions, bug reports, and suggestions are welcome! Please fork this repository and submit a pull request with your improvements.
