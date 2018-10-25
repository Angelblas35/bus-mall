'use strict';

var allItems = [];
var votes = [];


var container = document.getElementById('image-container');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var itemList = document.getElementById('itemlist');


function Item(name) {
  this.name = name;
  this.votes = votes || 0;
  // this.timeShown = timeShown || 0;
  this.filepath = `img/${name}.jpg`;
  allItems.push(this);
}

var allProducts = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];




allProducts.forEach (
  function (productItem){
    new Item (productItem);
  }
);

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
    drawChart();

  }
}


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



  // console.log(event.target.alt);
  for (var i = 0; i < allItems.length; i++) {
    if (event.target.title === allItems[i].name) {
      allItems[i].votes++;
      
    }
  }
  makeThreeUnique();
  userClickes++;
}



function showChart() {
  for (var i = 0; i < allItems.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${allItems[i].name} has ${allItems[i].timeShown}
    and ${allItems[i].votes} votes`;
    itemList.appendChild(liEl);
  }
}

container.addEventListener('click', handleClick);
makeThreeUnique();



var busChart;
var chartDrawn = false;


var titles = [];
function updateChartArrays() {
  for (var i = 0; i < allItems.length; i++) {
    titles[i] = allItems[i].name;
    votes[i] = allItems[i].votes;
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
        'darkgreen',
        'navy'
      ],
      hoverBackgroundColor: [
        'grey',
        'grey',
        'grey',
        'grey',
        'grey'
      ],
    }],
};

function drawChart() {
  updateChartArrays();
  var ctx = document.getElementById('bus-chart').getContext('2d');
  busChart = new Chart(ctx,{
    type: 'bar',
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
  document.getElementById('bar-chart').hidden = true;
}


if (chartDrawn) {
  busChart.update();
}



