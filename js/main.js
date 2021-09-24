var buttonList = document.querySelectorAll('.view-button');
var browseTitle = document.querySelector('.browse-title');
var buttonContainer = document.querySelector('.buttons-container');
var displayHolder = document.querySelector('.display-holder');
var displayScreen = document.querySelector('.display-screen');
var searchContainer = document.querySelector('.search-container');
var searchBar = document.querySelector('.search-bar');
var arrowLeftAnchor = document.querySelector('#left-arrow');
var arrowRightAnchor = document.querySelector('#right-arrow');
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
          imgHolder.setAttribute('fileName', xhr.response[key]['file-name']);
          imgHolder.className = 'height-100';
          var itemBackground = document.createElement('div');
          itemBackground.setAttribute('fileName', xhr.response[key]['file-name']);
          itemBackground.className = 'item-background';
          itemBackground.appendChild(imgHolder);
          gridStart.appendChild(itemBackground);

          itemBackground.addEventListener('click', itemViewListener);
          id++;
        }
      }
    }
  });

  xhr.send();
}

function itemViewListener(event) {
  var fileName = event.target.getAttribute('fileName');
  var fileNameResult = '';
  for (var i = 0; i < fileName.length; i++) {
    if (i === 0 || (fileName[i - 1] === '_')) {
      fileNameResult += fileName[i].toUpperCase();
    } else if (fileName[i] === '_') {
      fileNameResult += ' ';
    } else {
      fileNameResult += fileName[i];
    }
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://acnhapi.com/v1/' + data.view + '/' + event.target.getAttribute('fileName'));
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    dataClear();
    searchBar.className = 'search-bar hidden';
    gridStart.className = '';
    arrowLeftAnchor.className = 'hidden';
    arrowRightAnchor.className = 'hidden';

    var itemInfoContainer = document.createElement('div');
    var itemTitle = document.createElement('h2');
    itemTitle.className = 'item-title';
    itemTitle.textContent = fileNameResult;
    itemInfoContainer.appendChild(itemTitle);
    displayScreen.className = 'display-screen-item';
    displayScreen.appendChild(itemInfoContainer);

    var itemInfoImage = document.createElement('img');
    itemInfoImage.setAttribute('src', xhr.response.icon_uri);
    itemInfoImage.className = 'item-info-image';
    displayScreen.appendChild(itemInfoImage);

    var itemInfoDescription = document.createElement('div');

    var catchPhraseDiv = document.createElement('div');
    var catchPhrase = document.createElement('h4');
    var catchPhraseText = document.createElement('p');
    catchPhrase.textContent = 'Catch Phrase:';
    catchPhraseText.textContent = xhr.response['catch-phrase'];
    catchPhrase.className = 'display-inline-block';
    catchPhraseText.className = 'display-inline-block';
    catchPhraseDiv.appendChild(catchPhrase);
    catchPhraseDiv.appendChild(catchPhraseText);
    itemInfoDescription.appendChild(catchPhraseDiv);

    var priceDiv = document.createElement('div');
    var price = document.createElement('h4');
    var priceText = document.createElement('p');
    price.textContent = 'Price:  ';
    priceText.textContent = xhr.response.price;
    price.className = 'display-inline-block';
    priceText.className = 'display-inline-block';
    priceDiv.appendChild(price);
    priceDiv.appendChild(priceText);
    itemInfoDescription.appendChild(priceDiv);

    var monthsNorthDiv = document.createElement('div');
    var monthsNorth = document.createElement('h4');
    var monthsNorthText = document.createElement('p');
    monthsNorth.textContent = 'Months Available For Northern Hemisphere:  ';
    monthsNorthText.textContent = monthsNumToWords(xhr.response.availability['month-northern']);
    monthsNorth.className = 'display-inline-block';
    monthsNorthText.className = 'display-inline-block';
    monthsNorthDiv.appendChild(monthsNorth);
    monthsNorthDiv.appendChild(monthsNorthText);
    itemInfoDescription.appendChild(monthsNorthDiv);

    var monthsSouthDiv = document.createElement('div');
    var monthsSouth = document.createElement('h4');
    var monthsSouthText = document.createElement('p');
    monthsSouth.textContent = 'Months Available For Southern Hemisphere:  ';
    monthsSouthText.textContent = monthsNumToWords(xhr.response.availability['month-southern']);
    monthsSouth.className = 'display-inline-block';
    monthsSouthText.className = 'display-inline-block';
    monthsSouthDiv.appendChild(monthsSouth);
    monthsSouthDiv.appendChild(monthsSouthText);
    itemInfoDescription.appendChild(monthsSouthDiv);

    displayScreen.appendChild(itemInfoDescription);
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
        imgHolder.setAttribute('fileName', xhr.response[key]['file-name']);
        imgHolder.className = 'height-100';
        var itemBackground = document.createElement('div');
        itemBackground.setAttribute('fileName', xhr.response[key]['file-name']);
        itemBackground.className = 'item-background';
        itemBackground.appendChild(imgHolder);
        gridStart.appendChild(itemBackground);

        itemBackground.addEventListener('click', itemViewListener);
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

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

function monthsNumToWords(string) {
  var newString = '';
  var storedString = '';
  for (var i = 0; i <= string.length; i++) {
    if (string[i] !== '-') {
      storedString += string[i];
    }
    if (string[i] === '-' || i === string.length) {
      newString += months[parseInt(storedString, 10) - 1];
      storedString = '';
      if (string[i] === '-') {
        newString += ' to ';
      }
    }
  }
  return newString;
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
