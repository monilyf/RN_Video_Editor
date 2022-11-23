const TimeConverter = (seconds) => {
  var date = new Date(0);
  date.setSeconds(seconds); // specify value for SECONDS here
  var timeString;
  if(seconds>3600){
    timeString = date.toISOString().substring(11, 19);
  }else{
    timeString = date.toISOString().substring(14, 19);
  }
  return timeString
};
export {TimeConverter};
