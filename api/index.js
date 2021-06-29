const express = require('express')

// Create express instance
const app = express()
app.use(express.json({ limit: '50mb' }))

// Require API routes
const ocr = require('./routes/ocr')

// Import API Routes
app.use(ocr)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
}
