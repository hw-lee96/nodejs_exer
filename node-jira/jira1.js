
/*
    var JiraApi = require('jira-client');

    var jira = new JiraApi({
        protocol: 'https',
        host: 'jira.link.com',
        username: 'userid',
        password: 'userpw',
        strictSSL: true
    });
*/

const config = require('./config/jiraApi.js');

var jira = config.getJiraApi;

/*

    ** jira 관련 함수 **

.findIssue('issue key')
 => 이슈 키로 이슈 정보를 조회

 .searchJira('jql')
  => jql로 이슈 정보를 조회

*/
var jql  = 'project = "[ServiceDesk] 해피앱" AND TYPE != 문제 AND duedate >= -11d AND duedate <= 11d AND assignee not in (sg.oh, ys.woo, jklee, jhbae) ORDER BY duedate DESC, type ASC';

searchJira(jql);

/*
.then(issue => {
        console.log( issue );
    }).catch(err => {
        console.log(err);
    });
*/

function findIssue(key) {
    jira.findIssue(key).then(issue => {
        console.log( issue );
    }).catch(err => {
        console.log(err);
    });
}

function searchJira(jql) {
    jira.searchJira(jql).then(issue => {
        issue.issues.map((issue) => {
            console.log("#####################################");
            console.log(issue.key);
            console.log(issue.fields.summary);
            console.log(issue.fields.duedate);
        });
        
        // for ( var i in issue.issues ) {
        //     console.log( issue.issues[i].key );
        // }

        // for ( var i = 0 ; i < issue.issues.length ; i++ ) {
        //     console.log(issue.issues[i].key);
        // }

        // console.log( issue );
    }).catch(err => {
        console.log(err);
    });
}