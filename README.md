A Magic Mirror module to display weather data from a BME280 sensor and conditionally render a Google Calendar module based on camera data. The repository for the sensor/camera logic can be found [here](https://github.com/harmanshienh/sensor-readings)

## Prerequisites
To use this module, first install MagicMirror following the [official documentation](https://docs.magicmirror.builders/getting-started/installation.html)

## Setting Up Your Calendar
Make sure the Google calendar of your choosing is public, and copy the Public address in iCal format. It should look something like "https://calendar.google.com/calendar/ical/youremailaddress%40gmail.com/public/basic.ics".

In your config.js, look for the calendar module. Set the URL of the calendar to the one you just got the link of.

## Final Result
Now, if your Raspberry Pi camera, ESP32, Sensor, and wiring are done correctly, you should see something like this!

![Image](https://github.com/user-attachments/assets/543c6de5-9765-4b81-bd50-e92f96fe7ced)
