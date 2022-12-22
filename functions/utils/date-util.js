const formatYearsMonthDay = (date) => {
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
};

const SplitEventDate = (date) => {

  var dateArray = ''
  if (date) {
    dateArray = date.split("-");
  
    if (dateArray.length && dateArray[1] && dateArray[2]) {
  
      return { year:dateArray[0], month: dateArray[1], day: dateArray[2]}
  
    }
    
   }
   throw new Error("Invalid Date String") 
};

 const dateWithTimeZone = (timeZone, year, month, day, hour=0, minute=0, second=0) => {
  let date = new Date(Date.UTC(year, month-1, day, hour, minute, second)); //month is zero based

  let utcDate = new Date(date.toLocaleString('en-US', { timeZone: "UTC" }));
  let tzDate = new Date(date.toLocaleString('en-US', { timeZone: timeZone }));
  let offset = utcDate.getTime() - tzDate.getTime();

  date.setTime( date.getTime() + offset );
  return date;
};

const convertTZ = (date, tzString) => {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

 const getTime = (time) => {
  var minute = ''
  var timeArray = ''
 if (time) {
  timeArray = time.split(":");

  if (timeArray.length && timeArray[1]) {

    minute = timeArray[1].split(" ")

  }
 }
 return { hour:timeArray[0], minute: minute[0], meridiem: minute[1]  }
}

exports.formatYearsMonthDay = formatYearsMonthDay;
exports.getTime = getTime;
exports.convertTZ = convertTZ;
exports.dateWithTimeZone = dateWithTimeZone;
exports.SplitEventDate = SplitEventDate

