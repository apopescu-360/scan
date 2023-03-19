<template>
  <div>
    <VideoDeviceSelector v-if="openScanner" @change="onSelectedDeviceChange"/>
    <Scanner v-if="openScanner" ref="scanner" @scan="scan" @denied="onOpenScannerClick" class="pt-4" :deviceId="selectedDeviceId" />
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
import VideoDeviceSelector from "@/components/BarcodeScanner/VideoDeviceSelector"

export default {
  name: "ScannerPanel",
  components: {
    OpenScannerIcon,
    CloseScannerIcon,
    Scanner,
    VideoDeviceSelector
  },
  data () {
    return {
      openScanner: false,
      selectedDeviceId: null
    }
  },
  methods: {
    scan (val) {
      this.$emit("scan", val)
    },
    onOpenScannerClick () {
      this.openScanner = !this.openScanner
    },
    onSelectedDeviceChange (deviceId) {
      this.selectedDeviceId = deviceId
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
