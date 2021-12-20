// ==UserScript==
// @name         Google Wallpaper
// @namespace    srazzano
// @version      1.0.1
// @description  Wallpaper Themes
// @author       Sonny Razzano a.k.a. srazzano
// @match        https://*.google.*
// @include      https://www.google.com*
// @icon         https://raw.githubusercontent.com/srazzano/Images/master/googleicon64.png
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {

  'use strict';

  const themerInterval = 30000,
        wallpaperDefault = 1, // 1 - 13
        changeThemeText = 'Change theme hourly:',
        //googleLogo = 'https://raw.githubusercontent.com/srazzano/Images/master/googleImage.png', // GitHub site
        googleLogo = 'https://sonco.synthasite.com/resources/googleImage.png', // Yola site
        //wallpaper = 'https://raw.githubusercontent.com/srazzano/Images/master/image', // GitHub site
        wallpaper = 'https://sonco.synthasite.com/resources/image'; // Yola site

  var timer;

  function $c(type, props) {
    let node = document.createElement(type);
    if (props && typeof props == 'object') for (let prop in props) typeof node[prop] == 'undefined' ? node.setAttribute(prop, props[prop]) : node[prop] = props[prop];
    return node;
  }

  function $q(el, all) {
    if (all) return document.querySelectorAll(el);
    return document.querySelector(el);
  }

  function changeBg() {
    let now = new Date(),
        hour = now.getHours(),
        bod = $q('body'),
        btn = $q('#buttonThemer');
    if (GM_getValue('themeChanger')) {
      if (hour > 12) hour = hour - 12;
      else if (hour === 0) hour = 12;
      else hour = hour;
      GM_setValue('themeNumber', hour);
      bod.style.background = 'url('+ wallpaper + hour +'.jpg) no-repeat center center / cover';
      btn.innerHTML = changeThemeText + '  On';
    } else {
      GM_setValue('themeNumber', wallpaperDefault);
      bod.style.background = 'url('+ wallpaper + wallpaperDefault +'.jpg) no-repeat center center / cover';
      btn.innerHTML = changeThemeText + '  Off';
  } }

  function initialize() {
    let signIn = $q('a.gb_3.gb_4.gb_3d.gb_3c'),
        pop = $q('#dEjpnf'),
        li = $c('li', {role: 'none'}),
        btn = $c('button', {id: 'buttonThemer', className: 'EzVRq', onclick: () => themeChanger()});
    li.appendChild(btn);
    pop.appendChild(li);
    if (signIn) signIn.click();
    setThemer();
  }

  function onClose() {
    clearInterval(timer);
  }

  function setThemer() {
    if (GM_getValue('themeChanger')) timer = setInterval(() => changeBg(), themerInterval);
    else clearInterval(timer);
    changeBg();
  }

  function themeChanger() {
    let bool = GM_getValue('themeChanger') !== true ? true : false;
    GM_setValue('themeChanger', bool);
    setThemer();
  }

  if (!GM_getValue('themeChanger')) GM_setValue('themeChanger', false);
  if (!GM_getValue('themeNumber')) GM_setValue('themeNumber', wallpaperDefault);

  initialize();

  window.addEventListener('unload', function() {onClose()});

  GM_addStyle(''+
    '#hplogo {'+
    '  background: url('+ googleLogo +') no-repeat !important;'+
    '  height: 140px !important;'+
    '  padding-left: 436px !important;'+
    '  width: 0 !important;'+
    '}'+
    '.o3j99.c93Gbe {'+
    '  background: transparent !important;'+
    '}'+
    '#Mses6b {'+
    '  background: #181A1B !important;'+
    '  border: 1px solid #999 !important;'+
    '  border-radius: 4px !important;'+
    '  color: #999 !important;'+
    '  height: 36px !important;'+
    '  padding: 0 10px !important;'+
    '}'+
    '#Mses6b:hover {'+
    '  color: #FFF !important;'+
    '}'+
    '.EzVRq {'+
    '  color: #999 !important;'+
    '  text-decoration: none !important;'+
    '}'+
    '.EzVRq:hover {'+
    '  background-color: #111 !important;'+
    '  color: #FFF !important;'+
    '}'+
    '.KxwPGc.AghGtd,'+
    '.KxwPGc.ssOUyb,'+
    '.KxwPGc.iTjxkf > a {'+
    '  display: none !important;'+
    '}'+
    '.KxwPGc.iTjxkf {'+
    '  margin-left: 15px !important;'+
    '  position: absolute !important;'+
    '  top: 560px !important;'+
    '  width: 50% !important;'+
    '}'+
  '');

})();
