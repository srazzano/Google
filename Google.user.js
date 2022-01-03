// ==UserScript==
// @name         Google Wallpaper
// @namespace    srazzano
// @version      1.0.1
// @description  Wallpaper Themes
// @author       Sonny Razzano a.k.a. srazzano
// @match        https://*.google.com*
// @icon         https://raw.githubusercontent.com/srazzano/Images/master/googleicon64.png
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {

  'use strict';

  const wallpaperDefault = 1, // 1 - 24 or 0 for no wallpaper
        themerInterval = 30000, // Frequency to check for hour change in milliseconds
        changeThemeText = 'Change theme hourly:', // Input text in Settings Popup
        repositionLogoText = 'Reposition logo:', // Input text in Settings Popup
        headerLinksInNewTabText = 'Header links in new tab:', // Option to opens header links in new tab
        changeThemeTooltip = 'Active wallpaper image', // Current wallpaper image number
        offText = 'Off', // Status text for changeTheme
        onText = 'On', // Status text for changeTheme
        downText = 'Down', // Down text for positionLogo
        upText = 'Up', // Up text for positionLogo
        googleImage = 'https://raw.githubusercontent.com/srazzano/Images/master/googleImage.png', // GitHub site
        //googleImage = 'https://sonco.synthasite.com/resources/googleImage.png', // Yola site
        wallpaper = 'https://raw.githubusercontent.com/srazzano/Images/master/image', // GitHub site
        //wallpaper = 'https://sonco.synthasite.com/resources/image', // Yola site
        lightbulbOffImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACBElEQVR42pWSO4haURCGx/WFiK9ljaAoIqikWAvN2gWsIoJVQNKlSiOGNLbGJttY2Qg2qSXRJhhBggiCacIGsUpiI+ILRRMf+EK9MTMHNyx37y7JD8N53Pm/M2fuEQFPhUJBjMMzjBcYF8ftK4y3GO+DwSB3M1/EMz88HA7fHA4HyOVyEIvFgGuQSqXQ6/UoONw7R8j3WwA0n3Ic99PtdsN4PAac/wXsdjuwWq3Q6XSg2+2uJBKJGSG/+ICUXq+PYECj0QCFQsGCzKvVis11Oh1ks9me1+v9gICXfMAITzmbz+fsJLVazUzb7RaWyyWs12twuVxQrVbBbDaPEaAXBLTbbVa6xWJhdyfR/VutFng8HiiVSmC32wUBKWxcZDKZwGKxYBUolUrY7/dAe9QTg8EAxWLxh9/vLwtd4RSTR5vN5oQMODIAGUlUjUqlAplMtsG56VYTSclk8pHNZruaTqcwm81YA+mX0rU0Gg0B97lc7mkmk/ko+A5IRqPxQSwWG+IIg8EATCYTq6ZcLn/J5/OvMOVrv9//fSeAFAqFUtFoNFKr1ajjMBwOIR6PP8dP79C8u/MlXisQCDxBwKd6vQ5OpxOazSYkEonHaP7MzxUEYPnadDo9oV6QtFothMNhHQKm/wQgVSqVw821z+cTzL0XgKbXx/mb/wagYmQ8nk6gS6GkP1++/BEOSJ94AAAAAElFTkSuQmCC',
        lightbulbOnImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACH0lEQVR42pWSS2gTURSG/+nEpCE2qWkTQaK0iosRKUSNuinMQmoXUkQFN0UEJYgRl26sgq+NbhSjYhERdKELUapQFZWgXdhWLYI6iNjaGotttHk0TdI2k/hPZ4QyGYseOHMf/znfvefOEWCyj10QOeym76eHjO1++jX6nTVtUOfHC6ZkSQuW1re7UNsI2Fy6UJwCUkNQ3tya0qCEKBUAJns5DEnyGTdsrzgtAFVOXSzl+akmaDOU2NEMF42ETJgBUWldawSeIDBzmaf7ATWgi2KcyeOA/SCQHoDy9tElAg6ZAQmp+WQ9hIdIf+uDp66W6gpdLI8g/SsFz/KNnG+D8vL4TwJ8lQB5bz2yd4FZD1Cznbc2SiiwhMn7wKI0sHgny7hhCYhKa32RTCGB0S/AylW8cY13TpuZnMAg95Zxz13tg/I+YVmCd3paTAQa1Kr4Z2A8xYSlujY6BvhZUWA1EP8qlhwO1VfxiJqdPVK3YeumZH9ZLSHH2yazwHdXJ4L2MJxLgFzBXuy4aNvxpCf3wLIPDPN3nxfHmppUZAgQBBFOh4oTV5y91+/lD1N/rf3YhQBo34LozQttkXe9XegrdqLFG0bDLuyhdJs++9dO/GOtIbR0Xw0+fvZ8AINullAKI3QAzZR6zLGWAK3tzu1DXhkGsmzIFx/w9Edy7tU//SsAsVisPH8ty7Jl7IIAJh0z5qf+G0Dr0BKN0zXQaaug31A0whEts3O7AAAAAElFTkSuQmCC',
        arrowDnImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgklEQVR42mNkoBAwYhNcP4nhPzbxwDxM9TgNCAgRQBHbsObDqAH4DLi2ieEzsuDNBww82AxQV2D4giym5cfACzcRZIimiQAPAxHg+pkPX0CaMbxAjCHImrGGAT5D0DXjDERshmDTjNMAdENwacZrAMwQWGjjUkPIgFCoAavJMoAYAADlt1MR93xgYAAAAABJRU5ErkJggg==',
        arrowUpImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfUlEQVR42mNkoBAw4pO8tokhFERr+TGsJteAz1ADeEk2AKRZ00SAB8S+fubDF1yGMBLSDAO4DGEkRjM+QxiJ1YzLEEZSNGMzhBE5tGHg5gMGnoAQARRNG9Z8YFBXYPiCLAYyBGsgrp/E8B+bAYF5mGE2agAeA7CJE20AKQAAGplTEco2iXoAAAAASUVORK5CYII=',
        thumbDnImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABOklEQVR42qWSPS9DURyHfzdRYiAxSEgkEqPYDPUFDMIktm5dfAir1WY2dUKUUAOJt4TUQGJE4mURkWhrQUh6+5yee5vT0qM4yZP8z73n95zXQFG7lVKdUkYNrQ0epMMrKTdj/5fgLf4fxEVBCj/kb31S+lFacvqjgW/2bwRrCKad/mJV8Mzsnz+lbeAUQdLpH1cFTwjKfxW0uvymglaX31TAnYTv/xGw9rkJad588K2kA3qkPIIxR3BkDnEAJmHcfEtJ/QvSkBvehk3pNctjotyHYRiBCyNoh95I1MUMu254VipvSJeUeTiAc0hAN5QCd/AL5xG/UTMibcNnlOuwBzdQdHdbE7jX2RBetjswQ/TltdcE9wzioKZ+E64TsPcwYfdcWJWuKVdgyxeuE0SnyiVoEE5gB+58YdMq/yRpKnkXKjAAAAAASUVORK5CYII=',
        thumbUpImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABUklEQVR42mNkIAx4gNgaiFOA2BSInwNxFxCvB0kyEqHZFoizgNiR1U+K6/d8U0aG3/8YGCQ2MxIyAKY5G4gdGPwkuRnmmzGANJscefPqTMhxcXwG4NQMAhHz7k9fUXUlC5sBXECsCMSWQBwGxFbomhk4mRkY+DfA9TFCFUoC8Ssg/gHEniD/ArEcUDMbwywTVCskNpcDybdAfBGIb4AMOA/ECkD8GIivArENs6+kzN9AGQYGLwlU52Wc/fNtw7PvQOYnID4IxBNABnxgeOHLj2TDF4b3ATwMP//iDl5WJjBlUXd1DyPYtBe+vEgGfAXyuYlIHwwMHMwMlBkAdAlFBoCik3wDmIBaxTYxkm8AKCCFN4INuATUoItkwDMgX4oY54NSI8iAaKCGJUgGzAfyE/HqZgPaLrQRa2YSAmI5m3yV1neWItbXXMT5Gf78w2k7iA0AMrx37irbwRgAAAAASUVORK5CYII=',
        li1 = $c('li', {role: 'none'}),
        div2 = $c('div', {id: 'divThemer', className: 'EzVRq tFYjZe', onclick: () => setStatus()}),
        input1 = $c('input', {id: 'buttonThemer', className: 'input', type: 'button'}),
        input2 = $c('input', {id: 'buttonImage', className: 'input', type: 'image'}),
        li2 = $c('li', {role: 'none'}),
        div3 = $c('div', {id: 'divPosition', className: 'EzVRq tFYjZe', onclick: () => setLogo()}),
        input3 = $c('input', {id: 'positionLogo', className: 'input', type: 'button'}),
        input4 = $c('input', {id: 'positionImage', className: 'input', type: 'image'}),
        li3 = $c('li', {role: 'none'}),
        div4 = $c('div', {id: 'divInNewTab', className: 'EzVRq tFYjZe', onclick: () => setLinks()}),
        input5 = $c('input', {id: 'linkInNewTab', className: 'input', type: 'button'}),
        input6 = $c('input', {id: 'linkImage', className: 'input', type: 'image'});

  var timer;

  function $c(type, props) {
    let node = document.createElement(type);
    if (props && typeof props == 'object') {
      for (let prop in props) {
        typeof node[prop] == 'undefined' ? node.setAttribute(prop, props[prop]) : node[prop] = props[prop];
    } }
    return node;
  }

  function $q(el, all) {
    if (all) return document.querySelectorAll(el);
    return document.querySelector(el);
  }

  function initialize() {
    let signIn = $q('.gb_3.gb_4.gb_3d.gb_3c'),
        gBtns = $q('.L3eUgb a', true),
        div0 = $q('.gb_Qd.gb_Sa.gb_Ed'),
        set = $q('.ayzqOc'),
        div1 = $q('.o3j99.LLD4me.LS8OJ'),
        btn = $q('.o3j99.c93Gbe'),
        pop = $q('#dEjpnf');
    if (signIn) signIn.click();
    div0.insertBefore(set, div0.firstChild);
    div1.appendChild(btn);
    div2.appendChild(input1);
    div2.appendChild(input2);
    li1.appendChild(div2);
    div3.appendChild(input3);
    div3.appendChild(input4);
    li2.appendChild(div3);
    div4.appendChild(input5);
    div4.appendChild(input6);
    li3.appendChild(div4);
    pop.appendChild(li1);
    pop.appendChild(li2);
    pop.appendChild(li3);
    getLinks();
    moveLogo();
    setTimer();
  }

  function getLinks() {
    let gBtns = $q('.L3eUgb a', true);
    if (GM_getValue('headerButtonsInNewTab')) {
      for (let i = 0; i < gBtns.length; i++) gBtns[i].setAttribute('target', '_blank');
      input5.value = headerLinksInNewTabText + '  ' + onText;
      input6.src = thumbUpImage;
    } else {
      for (let i = 0; i < gBtns.length; i++) gBtns[i].setAttribute('target', '_top');
      input5.value = headerLinksInNewTabText + '  ' + offText;
      input6.src = thumbDnImage
  } }

  function moveLogo() {
    if (GM_getValue('repositionLogo')) {
      input3.value = repositionLogoText + ' ' + downText;
      input4.src = arrowDnImage;
      GM_addStyle('.o3j99.LLD4me.LS8OJ {height: 145px !important;}');
    } else {
      input3.value = repositionLogoText + ' ' + upText;
      input4.src = arrowUpImage;
      GM_addStyle('.o3j99.LLD4me.LS8OJ {height: calc(100% - 560px) !important;}');
  } }

  function setBackground() {
    let now = new Date(),
        hour = now.getHours(),
        body = $q('body');
    if (GM_getValue('themeChanger')) {
      if (hour === 0) hour = 24;
      else hour = hour;
      GM_setValue('themeNumber', hour);
      body.style.background = 'url('+ wallpaper + hour +'.jpg) no-repeat center center / cover';
      div2.title = changeThemeTooltip + hour;
      input1.value = changeThemeText + ' ' + onText;
      input2.src = lightbulbOnImage
    } else {
      GM_setValue('themeNumber', wallpaperDefault);
      if (wallpaperDefault === 0) body.style.background = 'initial';
      else body.style.background = 'url('+ wallpaper + wallpaperDefault +'.jpg) no-repeat center center / cover';
      div2.title = changeThemeTooltip + wallpaperDefault;
      input1.value = changeThemeText + ' ' + offText;
      input2.src = lightbulbOffImage
  } }

  function setLinks() {
    let bool = GM_getValue('headerButtonsInNewTab') !== true ? true : false;
    GM_setValue('headerButtonsInNewTab', bool);
    getLinks();
  }

  function setLogo() {
    let bool = GM_getValue('repositionLogo') !== true ? true : false;
    GM_setValue('repositionLogo', bool);
    moveLogo();
  }

  function setStatus() {
    let bool = GM_getValue('themeChanger') !== true ? true : false;
    GM_setValue('themeChanger', bool);
    setTimer();
  }

  function setTimer() {
    if (GM_getValue('themeChanger')) timer = setInterval(() => setBackground(), themerInterval);
    else clearInterval(timer);
    setBackground();
  }

  if (!GM_getValue('headerButtonsInNewTab')) GM_setValue('headerButtonsInNewTab', false);
  if (!GM_getValue('repositionLogo')) GM_setValue('repositionLogo', false);
  if (!GM_getValue('themeChanger')) GM_setValue('themeChanger', false);
  if (!GM_getValue('themeNumber')) GM_setValue('themeNumber', wallpaperDefault);

  initialize();

  window.addEventListener('unload', () => clearInterval(timer));

  GM_addStyle(''+
    '#gbqfbb,'+
    '.KxwPGc.AghGtd,'+
    '.KxwPGc.ssOUyb,'+
    '.KxwPGc.iTjxkf > a {'+
    '  display: none !important;'+
    '}'+
    '#gb,'+
    '.o3j99.c93Gbe {'+
    '  background: transparent !important;'+
    '}'+
    '.MV3Tnb {'+
    '  border: 1px solid #999 !important;'+
    '  border-radius: 6px !important;'+
    '  color: #CCC !important;'+
    '  padding: 10px 16px 8px 16px !important;'+
    '  margin-top: -2px !important;'+
    '  text-decoration: none !important;'+
    '}'+
    '.ayzqOc {'+
    '  top: -1px !important;'+
    '}'+
    '#Mses6b {'+
    '  border: 1px solid #999 !important;'+
    '  border-radius: 6px !important;'+
    '  color: #CCC !important;'+
    '  height: 36px !important;'+
    '  padding: 0 16px !important;'+
    '}'+
    '.gb_h > a.gb_f {'+
    '  border: 1px solid #999 !important;'+
    '  border-radius: 6px !important;'+
    '  color: #CCC !important;'+
    '  padding: 6px 16px 4px 16px !important;'+
    '  margin-top: -2px !important;'+
    '  text-decoration: none !important;'+
    '}'+
    '.QCzoEc,'+
    '.gb_Pe:hover {'+
    '  color: #FFF !important;'+
    '}'+
    '#dEjpnf {'+
    '  bottom: auto !important;'+
    '  top: 36px !important;'+
    '  width: 240px !important;'+
    '  z-index: 9 !important;'+
    '}'+
    '.NKcBbd {'+
    '  padding: 6px !important;'+
    '  text-decoration: none !important;'+
    '}'+
    '.EzVRq {'+
    '  color: #999 !important;'+
    '  padding: 12px 16px !important;'+
    '  text-decoration: none !important;'+
    '}'+
    '#buttonThemer.EzVRq {'+
    '  margin-top: -5px !important;'+
    '}'+
    '.gb_C {'+
    '  border-radius: 50% !important;'+
    '  margin-right: 4px !important;'+
    '}'+
    '.gb_C,'+
    '.NKcBbd,'+
    '.EzVRq {'+
    '  border: 1px solid transparent !important;'+
    '}'+
    '.gb_C:hover,'+
    '.NKcBbd:hover,'+
    '.EzVRq:hover {'+
    '  background-color: #111 !important;'+
    '  border: 1px solid #999 !important;'+
    '  color: #FFF !important;'+
    '}'+
    '#divThemer,'+
    '#divPosition,'+
    '#divInNewTab {'+
    '  cursor: pointer !important;'+
    '}'+
    '#buttonThemer,'+
    '#positionLogo,'+
    '#linkInNewTab {'+
    '  background: none !important;'+
    '  border: none !important;'+
    '  color: #999 !important;'+
    '  cursor: pointer !important;'+
    '  margin: 0 8px 0 -6px !important;'+
    '}'+
    '#buttonImage,'+
    '#positionImage,'+
    '#linkImage {'+
    '  cursor: pointer !important;'+
    '  height: 16px !important;'+
    '  left: -2px !important;'+
    '  opacity: 0 !important;'+
    '  width: 16px !important;'+
    '}'+
    '.gb_B:hover svg,'+
    '#divThemer:hover > #buttonThemer,'+
    '#divPosition:hover > #positionLogo,'+
    '#divInNewTab:hover > #linkInNewTab {'+
    '  color: #FFF !important;'+
    '}'+
    '#divThemer:hover > #buttonImage,'+
    '#divPosition:hover > #positionImage,'+
    '#divInNewTab:hover > #linkImage {'+
    '  opacity: 1 !important;'+
    '}'+
    '.k1zIA.rSk4se {'+
    '  max-height: 140px !important;'+
    '}'+
    '#hplogo,'+
    '.k1zIA.rSk4se > .lnXdpd {'+
    '  background: url('+ googleImage +') no-repeat !important;'+
    '  border-radius: 20px !important;'+
    '  height: 140px !important;'+
    '  max-height: 140px !important;'+
    '  max-width: 0 !important;'+
    '  min-height: 140px !important;'+
    '  min-width: 0 !important;'+
    '  padding-left: 436px !important;'+
    '  width: 0 !important;'+
    '}'+
    '.MV3Tnb,'+
    '#Mses6b,'+
    '.gb_h > a.gb_f,'+
    '.RNNXgb,'+
    '.FPdoLc.lJ9FBc input {'+
    '  background-color: rgba(24, 26, 27, .01) !important;'+
    '}'+
    '.MV3Tnb,'+
    '.gb_h > a.gb_f,'+
    '.FPdoLc.lJ9FBc input {'+
    '  border-radius: 6px !important;'+
    '}'+
    '.MV3Tnb:hover,'+
    '#Mses6b:hover,'+
    '.gb_h > a.gb_f:hover,'+
    '.RNNXgb:hover,'+
    '.FPdoLc.lJ9FBc input:hover {'+
    '  background-color: rgb(24, 26, 27) !important;'+
    '  color: #FFF !important;'+
    '}'+
    '.SuUcIb {'+
    '  background: transparent !important;'+
    '  border: 1px solid #CCC !important;'+
    '  border-radius: 50% !important;'+
    '  padding: 4px !important;'+
    '}'+
    '.SuUcIb:hover {'+
    '  background: #222 !important;'+
    '}'+
    '.SuUcIb:hover .GVqCqe {'+
    '  opacity: 1 !important;'+
    '}'+
    '#gb > div > div:last-of-type {'+
    '  height: calc(-140px + 100vh) !important;'+
    '}'+
    '#YUIDDb {'+
    '  padding: 8px 16px !important;'+
    '}'+
    '.gNO89b {'+
    '  border: 1px solid #CCC !important;'+
    '}'+
  '');

})();
