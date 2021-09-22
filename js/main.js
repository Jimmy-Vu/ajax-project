var buttonList = document.querySelectorAll('.view-button');
var browseTitle = document.querySelector('.browse-title');
var buttonContainer = document.querySelector('.buttons-container');
var displayHolder = document.querySelector('.display-holder');
var windowWidth = window.innerWidth;

var itemBackground = document.querySelectorAll('.item-background');
var xhr = new XMLHttpRequest();

for (var i = 0; i < buttonList.length; i++) {
  buttonList[i].addEventListener('click', buttonNav);
}

function buttonNav(event) {
  switch (event.target.closest('a').getAttribute('data-view')) {
    case 'marine':
      browseTitle.textContent = 'Marine Life';
      dataPull('fish');
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'bugs':
      browseTitle.textContent = 'Bugs';
      dataPull('bugs');
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'villagers':
      browseTitle.textContent = 'Villagers';
      dataPull('villagers');
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'fossils':
      browseTitle.textContent = 'Fossils';
      dataPull('fossils');
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'home':
      browseTitle.textContent = 'Home';
      for (var i = 0; i < iconList.length; i++) {
        iconList[i].setAttribute('src', '');
      }
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
  }
}

var iconList = document.querySelectorAll('.item-background > img');

function dataPull(string) {
  xhr.open('GET', 'https://acnhapi.com/v1/' + string);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var i = 0;

    while (i < itemBackground.length) {
      for (var key in xhr.response) {
        if (string === 'fossils') {
          iconList[i].setAttribute('src', xhr.response[key].image_uri);
        } else {
          iconList[i].setAttribute('src', xhr.response[key].icon_uri);
        }
        iconList[i].setAttribute('name', xhr.response[key]['file-name']);
        iconList[i].setAttribute('id', xhr.response[key].id);
        iconList[i].style = 'height: 100%;';
        itemBackground[i].appendChild(iconList[i]);
        i++;
      }
    }
  });
  xhr.send();
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
