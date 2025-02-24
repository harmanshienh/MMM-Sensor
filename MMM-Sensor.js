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

    //Update measurements every second
    setInterval(() => this.fetchSensorData(), 1000)
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
    wrapper.innerHTML = `<b>Title</b><br />
        ${this.templateContent}<br />
        Temperature: ${this.temperature}°C<br />
        Humidity: ${this.humidity}%`;

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
