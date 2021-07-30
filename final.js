const el = document.querySelector('.user')
const btn = document.querySelector('#btn')
const btn2 = document.querySelector('#btn2')
const url = "https://mrrobot-dc5f6.firebaseio.com/.json"

// usando async await - forma mais moderna
async function fetchUser(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        showUserAtScreen(data)
    } catch (error) {
        console.log(error.response.body);
        el.innerHTML += error.response.body
    }
}


// adiciona os dados ao HTML
function showUserAtScreen(data) {
    const { login, avatar_url, location, bio, html_url } = data

    if (data.message === "Not Found") {
        el.innerHTML = User + data.message
    } else {
        const user =
            `
            <img src=${avatar_url}  rel=${login}/>
            <p>${location}</p>
            <p>${bio}</p>
            <a href=${html_url}>${login}</a>
        `
        el.innerHTML = user
    }
}

// ao  clicar o o botão
btn.addEventListener('click', (e) => {
    e.preventDefault()

    const userName = document.querySelector('#userName');

    console.log(userName.value);
    if (userName.value !== "" && userName.value !== undefined) {
        const url = `https://api.github.com/users/${userName.value}`
        fetchUser(url)
    } else {
        alert("o input não deve ficar vazio")
    }
})

btn2.addEventListener('click', (e) => {
    e.preventDefault()
    // Javascript object Notation
    // post body data 
    const user = {
        first_name: 'John',
        last_name: 'Doe',
        job_title: 'Blogger'
    };

    // request options
    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // send POST request
    fetch(url, options)
        .then(res => res.json())
        .then(res => console.log(res));
})