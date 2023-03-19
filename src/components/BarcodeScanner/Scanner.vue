<template>
  <div>
    <div class="scanner-container" v-show="isLoaded">
      <video poster="data:image/gif,AAAA" ref="scanner"></video>
      <div class="overlay-element"></div>
      <div class="laser"></div>
    </div>
    <ErrorDialog ref="errorDialog" />
  </div>
</template>

<script>

import { BrowserMultiFormatReader } from "@zxing/browser";
import ErrorDialog from "@/components/dialogs/ErrorDialog"
import { ErrorDetails } from "@/model/errorDetails.js"
import beep from "@/assets/beep.wav"

const audio = new Audio(beep)

export default {
  name: "Scanner",
  components: {
    ErrorDialog
  },
  props: {
    deviceId: null
  },
  data () {
    return {
      cameraAvailable: null,
      cameraEnabled: null,
      isLoaded: false,
      codeScanner: new BrowserMultiFormatReader(),
      controls: null,
      scannedVal: null
    }
  },
  computed: {
    constraints () {
      return { "video": this.deviceId ? { "deviceId": this.deviceId } : true } 
    }
  },
  async created () {
    this.cameraAvailable = await this.isCameraAvailable()
    this.cameraEnabled = this.cameraAvailable ? await this.isCameraEnabled() : null
  },
  mounted() {
    this.start()
  },
  beforeDestroy() {
    this.controls?.stop()
  },
  methods: {
    start() {
      if (this.constraints) {
        console.log(this.constraints);
        this.codeScanner.decodeFromConstraints(this.constraints, this.$refs.scanner, this.callback)
      } else {
        this.codeScanner.decodeFromVideoDevice(undefined, this.$refs.scanner, this.callback)
      }
    },
    callback(result, error, controls) {
      if (!this.isLoaded) {
        this.controls = controls;
        this.isLoaded = true;
      }
      if (result) {
        if (result.text !== this.scannedVal) {
          audio.play();
          this.scannedVal = result.text 
          this.$emit("scan", { result: result.text} )
        }
      }
    },
    async isCameraAvailable () {
      try {
        const devices = await navigator.mediaDevices?.enumerateDevices()
        if (devices) {
          const videoDevices = devices.filter(device => device.kind === "videoinput")
          return videoDevices.length > 0;
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
        return !permision || permision.state !== "denied"
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
    },
    constraints(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.isLoaded = false;
        this.controls?.stop();
        this.start();
      }
    }
  }
}
</script>

<style scoped>
  video {
    max-width: 100%;
    max-height: 100%;
  }
  .scanner-container {
    position: relative;
  }
  .overlay-element {
    position: absolute;
    top: 0;
    width: 100%;
    height: 99%;
    background: rgba(30, 30, 30, 0.5);
    -webkit-clip-path: polygon(
      0% 0%,
      0% 100%,
      20% 100%,
      20% 20%,
      80% 20%,
      80% 80%,
      20% 80%,
      20% 100%,
      100% 100%,
      100% 0%
    );
    clip-path: polygon(
      0% 0%,
      0% 100%,
      20% 100%,
      20% 20%,
      80% 20%,
      80% 80%,
      20% 80%,
      20% 100%,
      100% 100%,
      100% 0%
    );
  }
  .laser {
    width: 60%;
    margin-left: 20%;
    background-color: tomato;
    height: 1px;
    position: absolute;
    top: 40%;
    z-index: 2;
    box-shadow: 0 0 4px red;
    -webkit-animation: scanning 2s infinite;
    animation: scanning 2s infinite;
  }
  @-webkit-keyframes scanning {
    50% {
      -webkit-transform: translateY(75px);
      transform: translateY(75px);
    }
  }
  @keyframes scanning {
    50% {
      -webkit-transform: translateY(75px);
      transform: translateY(75px);
    }
  }
</style>
