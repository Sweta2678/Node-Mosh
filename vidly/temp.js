let lastexecutedJob = {createDate:'2020-11-30T04:59:02.040+00:00'};

var date1 = new Date(lastexecutedJob.createDate);
var date2 = new Date();
var timeDiff = Math.abs(date2.getTime() - date1.getTime());
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
console.log(diffDays);