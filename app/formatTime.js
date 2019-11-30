formatTime = (time) => {
  let minutes = Math.floor(time/60);
  console.log(minutes);
  let seconds = time%60;
  console.log(seconds);
  let parsedTime = null;
  if(minutes < 10){
    minutes = '0' + minutes;
  }
  if(seconds < 10){
    seconds = '0' + seconds;
  }
  parsedTime = minutes + ':' + seconds;
  console.log(parsedTime);
}