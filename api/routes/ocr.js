const { Router } = require('express')
const vision = require('@google-cloud/vision')
const { decode } = require('base64-arraybuffer');

const router = Router()

router.post('/ocr/upload', async function (req, res) {
  const client = new vision.ImageAnnotatorClient()

  const request = {
    image: {
      content: decode(req.body.image),
    },
    features: [{ type: 'TEXT_DETECTION' }],
  }
  console.log(request)
  const [result] = await client.annotateImage(request)

  return res.json({ data: result })
})

module.exports = router
