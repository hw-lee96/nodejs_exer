var data = ``;

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

var data = replaceAll(replaceAll(replaceAll(data,'\n\n', '|'),'\n', ''),'\t', '|').split('조치');
var issueArr = new Array();

data.map(( d ) => {
    var varr = d.split('|'), issue = new Object();

    issue.key = varr[0];
    issue.title = varr[1];
    issue.date = varr[2];

    issueArr.push(issue);
});

var text = "";
var prevDt ;

issueArr.map(issue => {
    if(prevDt != issue.date ) {
        console.log("\n" + issue.date);
        text += "\n" + issue.date + "\n";
    }
    console.log(issue.key + " " + issue.title);
    text += issue.key + " " + issue.title + "\n";
    prevDt = issue.date;
});

const fs = require('fs');

fs.writeFileSync("C:/Users/hw.lee/Desktop/issueData.txt", '\ufeff' + text, {encoding: 'utf8'});
