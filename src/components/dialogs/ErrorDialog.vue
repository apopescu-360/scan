<template >
  <v-dialog v-model="visible" persistent :max-width="dialogWidth">
    <v-card raised>
      <v-card-title>{{ details.title}} </v-card-title>
      <v-card-text>{{ details.description }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text v-on:click="closeDialog" id="error-dialog__close-btn">{{ details.buttonText }}</v-btn>
      </v-card-actions>
    </v-card></v-dialog
  >
</template>

<script>
export default {
  name: "ErrorDialog",
  data () {
    return {
      details: {},
      visible: false
    }
  },
  computed: {
    dialogWidth () {
      return this.isMobileView ? "75%" : "25%"
    },
    isMobileView () {
      return this.$vuetify.breakpoint.name === "xs"
    }
  },
  methods: {
    closeDialog () {
      this.visible = false

      if (this.details) {
        this.details.triggerButtonAction()
      }
    },
    showDialog (details) {
      this.details = details
      this.visible = true
    }
  }
}
</script>
