/**Yian
 * function for Tutor booking time that generates array of random hours between 10am to 9pm
 * @returns sorted array of hours
 */
export const randHours = () => {
  let hours = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];
  let newHours = [];
  for (let i = 0; i < 5; i++) {
    newHours.push(hours[Math.floor(Math.random() * hours.length)]);
  }
  return newHours.sort();
};
