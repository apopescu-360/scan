<template>
  <div>
  <v-select v-show="isMoreThanOneCamera"
    :items="videoDevices"
    v-model="selectedVideoDevice"
    item-text="label"
    item-value="deviceId"
    label="Default camera"
    single-line
    @change="onSelectionChange" />
</div>
</template>

<script>
export default {
  name: "VideoDeviceSelector",
  data () {
    return {
      videoDevices: [],
      selectedVideoDevice: null
    }
  },
  computed: {
    isCameraAvailable () {
      return this.videoDevices.length !== 0
    },
    isMoreThanOneCamera () {
      return this.videoDevices.length > 1
    }
  },
  async created () {
    await this.loadVideoDevices()
    if (!this.isCameraAvailable) {
      console.log("camera not available")
      this.$emit("unavailable")
    } else if (!(await this.isCameraEnabled())) {
      this.$emit("denied")
    } else if (localStorage.preferredCameraId) {
      this.selectedVideoDevice = localStorage.preferredCameraId
    }
  },
  methods: {
    async loadVideoDevices () {
      try {
        const devices = await navigator.mediaDevices?.enumerateDevices()
        if (devices) {
          this.videoDevices = devices.filter(device => device.kind === "videoinput") // && device.label.includes("back"))
        }
      } catch (err) {
        console.error(err)
      }
    },
    async isCameraEnabled () {
      try {
        const permision = await navigator.permissions?.query({ name: "camera" })
        console.log("camera permission: " + permision?.state)
        return !permision || permision.state !== "denied"
      } catch (err) {
        console.error(err)
        // permission unknown
        return true
      }
    },
    onSelectionChange () {
      localStorage.preferredCameraId = this.selectedVideoDevice
      this.$emit("selectionChange", this.selectedVideoDevice)
    },
    persistCameraChoice (mediaDeviceInfo) {
      if (mediaDeviceInfo) {
        localStorage.preferredCameraId = mediaDeviceInfo.deviceId
      }
    }
  }
}
</script>

<style scoped>
</style>
