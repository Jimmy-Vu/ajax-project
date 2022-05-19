var buttonList = document.querySelectorAll('.view-button');
var browseTitle = document.querySelector('.browse-title');
var buttonContainer = document.querySelector('.buttons-container');
var displayHolder = document.querySelector('.display-holder');
var displayScreen = document.querySelector('.display-screen');
var homeMessage = document.querySelector('.home-message');
var mainContent = document.querySelector('.main-content');
var searchContainer = document.querySelector('.search-container');
var searchBar = document.querySelector('.search-bar');
var arrowLeftAnchor = document.querySelector('#left-arrow');
var arrowRightAnchor = document.querySelector('#right-arrow');
var windowWidth = window.innerWidth;

for (var i = 0; i < buttonList.length; i++) {
  buttonList[i].addEventListener('click', buttonNav);
}

function buttonNav(event) {
  var itemContainer = document.querySelector('.display-screen-item');
  dataClear();
  searchContainer.reset();
  switch (event.target.closest('a').getAttribute('data-view')) {
    case 'fish':
      homeMessage.className = 'hidden';
      mainContent.className = 'row align-center main-content';
      browseTitle.textContent = 'Fishes';
      data.view = 'fish';
      searchContainer.className = 'search-container';
      if (itemContainer !== null) {
        itemContainer.remove();
        arrowLeftAnchor.className = 'active';
        arrowRightAnchor.className = 'active';
        gridStart.className = 'grid';
      }
      upperLimit = 12;
      lowerLimit = 1;
      dataPull('fish');
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'bugs':
      homeMessage.className = 'hidden';
      mainContent.className = 'row align-center main-content';
      browseTitle.textContent = 'Bugs';
      data.view = 'bugs';
      searchContainer.className = 'search-container';
      if (itemContainer !== null) {
        itemContainer.remove();
        arrowLeftAnchor.className = 'active';
        arrowRightAnchor.className = 'active';
        gridStart.className = 'grid';
      }
      upperLimit = 12;
      lowerLimit = 1;
      dataPull('bugs');
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'villagers':
      homeMessage.className = 'hidden';
      mainContent.className = 'row align-center main-content';
      browseTitle.textContent = 'Villagers';
      data.view = 'villagers';
      searchContainer.className = 'search-container';
      if (itemContainer !== null) {
        itemContainer.remove();
        arrowLeftAnchor.className = 'active';
        arrowRightAnchor.className = 'active';
        gridStart.className = 'grid';
      }
      upperLimit = 12;
      lowerLimit = 1;
      dataPull('villagers');
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'sea':
      homeMessage.className = 'hidden';
      mainContent.className = 'row align-center main-content';
      browseTitle.textContent = 'Sea Life';
      data.view = 'sea';
      searchContainer.className = 'search-container';
      if (itemContainer !== null) {
        itemContainer.remove();
        arrowLeftAnchor.className = 'active';
        arrowRightAnchor.className = 'active';
        gridStart.className = 'grid';
      }
      upperLimit = 12;
      lowerLimit = 1;
      dataPull('sea');
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'home':
      homeMessage.className = 'home-message';
      mainContent.className = 'row align-center main-content hidden';
      browseTitle.textContent = 'Home';
      data.view = 'home';
      searchContainer.className = 'search-container hidden';
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
    let searchTextAdjusted = '';
    for (var key in xhr.response) {
      var imgHolder = document.createElement('img');
      var itemBackground = document.createElement('div');
      if (!(string === 'villagers')) {
        searchTextAdjusted = searchText.toLowerCase();
        if (xhr.response[key]['file-name'].includes(searchTextAdjusted)) {
          if (!(id > upperLimit ||
          id < lowerLimit)) {
            imgHolder.setAttribute('id', id);
            imgHolder.setAttribute('src', xhr.response[key].icon_uri);
            imgHolder.setAttribute('fileName', xhr.response[key]['file-name']);
            imgHolder.className = 'height-100';
            itemBackground.setAttribute('fileName', xhr.response[key]['file-name']);
            itemBackground.className = 'item-background';
            itemBackground.appendChild(imgHolder);
            gridStart.appendChild(itemBackground);
            itemBackground.addEventListener('click', itemViewListener);
            id++;
          }
        }
      } else {
        searchTextAdjusted = searchText[0].toUpperCase() + searchText.slice(1).toLowerCase();
        if (xhr.response[key].name['name-USen'].includes(searchTextAdjusted)) {
          if (!(id > upperLimit ||
            id < lowerLimit)) {
            imgHolder.setAttribute('id', id);
            imgHolder.setAttribute('src', xhr.response[key].icon_uri);
            imgHolder.setAttribute('villagerName', xhr.response[key].name['name-USen']);
            imgHolder.setAttribute('fileName', xhr.response[key]['file-name']);
            imgHolder.className = 'height-100';
            itemBackground.setAttribute('fileName', xhr.response[key]['file-name']);
            itemBackground.className = 'item-background';
            itemBackground.appendChild(imgHolder);
            gridStart.appendChild(itemBackground);

            itemBackground.addEventListener('click', itemViewListener);
            id++;
          }
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
    searchContainer.className = 'search-bar hidden';
    gridStart.className = '';
    arrowLeftAnchor.className = 'hidden';
    arrowRightAnchor.className = 'hidden';

    var itemInfoContainer = document.createElement('div');
    var itemContainer = document.createElement('div');

    if (data.view === 'villagers') {
      var villagerTitle = document.createElement('h2');
      villagerTitle.className = 'item-title';
      villagerTitle.textContent = event.target.getAttribute('villagerName');
      itemInfoContainer.appendChild(villagerTitle);
      itemContainer.className = 'display-screen-item';
      itemContainer.appendChild(itemInfoContainer);

      var villagerInfoImage = document.createElement('img');
      villagerInfoImage.setAttribute('src', xhr.response.image_uri);
      villagerInfoImage.className = 'item-info-image';
      itemContainer.appendChild(villagerInfoImage);

      var villagerInfoDescription = document.createElement('div');

      var personalityDiv = document.createElement('div');
      var personality = document.createElement('h4');
      var personalityText = document.createElement('p');
      personality.textContent = 'Personality:';
      personalityText.textContent = xhr.response.personality;
      personality.className = 'display-inline-block';
      personalityText.className = 'display-inline-block';
      personalityDiv.appendChild(personality);
      personalityDiv.appendChild(personalityText);
      villagerInfoDescription.appendChild(personalityDiv);

      var speciesDiv = document.createElement('div');
      var species = document.createElement('h4');
      var speciesText = document.createElement('p');
      species.textContent = 'Species:';
      speciesText.textContent = xhr.response.species;
      species.className = 'display-inline-block';
      speciesText.className = 'display-inline-block';
      speciesDiv.appendChild(species);
      speciesDiv.appendChild(speciesText);
      villagerInfoDescription.appendChild(speciesDiv);

      var genderDiv = document.createElement('div');
      var gender = document.createElement('h4');
      var genderText = document.createElement('p');
      gender.textContent = 'Gender:';
      genderText.textContent = xhr.response.gender;
      gender.className = 'display-inline-block';
      genderText.className = 'display-inline-block';
      genderDiv.appendChild(gender);
      genderDiv.appendChild(genderText);
      villagerInfoDescription.appendChild(genderDiv);

      var sayingDiv = document.createElement('div');
      var saying = document.createElement('h4');
      var sayingText = document.createElement('p');
      saying.textContent = 'Saying:';
      sayingText.textContent = '"' + xhr.response.saying + '"';
      saying.className = 'display-inline-block';
      sayingText.className = 'display-inline-block';
      sayingDiv.appendChild(saying);
      sayingDiv.appendChild(sayingText);
      villagerInfoDescription.appendChild(sayingDiv);

      itemContainer.appendChild(villagerInfoDescription);
      displayScreen.appendChild(itemContainer);
    } else {
      var itemTitle = document.createElement('h2');
      itemTitle.className = 'item-title';
      itemTitle.textContent = fileNameResult;
      itemInfoContainer.appendChild(itemTitle);
      itemContainer.className = 'display-screen-item';
      itemContainer.appendChild(itemInfoContainer);

      var itemInfoImage = document.createElement('img');
      itemInfoImage.setAttribute('src', xhr.response.icon_uri);
      itemInfoImage.className = 'item-info-image';
      itemContainer.appendChild(itemInfoImage);

      var itemInfoDescription = document.createElement('div');
      itemInfoDescription.className = 'item-description';

      var catchPhraseDiv = document.createElement('div');
      var catchPhrase = document.createElement('h4');
      var catchPhraseText = document.createElement('p');
      catchPhrase.textContent = 'Catch Phrase:';
      catchPhraseText.textContent = '"' + xhr.response['catch-phrase'] + '"';
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
      monthsNorthText.textContent = monthsNumToWords(xhr.response.availability['month-array-northern']);
      monthsNorth.className = 'display-inline-block';
      monthsNorthText.className = 'display-inline-block';
      monthsNorthDiv.appendChild(monthsNorth);
      monthsNorthDiv.appendChild(monthsNorthText);
      itemInfoDescription.appendChild(monthsNorthDiv);

      var monthsSouthDiv = document.createElement('div');
      var monthsSouth = document.createElement('h4');
      var monthsSouthText = document.createElement('p');
      monthsSouth.textContent = 'Months Available For Southern Hemisphere:  ';
      monthsSouthText.textContent = monthsNumToWords(xhr.response.availability['month-array-southern']);
      monthsSouth.className = 'display-inline-block';
      monthsSouthText.className = 'display-inline-block';
      monthsSouthDiv.appendChild(monthsSouth);
      monthsSouthDiv.appendChild(monthsSouthText);
      itemInfoDescription.appendChild(monthsSouthDiv);

      if (xhr.response.availability.time !== '') {
        var timeDiv = document.createElement('div');
        var time = document.createElement('h4');
        var timeText = document.createElement('p');
        time.textContent = 'Time Available:  ';
        timeText.textContent = xhr.response.availability.time;
        time.className = 'display-inline-block';
        timeText.className = 'display-inline-block';
        timeDiv.appendChild(time);
        timeDiv.appendChild(timeText);
        itemInfoDescription.appendChild(timeDiv);
      }
      itemContainer.appendChild(itemInfoDescription);
      displayScreen.appendChild(itemContainer);
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
        if (data.view === 'villagers') {
          imgHolder.setAttribute('villagerName', xhr.response[key].name['name-USen']);
        }
        imgHolder.setAttribute('fileName', xhr.response[key]['file-name']);

        imgHolder.className = 'height-100';
        var itemBackground = document.createElement('a');
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

function monthsNumToWords(array) {
  var newString = '';
  newString += months[array[0] - 1] + ' to ' + months[array[array.length - 1] - 1];
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
