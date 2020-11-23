const URL = 'http://localhost:3000/pups';

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getDogs() {
    fetch(URL)
        .then(response => {
            return response.json();
        })
        .then(data => renderDogList(data));
}

function renderDogList(dogs) {
    dogs.forEach(dog => {
        let dogBar = document.getElementById('dog-bar');

        let dogName = document.createElement('span');
        dogName.innerText = dog.name;
        dogName.id = dog.id
        dogName.addEventListener('mouseover', seeDogInfo)

        dogBar.append(dogName);
    });
}

function seeDogInfo(event) {
    let id = event.target.id

    fetch(`${URL}/${id}`)
        .then(response => response.json())
        .then(dog => {
            let dogBox = document.querySelector('#dog-summary-container > div')
            removeAllChildNodes(dogBox)

            let dogImg = document.createElement("img")
            dogImg.src = dog.image

            let dogStatus = document.createElement("button")
            dogStatus.innerText = dog.isGoodDog ? 'dog is a good dog' : 'dog is no bueno'
            dogStatus.addEventListener('click', (event) => {
                let currentButton = document.querySelector('button')
                fetch(`${URL}/${id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ isGoodDog: !dog.isGoodDog })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.isGoodDog)
                        currentButton.innerText = data.isGoodDog ? 'dog is a good dog' : 'dog is no bueno'
                    })
            })

            let dogName = document.createElement('span');
            dogName.innerText = dog.name;

            dogBox.append(dogName, dogStatus, dogImg)


        })
}
getDogs()

// On the page, there is a div with the id of "dog-bar". On page load, make a fetch to get all of the pup objects. When you have this information, you'll need to add a span with the pup's name to the dog bar (ex: <span&gt;Mr. Bonkers&lt;/span>).