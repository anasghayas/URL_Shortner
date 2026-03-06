# URL Shortener

A simple URL shortener built with Node.js, Express, and MongoDB. This application allows users to shorten long URLs and track visit analytics.

## Features

- Generate short URLs from long URLs
- Redirect to original URLs using short IDs
- Track visit history with timestamps
- Get analytics for each short URL (total clicks and visit history)

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **ID Generation**: Nanoid for unique short IDs
- **Development**: Nodemon for auto-restart during development

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anasghayas/url-Shortner.git
   cd url-Shortner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure MongoDB is running locally on port 27017 (default). If not, start MongoDB:
   ```bash
   mongod
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will start on port 8001.

## Usage

### API Endpoints

#### Generate Short URL
- **POST** `/url`
- **Body**: `{ "url": "https://example.com" }`
- **Response**: `{ "id": "shortId" }`

Example using curl:
```bash
curl -X POST http://localhost:8001/url -H "Content-Type: application/json" -d '{"url": "https://example.com"}'
```

#### Redirect to Original URL
- **GET** `/:shortId`
- Redirects to the original URL and logs the visit.

#### Get Analytics
- **GET** `/url/analytics/:shortId`
- **Response**: `{ "totalClicks": 5, "analytics": [{ "timestamp": 1234567890 }, ...] }`

Example:
```bash
curl http://localhost:8001/url/analytics/shortId
```

## Data Storage

- **Database**: MongoDB
- **Connection**: `mongodb://localhost:27017/url-Shortner`
- **Collection**: `urls`
- **Schema**:
  - `shortId`: Unique string identifier (generated using Nanoid)
  - `redirectURL`: Original URL
  - `visitHistory`: Array of objects with `timestamp` (number)
  - `createdAt`, `updatedAt`: Timestamps (added by Mongoose)

## Project Structure

```
url-Shortner/
├── connect.js          # MongoDB connection
├── index.js            # Main server file
├── package.json        # Dependencies and scripts
├── controllers/
│   └── url.js          # Route handlers
├── models/
│   └── url.js          # Mongoose schema
├── routes/
│   └── url.js          # Express routes
└── views/              # (Empty directory for potential future use)
```

## Scripts

- `npm start`: Starts the server with Nodemon

## Dependencies

- `express`: Web framework
- `mongoose`: MongoDB ODM
- `nanoid`: Unique ID generator
- `nodemon`: Development tool for auto-restart

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

ISC

## Author

Anas Ghayas

## Repository

[GitHub](https://github.com/anasghayas/url-Shortner)