<template>
  <div>
  <v-select v-show="videoDevices?.length > 1"
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
      videoDevices: null,
      selectedVideoDevice: null
    }
  },
  async created () {
    await this.loadVideoDevices()
  },
  methods: {
    async loadVideoDevices () {
      try {
        const devices = await navigator.mediaDevices?.enumerateDevices()
        if (devices) {
          this.videoDevices = devices.filter(device => device.kind === "videoinput") // && device.label.includes("back"))
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
        this.$emit("selectionChange", this.selectedVideoDevice)
    }
  }
}
</script>

<style scoped>
</style>
