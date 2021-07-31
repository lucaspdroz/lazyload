const myGitUser = 'lucaspdroz'


const urlCat = `https://dog.ceo/api/breeds/image/random`
const urlGithub = `https://api.github.com/users/${myGitUser}`

const catContainer = document.querySelector('#doguinhos')
const gitContainer = document.querySelector('#github')

function mostraDoguinhos(data) {
    const { message } = data

    const dog =
        `
        <div class="dogCard">
            <img loading="lazy" src="${message}" alt="${message}"/>
            <div class="socialInteraction">
                <span><img src="assets/like.svg"/></span>
                <span><img src="assets/chat.svg"/></span>
                <span><img src="assets/share.svg"/></span>
            </div>

            <div class="socialComents">
                <textarea name="w3review" rows="3" cols="50" resize:"vertical" placeholder="Comentar"></textarea>
            </div>
         </div>
        `
    catContainer.innerHTML += dog
}

function mostraGithub(data) {
    console.log(data);
    const { avatar_url, login } = data

    const git =
        `
            <p>${login}</p>
            <img class="gitImage" src=${avatar_url} alt="foto do usuário"/>
        `
    gitContainer.innerHTML = git
}

async function fetchDoguinhos(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        mostraDoguinhos(data)

    } catch (error) {
        catContainer.innerHTML = error.response.body
    }
}

async function fetchGit(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        mostraGithub(data)

    } catch (error) {
        gitContainer.innerHTML = error.response.body
    }
}

fetchGit(urlGithub)
fetchDoguinhos(urlCat)

window.onscroll = function () {
    if ((window.innerHeight + 200 + window.scrollY) >= document.body.offsetHeight) {
        fetchDoguinhos(urlCat)
    }
}

