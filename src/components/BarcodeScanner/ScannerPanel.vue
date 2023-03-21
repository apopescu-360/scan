<template>
  <div>
    <VideoDeviceSelector v-if="openScanner" @selectionChange="onSelectedDeviceChange" @unavailable="onCameraUnavailable" @denied="onCameraDenied" />
    <ErrorDialog ref="errorDialog" />
    <Scanner v-if="openScanner" ref="scanner" @scan="onScan" class="pt-4" :deviceId="selectedDeviceId" />
    <v-btn v-if="openScanner" id="closeScannerButton" icon @click="onScannerButtonClick" class="scanner-button">
      <CloseScannerIcon class="scanner-button-icon" />
      <div class="scanner-button-text">Inchide Camera</div>
    </v-btn>
    <v-btn v-else id="openScannerButton" icon  @click="onScannerButtonClick" class="scanner-button">
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
import ErrorDialog from "@/components/dialogs/ErrorDialog"
import { ErrorDetails } from "@/model/errorDetails.js"

export default {
  name: "ScannerPanel",
  components: {
    OpenScannerIcon,
    CloseScannerIcon,
    Scanner,
    VideoDeviceSelector,
    ErrorDialog
  },
  data () {
    return {
      openScanner: false,
      selectedDeviceId: null
    }
  },
  methods: {
    onCameraUnavailable () {
      const errorDetails = new ErrorDetails(
          "Eroare",
          "Nu exista Camera",
          "Inchide",
          () => { this.onScannerButtonClick() })
        this.$refs.errorDialog.showDialog(errorDetails)
    },
    onCameraDenied () {
      const errorDetails = new ErrorDetails(
          "Eroare",
          "Accesul la camera este interzis",
          "Inchide",
          () => { this.onScannerButtonClick() })
        this.$refs.errorDialog.showDialog(errorDetails)
    },
    onScan (val) {
      this.$emit("scan", val)
    },
    onScannerButtonClick () {
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
