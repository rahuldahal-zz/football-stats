export default function dateDifference({ date, time = "past" }) {
  const milliseconds =
    time === "future" ? date - new Date() : new Date() - date;

  let seconds = parseInt(milliseconds / 1000);
  let minutes = 0,
    hours = 0,
    days = 0;

  if (seconds > 60) {
    minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds) % 60;
  }

  if (minutes > 60) {
    hours = parseInt(minutes / 60);
    minutes = parseInt(minutes) % 60;
  }

  if (hours > 24) {
    days = parseInt(hours / 60);
    hours = parseInt(hours) % 24;
  }

  if (time === "future") {
    if (days > 0) {
      return "After " + days + (days === 1 ? " day" : " days");
    } else if (hours > 0) {
      return "After " + hours + (hours === 1 ? " hour" : " hours");
    } else if (minutes > 0) {
      return "After " + minutes + (minutes === 1 ? " minute" : " minutes");
    } else {
      return "After " + seconds + (seconds === 1 ? " second" : " seconds");
    }
  } else {
    if (days > 0) {
      return days + (days === 1 ? " day ago" : " days ago");
    } else if (hours > 0) {
      return hours + (hours === 1 ? " hour ago" : " hours ago");
    } else if (minutes > 0) {
      return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
    } else {
      return seconds + (seconds === 1 ? " second ago" : " seconds ago");
    }
  }
}
