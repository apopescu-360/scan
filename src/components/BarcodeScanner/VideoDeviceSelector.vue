<template>
  <div>
  <v-select v-show="isMoreThanOneCamera"
    :items="videoDevices"
    v-model="selectedVideoDevice"
    item-text="label"
    item-value="deviceId"
    label="Default camera"
    single-line />
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
    this.loadCameraChoice()
    await this.loadVideoDevices()
    if (!this.isCameraAvailable) {
      this.$emit("unavailable")
    } else if (!(await this.isCameraEnabled())) {
      this.$emit("denied")
    }
  },
  methods: {
    async loadVideoDevices () {
      try {
        const devices = await navigator?.mediaDevices?.enumerateDevices()
        if (devices) {
          const cameras = devices
            .filter(device => device.kind === "videoinput")
            .map((device, count) => {
              return {
                deviceId: device.deviceId,
                groupId: device.groupId,
                label: device.label || `Camera ${count}`
              }
            })
          const backCameras = cameras
            .filter(device => device.label && device.label.toLowerCase().includes("back"))
 
          this.videoDevices = backCameras.length ? backCameras : cameras
        }
      } catch (err) {
        console.error(err)
      }
    },
    async isCameraEnabled () {
      try {
        const permision = await navigator.permissions?.query({ name: "camera" })
        return !permision || permision.state !== "denied"
      } catch (err) {
        console.error(err)
        // permission unknown
        return true
      }
    },
    loadCameraChoice () {
      const preferredCameraId = localStorage.getItem("preferredCameraId")
      if (preferredCameraId) {
        this.selectedVideoDevice = preferredCameraId
      }
    },
    storeCameraChoice () {
      localStorage.setItem("preferredCameraId", this.selectedVideoDevice)
    }
  },
  watch: {
    selectedVideoDevice () {
      this.storeCameraChoice()
      this.$emit("selectionChange", this.selectedVideoDevice)
    }
  }
}
</script>
 
<style scoped>
</style>
 