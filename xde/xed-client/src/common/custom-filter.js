import Vue from 'vue';

Vue.filter('formatDate', function (time, format) {
  var defaultFormatTime = "dd/MM/yyyy";
  format = format || defaultFormatTime;
  var date = new Date(time);
  switch (format) {
    case 'MM/dd/yyyy':
      return ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + "/" + date.getFullYear();
      break;
    case 'dd/MM/yyyy':
      var date = new Date(time);
      return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
      break;
    case 'dd/MM/yyyy H:mm:ss':
      return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + "  "
        + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      break
    case 'dd/MM/yyyy':
    default :
      return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
      break;
  }
});

Vue.filter('bytes', function (bytes, precision) {
  if (isNaN(parseFloat(bytes)) || !isFinite(bytes))
    return '-';
  if (bytes === 0) {
    return '0 B';
  }
  if (typeof precision === 'undefined')
    precision = 2;
  var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'],
    number = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
});
