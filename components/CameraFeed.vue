<template>
  <div>
    <div class="camera">
      <video ref="camera" class="camera__component" autoplay="true"></video>
    </div>
    <button @click="takePicture">Take photo</button>
    <canvas style="display: none" ref="canvas"> </canvas>
    <div class="output">
      <img ref="photo" alt="The screen capture will appear in this box." />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CameraFeed',
  data() {
    return {
      videoCam: {},
    }
  },
  methods: {
    getVideoPermissions() {
      const cam = this.$refs.camera
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(function (stream) {
            cam.srcObject = stream
          })
          .catch(function (_) {
            console.log('Something went wrong!')
          })
      }
    },
    async takePicture() {
      const { camera, context, canvas, photo, width, height } = this.videoCam
      let { image } = this.videoCam
      if (width && height) {
        canvas.width = width
        canvas.height = height
        context.drawImage(camera, 0, 0, width, height)

        image = canvas.toDataURL('image/png')
        photo.setAttribute('src', image)

        console.log(
          (await this.$axios.$post('/api/ocr/upload', { image })).data
        )
      } else {
        this.clearPhoto()
      }
    },
    clearPhoto() {
      const { context, canvas, photo } = this.videoCam
      let { image } = this.videoCam
      context.fillStyle = '#AAA'
      context.fillRect(0, 0, canvas.width, canvas.height)

      image = canvas.toDataURL('image/png')
      photo.setAttribute('src', image)
    },
    createVideoData() {
      const canvas = this.$refs.canvas
      this.videoCam = {
        width: 1024,
        height: 768,
        canvas,
        photo: this.$refs.photo,
        camera: this.$refs.camera,
        context: canvas.getContext('2d'),
        image: null,
        imageBase64: null,
      }
    },
  },
  mounted() {
    this.createVideoData()
    this.getVideoPermissions()
  },
}
</script>

<style scoped>
.camera {
  margin: 0 auto;
  width: 1024px;
  height: 768px;
  border: 10px #333 solid;
}
.camera__component {
  width: 1024px;
  height: 768px;
  background-color: #666;
}
</style>
