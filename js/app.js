'use strict';

var allItems = [];
// var votes = [];
// var title = [];

var container = document.getElementById('image-container');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var itemList = document.getElementById('itemlist');


function Item(name, votes, timeShown) {
  this.name = name;
  this.votes = votes || 0;
  this.timeShown = timeShown || 0;
  this.filepath = `img/${name}.jpg`;
  allItems.push(this);
}

var allProducts = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthuluhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water', 'wine-glass'];




// allProducts.forEach (function (productItem){
//   new Item (productItem);
// });

for (var i = 0; i < allProducts.length; i++) {
  new Item(allProducts[i]);
}

var userClickes = 0;
function endClicks() {
  if (userClickes === 25) {
    container.removeEventListener('click', handleClick);
  }
}

// endClicks();

// function makeRandom() {
//   return Math.floor(Math.random() * allItems.length);
// }

var output = [];
function makeThreeUnique() {
  var firstNum =  Math.floor(Math.random() * allItems.length);
 
  output.push(firstNum);
  left.src = allItems[firstNum].filepath;
  left.title = allItems[firstNum].name;
  allItems[firstNum].timeShown++;

  var secondNum = Math.floor(Math.random() * allItems.length);
  while (output.includes(secondNum)) {
    secondNum = Math.floor(Math.random() * allItems.length);
  }
  output.push(secondNum);
  center.src = allItems[secondNum].filepath;
  center.title = allItems[secondNum].name;
  allItems[secondNum].timeShown++;

  var thirdNum = Math.floor(Math.random() * allItems.length);
  while (output.includes(thirdNum)) {
    thirdNum = Math.floor(Math.random() * allItems.length);
  }
  output.push(thirdNum);
  right.src = allItems[thirdNum].filepath;
  right.title = allItems[thirdNum].name;
  allItems[thirdNum].timeShown++;


  if (output.length > 6) {
    output.slice(0, 3);
  }
  userClickes++;
  endClicks();
}


makeThreeUnique();


function handleClick(event) {
  if (event.target.alt === 'image-container') {
    return alert('Please click on an image');
  }



  for (var i = 0; i < allItems.length; i++)
    if (event.target.alt === allItems[i].name) {
      allItems[i].votes++;
    }

}

container.addEventListener('click', handleClick);

function showlist() {
  for (var i = 0; i < allItems.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${allItems[i].name} has ${allItems[i].views}
    and ${allItems[i].votes} votes`;
    itemList.appendChild(liEl);
  }
}

showlist();


