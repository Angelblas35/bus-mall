'use strict';

var allItems = [];



function Item(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  allItems.push(this);
}

new Item('bag', 'img/bag.jpg');
new Item('banana', 'img/banana.jpg');
new Item('bathroom', 'img/bathroom.jpg');
new Item('boots', 'img/boots.jpg');
new Item('breakfast', 'img/breakfast.jpg');
new Item('bubblegum', 'img/bubblegum.jpg');
new Item('chair', 'img/chair.jpg');
new Item('cthulhu', 'img/cthulhu.jpg');
new Item('dog-duck', 'img/dog-duck.jpg');
new Item('dragon', 'img/dragon.jpg');
new Item('pen', 'img/pen.jpg');
new Item('pet-sweep', 'img/pet-sweep.jpg');
new Item('scissors', 'img/scissors.jpg');
new Item('shark', 'img/shark.jpg');
new Item('sweep', 'img/sweep.jpg');
new Item('tauntaun', 'img(/tauntaun.jpg');
new Item('unicorn', 'img/unicorn.jpg');
new Item('usb', 'img/usb.jpg');
new Item('water-can', 'img/watercan.jpg');
new Item('wine-glass', 'img/wine-glass.jpg');


var itemImage = document.getElementById('item-pic');

function randomItem() {
  var idx = Math.floor(Math.random() * allItems.length);

  itemImage.src = allItems[idx].filepath;
  itemImage.alt = allItems[idx].name;
  itemImage.title = allItems[idx].name;

  allItems[idx].views++;
}

randomItem();

itemImage.addEventListener('click', randomItem);



