let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const toyCollection = document.getElementById("toy-collection")
  //console.log(toyCollection)
  function getToys() {
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(data => toys(data))
    
  }
  getToys()
 
  document.querySelector('.add-toy-form').addEventListener('submit', addToy)
  function addToy(e) {
    e.preventDefault()
    //console.log(e.target[0].value)
    const toyObj = {name: e.target[0].value, image: e.target[1].value, likes: 0}
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-type': "application/json",
      },
      body: JSON.stringify(toyObj)
    })
    .then(res => res.json())
    .then(toy => toys([toy]))
  }

  function toys(characters) {
    //console.log(characters)
    characters.forEach(character => {
      //console.log(character)
      //console.log(character.name)
      const h2 = document.createElement("h2")
      h2.innerText = character.name
      //console.log(h2)
      const img = document.createElement("img")
      img.className = "toy-avatar"
      img.src = character.image
      //console.log(img)
      const p = document.createElement('p')
      p.innerText = `${character.likes} likes`
      //console.log(p)
      const button = document.createElement("button")
      button.className = "like-btn"
      button.addEventListener('click', increaseLikes)
      button.id = character.id
      button.innerHTML = "Like"
      //console.log(button)
      const div = document.createElement('div')
     div.className = 'card'
     div.append(h2, img, p, button)
     document.getElementById("toy-collection").append(div)
     

    })
  }
  function increaseLikes(e) {
    console.log(parseInt(e.target.previousSibling.innerText)+1)
    const newNumberOfLikes = parseInt(e.target.previousSibling.innerText)+1
    
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "likes": newNumberOfLikes
      })
    })
    .then(res => res.json())
    .then(e.target.previousSibling.innerText = `${newNumberOfLikes} likes`)
    
  }

});
