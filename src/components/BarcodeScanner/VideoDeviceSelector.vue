<template>
<v-select v-show="videoDevices.length"
  :items="videoDevices"
  v-model="selectedVideoDevice"
  item-text="label"
  item-value="deviceId"
  label="Camere disponibile"
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
      selectedVideoDevice: null
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
    }
  }
}
</script>

<style scoped>
</style>
