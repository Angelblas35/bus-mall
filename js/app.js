'use strict';

var allItems = [];
var votes = [];
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




allProducts.forEach (function (productItem){
  new Item (productItem);
});

// for (var i = 0; i < allProducts.length; i++) {
//   new Item(allProducts[i]);
// }



var userClickes = 0;
function endClicks() {
  //is game over
  if (userClickes === 25) {
    // showlist();
    console.log('game is over');
    container.removeEventListener('click', handleClick);
    // build votes array
    // render chart or list
    showlist();

  }
}




// endClicks();

// function makeRandom() {
//   return Math.floor(Math.random() * allItems.length);
// }

var output = [];
function makeThreeUnique() {
  var firstNum = Math.floor(Math.random() * allItems.length);
  console.log(output);
  output.push(firstNum);
  left.src = allItems[firstNum].filepath;
  left.title = allItems[firstNum].name;
  left.alt = allItems[firstNum].name;
  allItems[firstNum].timeShown++;

  var secondNum = Math.floor(Math.random() * allItems.length);
  while (output.includes(secondNum)) {
    secondNum = Math.floor(Math.random() * allItems.length);
  }
  output.push(secondNum);
  center.src = allItems[secondNum].filepath;
  center.title = allItems[secondNum].name;
  center.alt = allItems[secondNum].name;
  allItems[secondNum].timeShown++;

  var thirdNum = Math.floor(Math.random() * allItems.length);
  while (output.includes(thirdNum)) {
    thirdNum = Math.floor(Math.random() * allItems.length);
  }
  output.push(thirdNum);
  right.src = allItems[thirdNum].filepath;
  right.title = allItems[thirdNum].name;
  right.alt = allItems[thirdNum].name;
  allItems[thirdNum].timeShown++;


  if (output.length > 6) {
    output = output.slice(0, 3);
  }

  endClicks();
}





function handleClick(event) {
  if (event.target.alt === 'image-container') {
    return alert('Please click on an image');
  }



  console.log(event.target.alt);
  for (var i = 0; i < allItems.length; i++) {
    if (event.target.title === allItems[i].name) {
      allItems[i].votes++;
    }
  }
  makeThreeUnique();
  userClickes++;
}



function showlist() {
  for (var i = 0; i < allItems.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${allItems[i].name} has ${allItems[i].views}
    and ${allItems[i].votes} votes`;
    itemList.appendChild(liEl);
  }
}
// var canvas = document.getElementById('canvas');
// if (canvas.getContext) {
//   var chart = canvas.getContext('2d');
// }

container.addEventListener('click', handleClick);
makeThreeUnique();


// var allProducts = [];
var busChart;
var chartDrawn = false;

// ++++++++++++++++++++++++++++++++++++++++++++
// DATA - Constructor and instances
// ++++++++++++++++++++++++++++++++++++++++++++

// function Item(title, identifier) {
//   this.title = title;
//   this.votes = 0;
//   this.identifier = identifier;
//   allProducts.push(this);
// }

new Item('Bag', 'bag');
new Item('Banana', 'banana');
new Item('Bathroom', 'bathroom');
new Item('Boots', 'boots');
new Item('Breakfast', 'breakfast');
new Item('Bubblegum', 'bubblegum');
new Item('Chair', 'chair');
new Item('Cthulhu', 'cthulhu');
new Item('Dog-Duck', 'dog-duck');
new Item('Dragon', 'dragon');
new Item('Pen', 'pen');
new Item('Pet-Sweep', 'pet-sweep');
new Item('Scissors', 'scissors');
new Item('Shark', 'shark');
new Item('Sweep', 'sweep');
new Item('Tauntaun', 'tauntaun');
new Item('Unicorn', 'unicorn');
new Item('Usb', 'usb');
new Item('Water-Can', 'water-can');
new Item('Wine-Glass', 'wine-glass');

// Arrays to hold data for the chart
// var votes = [];
var titles = [];

// ++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
// ++++++++++++++++++++++++++++++++++++++++++++

function updateChartArrays() {
  for (var i = 0; i < allProducts.length; i++) {
    titles[i] = allProducts[i].title;
    votes[i] = allProducts[i].votes;
  }
}

function showProductsAsList() {
  var itemList = document.getElementById('mellow-list');
  itemList.innerHTML = '';
  itemList.hidden = false;
  itemList.textContent = 'CLICK ON THIS LIST TO HIDE IT';
  for (var i = 0; i < allProducts.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = allProducts[i].title + ', ' + allProducts[i].votes + ' votes';
    itemList.appendChild(liEl);
  };
};

function tallyVote(thisSong) {
  for (var i = 0; i < allProducts.length; i++) {
    if (thisSong === allProducts[i].identifier) {
      allProducts[i].votes++;
      updateChartArrays();
    }
  }
}



var data = {
  labels: allProducts, // titles array we declared earlier
  datasets: [
    {
      data: votes, // votes array we declared earlier
      backgroundColor: [
        'bisque',
        'darkgray',
        'burlywood',
        'lightblue',
        'navy'
      ],
      hoverBackgroundColor: [
        'darkgreen',
        'darkgreen',
        'darkgreen',
        'darkgreen',
        'darkgreen'
      ],
    }],
};

function drawChart() {
  var ctx = document.getElementById('mellow-chart').getContext('2d');
  busChart = new Chart(ctx,{
    type: 'polarArea',
    data: data,
    options: {
      legend: {
        labels: {
          fontColor: 'darkgreen',
          fontSize: 18,
        },
      },
      responsive: false,
      animation: {
        duration: 1000,
        easing: 'easeOutBounce',
      },
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0,
        },
      }],
    },
  });
  chartDrawn = true;
}

function hideChart() {
  document.getElementById('mellow-chart').hidden = true;
}
// ++++++++++++++++++++++++++++++++++++++++++++
// EVENT LISTENERS
// ++++++++++++++++++++++++++++++++++++++++++++

document.getElementById('draw-chart').addEventListener('click', function(){
  drawChart();
  // setTimeout(hideChart, 5000);
});

document.getElementById('list-button').addEventListener('click', function(){
  showProductsAsList();
});

// document.getElementById('list-button').addEventListener('click', showSongsAsList);

document.getElementById('mellow-list').addEventListener('click', function(){
  document.getElementById('mellow-list').hidden = true;
});

document.getElementById('voting').addEventListener('click', function(event){
  if (event.target.id !== 'voting') {
    tallyVote(event.target.id);
  };

  if (chartDrawn) {
    busChart.update();
  }
});


