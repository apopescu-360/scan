<template>
  <v-container class="search-container">
    <v-form
      class="search__form"
      ref="form"
      v-model="valid"
      lazy-validation
      >
      <v-text-field
        ref="inputText"
        required
        solo
        dense
        v-model="searchText"
        type="text"
        :height="42"
        class="search__text-field"
        @keydown.enter="Cauta"
      ></v-text-field>
      <v-btn
        class="ml-3"
        color="primary"
        elevation="2"
        height="42"
        :disabled="!valid"
        @click="search">Cauta</v-btn>
    </v-form>
    <div style="height: 1em">
      <span ref="searchSpan"></span>
    </div>
    <ScannerPanel v-if="isMobile()" @scan="scan" />
  </v-container>
</template>
<script>

import ScannerPanel from "@/components/BarcodeScanner/ScannerPanel"

export default {
  name: "Search",
  components: {
    ScannerPanel
  },
  data () {
    return {
      valid: true,
      searchText: "",
      savedOnKeyDown: null
    }
  },
  mounted () {
    this.savedOnKeyDown = document.onkeydown
    document.onkeydown = this.focusOnKeyDown
  },
  beforeRouteLeave (to, from, next) {
    document.onkeydown = this.savedOnKeyDown
    next()
  },
  methods: {
    isMobile () {
      return /Android|iPhone/i.test(navigator.userAgent)
    },
    search () {
      this.$refs.searchSpan.innerHTML = "CAUT: " + this.searchText
    },
    scan (scannedText) {
      if (scannedText) {
        this.searchText = scannedText
      }
    },
    focusOnKeyDown () {
      if (this.$refs.inputText) {
        this.$refs.inputText.focus()
      }
    }
  }
}
</script>
<style scoped>
.search-container {
  padding: 4;
  height: 92vh;
}
.search__form {
  display: flex;
  flex-wrap: nowrap;
}
</style>
