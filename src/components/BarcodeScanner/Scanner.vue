<template>
  <div>
    <div class="scanner-container" v-show="loaded">
      <video ref="scanner"></video>
    </div>
  </div>
</template>
 
<script>
import { BrowserMultiFormatReader, DecodeHintType, BarcodeFormat } from "@zxing/library"
import beep from "@/assets/beep.wav"
 
const audio = new Audio(beep)
 
export default {
  name: "Scanner",
  props: {
    deviceId: null
  },
  data () {
    return {
      loaded: false,
      codeScanner: null,
      scannedVal: null
    }
  },
  async created () {
    const hints = new Map()
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX, BarcodeFormat.QR_CODE])
    hints.set(DecodeHintType.TRY_HARDER, [])
    this.codeScanner = new BrowserMultiFormatReader(hints)
    alert(this.scannedVal)
  },
  mounted () {
    setTimeout(() => this.start(), 100)
  },
  beforeDestroy () {
    this.close()
  },
  methods: {
    start () {
      this.codeScanner.decodeFromVideoDevice(this.deviceId, this.$refs.scanner, this.scan)
    },
    close () {
      this.loaded = false
      // this.scannedVal = null
      this.codeScanner.reset()
    },
    restart () {
      this.close()
      this.start()
    },
    scan (result) {
      if (!this.loaded) {
        this.loaded = true
      }
      if (result && result.text !== this.scannedVal) {
        audio.play()
        this.scannedVal = result.text
        this.$emit("scan", result.text)
      }
    }
  },
  watch: {
    deviceId () {
      this.restart()
    }
  }
}
</script>
 
<style scoped>
  .scanner-container {
    position: relative;
    display: flex;
  }
  video {
    max-width: 100%;
    max-height: 100%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
 