<template>
  <div>
    <v-overlay :value="updateExists"></v-overlay>
    <v-snackbar
      :value="updateExists"
      :multi-line="true"
      :timeout="-1"
      id="update_snackbar"
      color="#FDD835">
      An update is available

      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="refreshApp">
          Update
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

export default {
  name: "AppUpdateComponent",
  data () {
    return {
      refreshing: false,
      registration: null,
      updateExists: false
    }
  },
  created () {
    document.addEventListener("swUpdated", this.updateAvailable)

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return
      this.refreshing = true
      window.location.reload()
    })
  },

  methods: {
    updateAvailable (event) {
      this.registration = event.detail
      this.updateExists = true
    },
    refreshApp () {
      this.updateExists = false
      if (!this.registration || !this.registration.waiting) return
      this.registration.waiting.postMessage({ type: "SKIP_WAITING" })
    }
  }
}
</script>

<style scoped>

  ::v-deep#update_snackbar .v-snack__content {
    color: black;
    font-weight: bold;
  }

</style>
