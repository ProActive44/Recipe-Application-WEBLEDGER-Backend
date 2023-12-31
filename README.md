# Recipe-Application-WEBLEDGER-Backend

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Starting the Server](#starting-the-server)
- [Using the API](#using-the-api)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed. You can download them from the official website: [Node.js](https://nodejs.org/).
- Set up a database of your choice and have the necessary connection details available.
- Obtain an API key for the Spoonacular API if you haven't already. You can sign up for an API key on their website: [Spoonacular API](https://spoonacular.com/food-api).

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Configuration

- Create a `.env` file in the project's root directory to store configuration variables like your API key, database connection details, and other sensitive information. Here's an example:

    ```plaintext
    MONGO_URL = your-database-url
    JWT_SECRET = your-own-secret-key
    API_KEY = your-spoonacular-api-key
    ```

## Starting the Server

- Start the Node.js server:

    ```bash
    node index.js
    ```

## Using the API

- Make HTTP requests to the defined endpoints, e.g., `http://localhost:8080/saved`, with the required query parameters such as `id`, `title`, `q`, `_page`, `_limit`, `_sort`, `_order`, and others as needed for your API.

