
var app = function() {
  var url = 'https://api.punkapi.com/v2/beers';

  makeRequest(url, function () {
    var jsonString = this.responseText;
    var beers = JSON.parse(jsonString);
    render(beers);
  });
};

var makeRequest = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var render = function (beers) {
  var storedBeer = localStorage.getItem('selectedBeer');
  var beerToDisplay = null;

  if (storedBeer) {
    beerToDisplay = JSON.parse(storedBeer);
    var select = document.querySelector('#beers');
    select.selectedIndex = beerToDisplay.index;
  }
  else {
    beerToDisplay = beers[0];
  }

  populateSelect(beers);
  updateInfo(beerToDisplay);
}

var populateSelect = function (beers) {
  var select = document.querySelector('#beers');
    
  beers.forEach(function (item, index) {
    item.index = index;
    var option = document.createElement('option');
    option.value = index;
    option.text = item.name;
    select.appendChild(option);
  });

  select.addEventListener('change', function (event) {
    var index = this.value;
    var beer = beers[index];
    
    updateInfo(beer);

    var jsonString = JSON.stringify(beer);
    localStorage.setItem('selectedBeer', jsonString);
  });
}

var updateInfo = function (beer) {
  var pTags = document.querySelectorAll('#main p');
  var img = document.querySelector('img')

  pTags[0].innerText = "Name: " + beer.name;
  pTags[1].innerText = "Yeast: " + beer.ingredients.yeast
  img.src = beer.image_url;

  
}

window.addEventListener('load', app);