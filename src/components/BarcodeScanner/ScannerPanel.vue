<template>
  <div>
    <v-select v-show="videoDevices.length"
      :items="videoDevices"
      v-model="selectedVideoDevice"
      item-text="label"
      item-value="deviceId"
      label="Camere disponibile"
      single-line
    />

    <Scanner v-if="openScanner" ref="scanner" @scan="scan" @denied="onOpenScannerClick" class="pt-4" :deviceId="selectedVideoDevice" />
    <v-btn v-if="openScanner" id="closeScannerButton" icon @click="onOpenScannerClick" class="scanner-button">
      <CloseScannerIcon class="scanner-button-icon" />
      <div class="scanner-button-text">Inchide Camera</div>
    </v-btn>
    <v-btn v-else id="openScannerButton" icon  @click="onOpenScannerClick" class="scanner-button">
      <OpenScannerIcon class="scanner-button-icon" />
      <div class="scanner-button-text"><span>Scaneaza cu Camera</span></div>
    </v-btn>
  </div>
</template>

<script>
import Scanner from "@/components/BarcodeScanner/Scanner"
import OpenScannerIcon from "@/components/BarcodeScanner/OpenScannerIcon"
import CloseScannerIcon from "@/components/BarcodeScanner/CloseScannerIcon"

export default {
  name: "ScannerPanel",
  components: {
    OpenScannerIcon,
    CloseScannerIcon,
    Scanner
  },
  data () {
    return {
      openScanner: false,
      videoDevices: [],
      selectedVideoDevice: null
    }
  },
  async created () {
    await this.getVideoDevices()
  },
  methods: {
    scan (val) {
      this.$emit("scan", val)
    },
    onOpenScannerClick () {
      this.openScanner = !this.openScanner
    },
    async getVideoDevices () {
      const devices = await navigator.mediaDevices?.enumerateDevices()
      if (devices) {        
        this.videoDevices = devices //.filter(device => device.kind === "videoinput")
      }
    }
  }
}
</script>

<style scoped>
.scanner-button {
  position: absolute;
  bottom: 10px;
  width: 95% !important;
  height: 42px !important;
  background-color: white;
  border-radius: 5px;
  justify-content: left;
}
.scanner-button-icon {
  margin: 5px 10px 5px 10px;
  width: 32px;
  height: 32px;
}
.scanner-button-text {
  width: 75%;
  text-align: center;
}

</style>
