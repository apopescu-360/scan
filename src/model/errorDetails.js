class ErrorDetails {
  constructor (title, description, buttonText, buttonAction) {
    this.title = title
    this.description = description
    this.buttonAction = buttonAction
    this.buttonText = buttonText
  }

  triggerButtonAction () {
    if (this.buttonAction) {
      if (typeof this.buttonAction === "function") {
        this.buttonAction()
      }
    }
  }
}

export { ErrorDetails }
