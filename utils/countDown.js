export default function countdown() {
  var seconds = 120;
  var timer = setInterval(function () {
    seconds--;
    if (seconds < 0) {
      clearInterval(timer);
      alert("Time's up!");
    } else {
      return seconds + ' seconds left';
    }
  }, 1000);
}
