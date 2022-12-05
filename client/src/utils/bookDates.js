/** Yian Chen
 * dateHelper module to generate next n days randomly to simulate booking date for tutors
 * @param {int} next n number of days (num_days)
 * @returns array of objects with "date" property in ascending sorted date order
 */
export function dateHelper(num_days) {
  //future date helper object to pick future dates
  let futureDateHelper = {
    addDays: function (aDate, numberOfDays) {
      aDate.setDate(aDate.getDate() + numberOfDays);
      return aDate;
    },
    format: function format(date) {
      return [
        ("0" + (date.getMonth() + 1)).slice(-2),
        ("0" + date.getDate()).slice(-2),
        date.getFullYear(),
      ].join("/");
    },
  };

  //pick the next num_days days and sort
  let dates = [];

  for (let i = 0; i < num_days; i++) {
    let newDate = futureDateHelper.format(
      futureDateHelper.addDays(new Date(), Math.floor(Math.random() * 5) + 1)
    );

    dates.push(newDate);
  }

  return dates.sort();
}
