<template>
  <div>
    <v-card v-show="cameraAvailable" style="margin-bottom: 10px">
      <v-list>
        <v-subheader>Camere disponibile</v-subheader>
        <v-list-item v-for="device in videoDevices" :key="device.deviceId">
            <v-list-item-title v-text="device.label" />
        </v-list-item>
      </v-list>
    </v-card>
    <CameraCodeScanner ref="barcodeReader" v-show="isLoaded" @scan="onScan" @load="onLoad" />
    <ErrorDialog ref="errorDialog" />
  </div>
</template>

<script>
import { CameraCodeScanner } from "vue-barcode-qrcode-scanner";
import ErrorDialog from "@/components/dialogs/ErrorDialog"
import { ErrorDetails } from "@/model/errorDetails.js"
import beep from "@/assets/beep.wav"

const audio = new Audio(beep)

export default {
  name: "Scanner",
  components: {
    CameraCodeScanner,
    ErrorDialog
  },
  data () {
    return {
      isLoaded: false,
      cameraAvailable: null,
      cameraEnabled: null,
      videoDevices: null,
      scannedVal: null
    }
  },
  async created () {
    this.cameraAvailable = await this.isCameraAvailable()
    this.cameraEnabled = this.cameraAvailable ? await this.isCameraEnabled() : null
  },
  methods: {
    onLoad (controls, scannerElement, browserMultiFormatReader) {
      this.isLoaded = true
      console.log("---------------- ON-LOAD --------------")
      console.log(controls)
      console.log(scannerElement)
      console.log(browserMultiFormatReader)
    },
    onScan (val) {
      if (val !== this.scannedVal) {
        audio.play()
        this.scannedVal = val
        this.$emit("scan", val)
      }
    },
    async isCameraAvailable () {
      try {
        const devices = await navigator.mediaDevices?.enumerateDevices()
        if (devices) {
          this.videoDevices = devices.filter(device => device.kind === "videoinput")
          this.videoDevices.forEach(v => console.log(v))
          if (this.videoDevices.length > 0) {
            return true
          }
        }
        console.log("camera not available")
        return false
      } catch (err) {
        console.error(err)
        return false
      }
    },
    async isCameraEnabled () {
      try {
        const permision = await navigator.permissions?.query({ name: "camera" })
        console.log("camera permission: " + permision?.state)
        return permision && permision.state !== "denied"
      } catch (err) {
        console.error(err)
        // permission unknown
        return true
      }
    }
  },
  watch: {
    cameraAvailable (newValue) {
      document.body.style.cursor = "default"
      if (!newValue) {
        const errorDetails = new ErrorDetails(
          "Eroare",
          "Nu exista Camera",
          "Inchide",
          () => { this.$emit("denied") })
        this.$refs.errorDialog.showDialog(errorDetails)
      }
    },
    cameraEnabled (newValue) {
      document.body.style.cursor = "default"
      if (!newValue) {
        const errorDetails = new ErrorDetails(
          "Eroare",
          "Accesul la camera este interzis",
          "Inchide",
          () => { this.$emit("denied") })
        this.$refs.errorDialog.showDialog(errorDetails)
      }
    }
  }
}
</script>

<style scoped>
</style>
