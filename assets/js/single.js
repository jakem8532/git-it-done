const issueContainerEl = document.querySelector("#issues-container")
const limitWarningEl = document.querySelector("#limit-warning")
const repoNameEL = document.querySelector("#repo-name")

function getRepoName() {
    const queryString = document.location.search
    const repoName = queryString.split("=")[1]

    if (repoName) {
        getRepoIssues(repoName)
        repoNameEL.textContent = repoName
    }else {
        document.location.replace("./index.html")
    }
    
}

function getRepoIssues(repo) {
    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"

    fetch(apiUrl)
        .then(res => {
            if(res.ok) {
                res.json().then(data => {
                    displayIssues(data)
                })

                if (res.headers.get("link")) {
                    displayWarning(repo)
                }
            }else {
                document.location.replace("./index.html")
            }
        })
}

function displayIssues(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!"
        return
    }
    for (let i = 0; i < issues.length; i++) {
        const issuesEl = document.createElement("a")
        issuesEl.classList = "list-item flex-row justify-space-between align-center"
        issuesEl.setAttribute("href", issues[i].html_url)
        issuesEl.setAttribute("target", "_blank")

        const titleEl = document.createElement("span")
        titleEl.textContent = issues[i].title

        issuesEl.appendChild(titleEl)

        const typeEl = document.createElement("span")
        if(issues[i].pull_request) {
            typeEl.textContent = "(Pull request)"
        }else {
            typeEl.textContent = "(Issues)"
        }

        issuesEl.appendChild(typeEl)
        issueContainerEl.appendChild(issuesEl)
    }
}

function displayWarning(repo) {
    limitWarningEl.textContent = "To see more than 30 issues visit "

    const linkEl = document.createElement("a")
    linkEl.textContent = "See More Issues on GitHub.com"
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues")
    linkEl.setAttribute("target", "_blank")

    limitWarningEl.appendChild(linkEl)
}

getRepoName()