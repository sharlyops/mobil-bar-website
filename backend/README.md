# Calcuim Backend Contact Form API

This backend handles contact form submissions and sends them as styled emails using Nodemailer.

## Setup

1. Copy `.env.example` to `.env` and fill in your email credentials and recipient:

```
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your@email.com
EMAIL_PASS=yourpassword
EMAIL_TO=recipient@email.com
EMAIL_FROM=your@email.com
```

2. Install dependencies:

```
npm install
```

3. Start the server:

```
npm start
```

The server will run on port 5000 by default.

## API Endpoint

- **POST** `/api/contact`
  - Accepts JSON body with:
    - `firstName` (required)
    - `lastName` (required)
    - `email` (required, valid email)
    - `company` (optional)
    - `message` (required)
  - Returns `{ success: true, message: 'Message sent!' }` on success.
  - Returns `{ success: false, message: 'Failed to send email', error: <details> }` on error.

- **GET** `/api/contact` is not allowed (returns 405).

## Security
- All input is validated and sanitized.
- Only POST requests are allowed.
- Email credentials and recipient are stored in environment variables. 