<template>
  <div>
  <v-select v-show="videoDevices.length > 1"
    :items="videoDevices"
    v-model="selectedVideoDevice"
    item-text="label"
    item-value="deviceId"
    label="Default camera"
    single-line
    @change="onSelectionChange"
  />
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
  async created () {
    await this.loadVideoDevices()
  },
  mounted () {
    if (localStorage.preferredCameraId && this.videoDevices.length) {
      this.selectedVideoDevice = localStorage.preferredCameraId
    }
  },
  methods: {
    async loadVideoDevices () {
      try {
        const devices = await navigator.mediaDevices?.enumerateDevices()
        if (devices) {
          this.videoDevices = devices.filter(device => device.kind === "videoinput")
        }
        console.log("camera not available")
      } catch (err) {
        console.error(err)
      }
      if (this.videoDevices.length === 0) {
          this.$emit("unavailable")
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
