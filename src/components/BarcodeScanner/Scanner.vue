<template>
  <div>
    <div class="scanner-container" v-show="isLoaded">
      <video poster="data:image/gif,AAAA" ref="scanner"></video>
      <div class="overlay-element"></div>
      <div class="laser"></div>
    </div>
  </div>
</template>

<script>
import { BrowserMultiFormatReader } from "@zxing/browser"
import { DecodeHintType, BarcodeFormat }  from "@zxing/library"
import beep from "@/assets/beep.wav"

const audio = new Audio(beep)

export default {
  name: "Scanner",
  props: {
    deviceId: null
  },
  data () {
    return {
      cameraEnabled: null,
      isLoaded: false,
      codeScanner: null,
      controls: null,
      scannedVal: null
    }
  },
  computed: {
    constraints () {
      if (this.deviceId) {
        return {
          "video": {
            "deviceId": this.deviceId
          }
        }
      }
      return null 
    }
  },
  async created () {
    const hints = new Map()
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.CODE_128, BarcodeFormat.QR_CODE])
    this.codeScanner = new BrowserMultiFormatReader(hints)
    this.cameraEnabled = await this.isCameraEnabled()
  },
  mounted() {
    this.start()
  },
  beforeDestroy() {
    this.close()
  },
  methods: {
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
    start() {
      if (this.constraints) {
        console.log(this.constraints)
        this.codeScanner.decodeFromConstraints(this.constraints, this.$refs.scanner, this.scan)
      } else {
        this.codeScanner.decodeFromVideoDevice(undefined, this.$refs.scanner, this.scan)
      }
    },
    close () {
      this.isLoaded = false
      this.controls?.stop()
    },
    restart () {
      this.close()
      this.start()
    },
    scan(result, error, controls) {
      if (!this.isLoaded) {
        this.controls = controls
        this.isLoaded = true
      }
      if (result) {
        if (result.text !== this.scannedVal) {
          audio.play()
          this.scannedVal = result.text 
          this.$emit("scan", result.text)
        }
      }
    }
  },
  watch: {
    cameraEnabled (newValue) {
      if (!newValue) {
        this.$emit("denied")
      }
    },
    constraints(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.restart()
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
