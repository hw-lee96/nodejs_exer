
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

function searchJira(jql, obtional) {
    jira.searchJira(jql, obtional).then( issue => {
        if ( issue.maxResults < issue.total ) {
            var obtional_ = new Object();
            obtional_.maxResults = issue.total;
            return searchJira(jql, obtional_);
        }
        issue.issues.map((issue_) => {
            console.log(issue.maxResults + "#####################################");
            console.log(issue_.key);
            console.log(issue_.fields.summary);
            console.log(issue_.fields.duedate);
        });
    }).catch(err => {
        console.log(err);
    });
}