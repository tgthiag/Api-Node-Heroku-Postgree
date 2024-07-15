# API Node Heroku PostgreSQL

This is a Node.js application deployed on Heroku using PostgreSQL as the database. It provides basic CRUD operations for managing items.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [Contact](#contact)

## Installation

1. Clone the repository
    ```sh
    git clone https://github.com/tgthiag/Api-Node-Heroku-Postgree.git
    ```
2. Navigate to the project directory
    ```sh
    cd Api-Node-Heroku-Postgree
    ```
3. Install dependencies
    ```sh
    npm install
    ```
4. Set up environment variables in a `.env` file
    ```
    DATABASE_URL=your_postgresql_database_url
    ```

## Usage

1. Start the server
    ```sh
    npm start
    ```
2. The server will run on `http://localhost:3000` or the port specified in the environment variables.

## Endpoints

- **GET /**: Returns a welcome message.
- **GET /items**: Fetches all items.
- **GET /items/:id**: Fetches a specific item by ID.
- **POST /items**: Creates a new item.
  - Body: `{ "name": "item name", "price": item_price }`
- **PUT /items/:id**: Updates an existing item by ID.
  - Body: `{ "name": "updated name", "price": updated_price }`
- **DELETE /items/:id**: Deletes an item by ID.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## Contact

Thiago Carvalho - [Your Email](mailto:tgthiag@gmail.com)

Project Link: [https://github.com/tgthiag/Api-Node-Heroku-Postgree](https://github.com/tgthiag/Api-Node-Heroku-Postgree)
