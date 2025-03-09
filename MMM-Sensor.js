Module.register("MMM-Sensor", {

  defaults: {
    exampleContent: ""
  },

  /**
   * Apply the default styles.
   */
  getStyles() {
    return ["template.css"]
  },

  fetchSensorData() {
    //Fetch data from sensor file
    fetch(this.file('sensorData.json'))
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error: " + res.statusText)
        }
        else {
          return res.json()
        }
      }).then((data) => {
        this.temperature = data.temperature
        this.humidity = data.humidity
        //Conditionally render calendar based on face detection
        MM.getModules().withClass("calendar").enumerate((module) => {
          //If faceDetected is true, show the calendar (and if it's already shown, don't do anything)
          if (data.faceDetected && module.hidden) {
            module.show(1000);
          } 
          //If faceDetected is false, hide the calendar (and if it's already hidden, don't do anything)
          else if (!data.faceDetected && (!module.hidden || module.hidden === undefined)) {
              module.hide(1000);
          }
        })
        this.updateDom()
      })
      .catch((error) => console.error(error))
  },

  /**
   * Pseudo-constructor for our module. Initialize stuff here.
   */
  start() {
    this.templateContent = this.config.exampleContent
    this.temperature = 0
    this.humidity = 0

    this.fetchSensorData()

    //Update measurements every second, give 1 second to load
    setTimeout(() => {setInterval(() => this.fetchSensorData(), 1000)}, 1000);
  },

  /** 
   * Handle notifications received by the node helper.
   * So we can communicate between the node helper and the module.
   *
   * @param {string} notification - The notification identifier.
   * @param {any} payload - The payload data`returned by the node helper.
   */
  socketNotificationReceived: function (notification, payload) {
    if (notification === "EXAMPLE_NOTIFICATION") {
      this.templateContent = `${this.config.exampleContent} ${payload.text}`
      this.updateDom()
    }
  },

  /**
   * Render the page we're on.
   */
  getDom() {
    const wrapper = document.createElement("div")
    wrapper.innerHTML = `${this.templateContent}<br />
        <i class="fa fa-temperature-half"></i> ${this.temperature}°C<br />
        <i class="fa fa-tint"></i> ${this.humidity}%`;

    return wrapper
  },

  addRandomText() {
    this.sendSocketNotification("GET_RANDOM_TEXT", { amountCharacters: 15 })
  },

  /**
   * This is the place to receive notifications from other modules or the system.
   *
   * @param {string} notification The notification ID, it is preferred that it prefixes your module name
   * @param {number} payload the payload type.
   */
  notificationReceived(notification, payload) {
    if (notification === "TEMPLATE_RANDOM_TEXT") {
      this.templateContent = `${this.config.exampleContent} ${payload}`
      this.updateDom()
    }
  }
})
