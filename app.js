/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  
  let kitten = document.getElementById("kittenName").value;
  if(!kitten) return false

  var catImage = 'https://robohash.org/' + kitten + '?set=set4';
  
  console.log(catImage);
  
  let kitty = {
    id: generateId(),
    name: document.getElementById("kittenName").value,
    mood: document.getElementById("kittenMood").value,
    affection: document.getElementById("kittenAffection").value,
    picture: catImage
  }
  kittens.push(kitty);
  document.forms[0].reset();
  console.warn('creating kitten named' , {kitty} );
  saveKittens()  
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  //saving to local storage
  localStorage.setItem('myKittyList', JSON.stringify(kittens) );
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  if(localStorage.getItem('myKittyList')) {
    kittens = JSON.parse(localStorage.getItem('myKittyList'));
    drawKittens()
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  if(!kittens.length) return

  let pre = document.querySelector('#msg pre');

  let displayHtml = `
  <div style="overflow-x:auto;">
  <table style="width:100%">
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Mood</th>
    <th>Affection</th>
    <th>Image</th>
    <th>Delete</th>
  </tr>`
  kittens.forEach(k => {
    displayHtml += `
    <tr>
      <td>${k.id}</td>
      <td>${k.name}</td>
      <td>
        <button style="margin:auto;display:block;" id="${k.id}" onClick="increaseMoodKitten(this.id)">Up</button>
        <label>${k.mood}</label>
        <button style="margin:auto;display:block;" id="${k.id}" onClick="decreaseMoodKitten(this.id)">Down</button>
      </td>
      <td>${k.affection}</td>
      <td><img src="${k.picture}"></td>
      <td><button id="${k.id}" onClick="deleteKitten(this.id)">Delete</button></td>
    </tr>
    `
  });
  displayHtml += `</table></div>`
  pre.innerHTML = displayHtml;
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

function deleteKitten(id) {
  kittens.splice(getIndex(id), 1);
  saveKittens()
}

function getIndex(id) {
  var index = kittens.map(x => {
    return x.id;
  }).indexOf(id);
  return index
}

function decreaseMoodKitten(id) {
  kittens[getIndex(id)].mood--
  saveKittens()
}

function increaseMoodKitten(id) {
  kittens[getIndex(id)].mood++
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {}

function getStarted() {
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
