<template>
<v-select v-show="videoDevices.length"
  :items="videoDevices"
  v-model="selectedVideoDevice"
  item-text="label"
  item-value="deviceId"
  label="Camera to use"
  single-line
  @change="onChange"
/>
</template>

<script>
export default {
  name: "VideoDeviceSelector",
  data () {
    return {
      videoDevices: [],
      selectedVideoDevice: null,
    }
  },
  async created () {
    await this.getVideoDevices()
  },
  methods: {
    async getVideoDevices () {
      const devices = await navigator.mediaDevices?.enumerateDevices()
      if (devices) {        
        this.videoDevices = devices.filter(device => device.kind === "videoinput" && device.label.includes("back"))
      }
    },
    onChange () {
        this.$emit("change", this.selectedVideoDevice)
        this.localStorage.preferredCameraId = this.selectedVideoDevice
    },
    persistCameraChoice (mediaDeviceInfo) {
      if (mediaDeviceInfo) {
          this.localStorage.preferredCameraId = mediaDeviceInfo.deviceId
        } 
    }
  },
  mounted () {
    if (localStorage.preferredCameraId && this.videoDevices.length) {
      this.selectedVideoDevice = localStorage.preferredCameraId
    }
  }
}
</script>

<style scoped>
</style>
