const dateUtil = (givenDate) => {
  const isSame = (date1, date2) => {
    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    ) {
      return true;
    }
    return false;
  };
  const isSameYear = (date1, date2) => {
    if (date1.getFullYear() === date2.getFullYear()) return true;
  };
  let today = new Date();
  let yesterday = today;
  yesterday = yesterday.setDate(today.getDate() - 1);
  yesterday = new Date(yesterday);
  let tomorrow = today;
  tomorrow = tomorrow.setDate(today.getDate() + 1);
  tomorrow = new Date(tomorrow);

  if (isSame(givenDate, today)) {
    return "Today";
  } else if (isSame(givenDate, yesterday)) {
    return "Yesterday";
  } else if (isSame(givenDate, tomorrow)) {
    return "Tomorrow";
  } else if (isSameYear(givenDate, today)) {
    let res =
      givenDate.getDate() +
      " " +
      givenDate.toLocaleDateString("en-US", { month: "short" });
    return res;
  } else {
    let res =
      givenDate.getDate().toString() +
      " " +
      givenDate.toLocaleDateString("en-US", { month: "short" }) +
      " " +
      givenDate.getFullYear().toString();
    return res;
  }
};
module.exports = dateUtil;
