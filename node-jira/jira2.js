const config = require('./config/jiraApi.js');

var jira = config.getJiraApi;

searchStatistics();

function searchStatistics() {
    const year = [2019, 2020];

    var arr =  new Array();
    // let data = new Object();
    // var strResult = new Array();
    for ( var i = 0 ; i < year.length ; i++ ) {
        for ( var j = 1 ; j < 13 ; j++ ) {
            var lastDay = new Date(year[i],i,0).getDate();
            var startDate = `${year[i]}/${j = j.toString().length == 1 ? '0'+j : j}/01`;
            var endDate = `${year[i]}/${j = j.toString().length == 1 ? '0'+j : j}/${lastDay}`;
            
            var jql  = `project = "[ServiceDesk] 해피앱" AND TYPE != 문제 AND duedate >= '${startDate}' and duedate <= '${endDate}'`;

            // var temp = {
            //     number : i,
            //     sql : jql,
            //     result : searchJira(jql)
            // };
            // strResult.push(temp);

            searchJira(jql, '', arr);

            // var totalCnt = searchJira(jql);
            // console.log(`${year}/${i} 토탈 이슈 수 : ${totalCnt}`);
        }
    }
    // console.log(strResult);
}


function searchJira(jql, obtional, arr) {

    jira.searchJira(jql, obtional).then( function(issue) {
        console.log(`JQL START ==> ${jql}`);
        console.log(`issue.total : ${issue.total}`)
        return issue.total;
    }).catch(err => {
        // console.log(err);
    });
}