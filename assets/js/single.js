const issueContainerEl = document.querySelector("#issues-container")

function getRepoIssues(repo) {
    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"

    fetch(apiUrl)
        .then(res => {
            if(res.ok) {
                res.json().then(data => {
                    displayIssues(data)
                })
            }else {
                alert("There was a problem with your request!")
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

getRepoIssues("facebook/react")