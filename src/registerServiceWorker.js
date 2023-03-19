/* eslint-disable no-console */

import { register } from "register-service-worker"

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        "App is being served from cache by a service worker.\n" +
        "For more details, visit https://goo.gl/AFskqB"
      )
    },
    registered (registration) {
      console.log(`[${new Date().toLocaleTimeString("en-GB")}]: Service worker has been registered.`)
      setInterval(() => {
        console.log("Checking app for updates...")
        registration.update()
          .then((reg) => {
            console.log(`[${new Date().toLocaleTimeString("en-GB")}]: Service Worker updated to latest version.`)
            const waitingServiceWorker = reg.installing ?? reg.waiting
            if (reg.waiting?.state) {
              console.log(`[${new Date().toLocaleTimeString("en-GB")}]: Waiting service worker state: ${reg.waiting.state}`)
            }
            if (waitingServiceWorker?.state === "installed") {
              console.log(`[${new Date().toLocaleTimeString("en-GB")}]: Pending update found... Refresh the app to update`)
              document.dispatchEvent(new CustomEvent("swUpdated", {
                detail: reg
              }))
            } else {
              console.log(`[${new Date().toLocaleTimeString("en-GB")}]: No new service worker available`)
            }
          }).catch(e => console.log("Service Worker update failed!", e))
      }, 60000)
    },
    cached () {
      console.log("Content has been cached for offline use.")
    },
    updatefound () {
      console.log("New content is downloading.")
    },
    updated (registration) {
      console.log("New content is available; please refresh.")
      document.dispatchEvent(new CustomEvent("swUpdated", {
        detail: registration
      }))
    },
    offline () {
      console.log("No internet connection found. App is running in offline mode.")
    },
    error (error) {
      console.error("Error during service worker registration:", error)
    }
  })
}
