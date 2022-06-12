const userFormEl = document.querySelector("#user-form")
const nameInputEl = document.querySelector("#username")
const repoContainerEl = document.querySelector("#repos-container")
const repoSearchTerm = document.querySelector("#repo-search-term")

let formSubmitHandler = function(event) {
    event.preventDefault()
    const username = nameInputEl.value.trim()

    if (username) {
        getUserRepos(username)
        nameInputEl.value = ""
    }else {
        alert("please enter a Github username")
    }
}

var getUserRepos = function(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos"

    fetch(apiUrl)
        .then(res => {
            if(res.ok) {
                res.json().then(data => {
                    displayRepos(data, user)
                })
            }else {
                alert("Error: Github User Not Found")
            }
        })
        .catch(function(error) {
            alert("Unable to connect to GitHub")
        })

}

var displayRepos = function(repos, searchTerm) {
    repoContainerEl.textContent = ""
    repoSearchTerm.textContent = searchTerm

    if(repos.length === 0) {
        repoContainerEl.textContent = "No repositories found."
        return
    }

    for (let i = 0; i < repos.length; i++) {
        const repoName = repos[i].owner.login + "/" + repos[i].name
        const repoEl = document.createElement("div")
        repoEl.classList = "list-item flex-row justify-space-between align-center"

        const titleEl = document.createElement("span")
        titleEl.textContent = repoName

        repoEl.appendChild(titleEl)

        const statusEl = document.createElement("span")
        statusEl.classList = "flex-row align-center"

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)"
        }else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"
        }

        repoEl.appendChild(statusEl)

        repoContainerEl.appendChild(repoEl)
    }
}

userFormEl.addEventListener("submit", formSubmitHandler)