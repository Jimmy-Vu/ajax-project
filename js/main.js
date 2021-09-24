var buttonList = document.querySelectorAll('.view-button');
var browseTitle = document.querySelector('.browse-title');
var buttonContainer = document.querySelector('.buttons-container');
var displayHolder = document.querySelector('.display-holder');
var searchContainer = document.querySelector('.search-container');
var searchBar = document.querySelector('.search-bar');
var windowWidth = window.innerWidth;

for (var i = 0; i < buttonList.length; i++) {
  buttonList[i].addEventListener('click', buttonNav);
}

function buttonNav(event) {
  dataClear();
  searchContainer.reset();
  switch (event.target.closest('a').getAttribute('data-view')) {
    case 'fish':
      browseTitle.textContent = 'Fishes';
      data.view = 'fish';
      searchBar.className = 'search-bar active';
      upperLimit = 12;
      lowerLimit = 1;
      dataPull('fish');
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'bugs':
      browseTitle.textContent = 'Bugs';
      data.view = 'bugs';
      searchBar.className = 'search-bar active';
      upperLimit = 12;
      lowerLimit = 1;
      dataPull('bugs');
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'villagers':
      browseTitle.textContent = 'Villagers';
      data.view = 'villagers';
      searchBar.className = 'search-bar active';
      upperLimit = 12;
      lowerLimit = 1;
      dataPull('villagers');
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'sea':
      browseTitle.textContent = 'Sea Life';
      data.view = 'sea';
      searchBar.className = 'search-bar active';
      upperLimit = 12;
      lowerLimit = 1;
      dataPull('sea');
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'home':
      browseTitle.textContent = 'Home';
      data.view = 'home';
      searchBar.className = 'search-bar hidden';
      upperLimit = 12;
      lowerLimit = 1;
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
  }
}

var searchText = '';

searchContainer.addEventListener('submit', searchBarListener);

function searchBarListener(event) {
  event.preventDefault();
  dataClear();
  searchText = searchBar.value;
  searchDataPull(data.view);
}

function searchDataPull(string) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://acnhapi.com/v1/' + string);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var id = 1;
    var lowerLimit = 1;
    var upperLimit = 12;
    for (var key in xhr.response) {
      if (xhr.response[key]['file-name'].includes(searchText)) {
        var imgHolder = document.createElement('img');
        if (!(id > upperLimit ||
          id < lowerLimit)) {
          imgHolder.setAttribute('id', id);
          imgHolder.setAttribute('src', xhr.response[key].icon_uri);
          imgHolder.setAttribute('name', xhr.response[key]['file-name']);
          imgHolder.className = 'height-100';
          var itemBackground = document.createElement('div');
          itemBackground.className = 'item-background';
          itemBackground.appendChild(imgHolder);
          gridStart.appendChild(itemBackground);
          id++;
        }
      }
    }
  });

  xhr.send();
}

var gridStart = document.querySelector('.grid');
var upperLimit = 12;
var lowerLimit = 1;

var arrowButtonList = document.querySelectorAll('.arrow-button');

for (var j = 0; j < arrowButtonList.length; j++) {
  arrowButtonList[j].addEventListener('click', arrowButtonClick);
}

function arrowButtonClick(event) {
  if (event.target.className === 'arrow-button fas fa-angle-double-left') {
    if (lowerLimit === 1) {
      lowerLimit = 1;
      upperLimit = 12;
    } else {
      lowerLimit -= 12;
      upperLimit -= 12;
    }
  } else if (event.target.className === 'arrow-button fas fa-angle-double-right') {
    lowerLimit += 12;
    upperLimit += 12;
  }
  switch (data.view) {
    case 'bugs':
      dataClear();
      dataPull('bugs');
      break;
    case 'fish':
      dataClear();
      dataPull('fish');
      break;
    case 'villagers':
      dataClear();
      dataPull('villagers');
      break;
    case 'sea':
      dataClear();
      dataPull('sea');
      break;
  }
}

function dataPull(string) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://acnhapi.com/v1/' + string);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var key in xhr.response) {
      var imgHolder = document.createElement('img');
      imgHolder.setAttribute('id', xhr.response[key].id);
      if (Number.parseInt(imgHolder.getAttribute('id'), 10) > upperLimit ||
      Number.parseInt(imgHolder.getAttribute('id'), 10) < lowerLimit) {
        continue;
      } else {
        imgHolder.setAttribute('src', xhr.response[key].icon_uri);
        imgHolder.setAttribute('name', xhr.response[key]['file-name']);
        imgHolder.className = 'height-100';
        var itemBackground = document.createElement('div');
        itemBackground.className = 'item-background';
        itemBackground.appendChild(imgHolder);
        gridStart.appendChild(itemBackground);
      }
    }
  });
  xhr.send();
}

function dataClear() {
  var backgroundList = document.querySelectorAll('.item-background');

  for (var i = 0; i < backgroundList.length; i++) {
    backgroundList[i].parentNode.removeChild(backgroundList[i]);
  }
}

window.addEventListener('resize', function () { windowWidth = window.innerWidth; });

function mobileButtonNav(string) {
  if (windowWidth < 800 && string !== 'home') {
    buttonContainer.className = 'buttons-container hidden';
    displayHolder.className = 'display-holder column';
  } else {
    buttonContainer.className = 'buttons-container';
    displayHolder.className = 'display-holder hidden';
  }
}
