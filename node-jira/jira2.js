const config = require('./config/jiraApi.js')

searchStatistics()

async function searchStatistics() {

    let today = new Date()
    let lastYear = today.getFullYear() - 1
    let curYear = today.getFullYear()
    let curMonth = today.getMonth()

    for ( var i = 0 ; i < 2 ; i++ ) {
        for ( var j = 1 ; j < 13 ; j++ ) {
            let jira = config.getJiraApi

            let searchYear = lastYear + i

            if(searchYear >= curYear && curMonth+1 <= j) {
                break
            }
            var lastDay = new Date(searchYear,j,0).getDate()
            var startDate = `${searchYear}/${j = j.toString().length == 1 ? '0'+j : j}/01`
            var endDate = `${searchYear}/${j = j.toString().length == 1 ? '0'+j : j}/${lastDay}`
            
            var jql  = `project = "[ServiceDesk] 해피앱" and assignee not in (sg.oh, ys.woo, jklee, jhbae, dskim) AND TYPE != 문제 AND duedate >= '${startDate}' and duedate <= '${endDate}' and summary !~ '디자인*'`
            var totalCnt = -1 

            await jira.searchJira(jql).then( function(issue) {
                totalCnt = issue.total
            }).catch(err => {
                console.log(err)
            })

            console.log()
            console.log(`JQL : ${jql}`)
            console.log(`${searchYear}/${j}월 토탈 이슈 수 : ${totalCnt}`)
        }
    }
}