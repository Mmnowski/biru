const { Router } = require('express')
const vision = require('@google-cloud/vision')

const router = Router()

router.post('/ocr/upload', async function (req, res) {
  const client = new vision.ImageAnnotatorClient()

  const request = {
    image: {
      content: Buffer.from(req.body.imageBase64, 'base64'),
    },
  }
  const [result] = await client.textDetection(request)

  return res.json({ data: result })
})

module.exports = router
