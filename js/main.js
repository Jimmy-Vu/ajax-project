var buttonList = document.querySelectorAll('.view-button');
var browseTitle = document.querySelector('.browse-title');
var buttonContainer = document.querySelector('.buttons-container');
var displayHolder = document.querySelector('.display-holder');
var windowWidth = window.innerWidth;

for (var i = 0; i < buttonList.length; i++) {
  buttonList[i].addEventListener('click', buttonNav);
}

function buttonNav(event) {
  switch (event.target.closest('a').getAttribute('data-view')) {
    case 'marine':
      browseTitle.textContent = 'Marine Life';
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'bugs':
      browseTitle.textContent = 'Bugs';
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'villagers':
      browseTitle.textContent = 'Villagers';
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'fossils':
      browseTitle.textContent = 'Fossils';
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
    case 'home':
      browseTitle.textContent = 'Home';
      mobileButtonNav(event.target.closest('a').getAttribute('data-view'));
      break;
  }
}

function mobileButtonNav(string) {
  if (windowWidth < 800 && string !== 'home') {
    buttonContainer.className = 'buttons-container hidden';
    displayHolder.className = 'display-holder column';
  } else {
    buttonContainer.className = 'buttons-container';
    displayHolder.className = 'display-holder hidden';
  }
}
