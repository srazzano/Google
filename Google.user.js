// ==UserScript==
// @name         Google Wallpaper
// @namespace    srazzano
// @version      1.0.1
// @description  Layout and Theme
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

  const themerInterval = 60000,
        changeThemeText = 'Change theme hourly:',
        defaultBackgroundImage = 1, // 1 - 13
        //googleImage = 'https://raw.githubusercontent.com/srazzano/Images/master/googleImage5.png', // GitHub site
        googleImage = 'https://sonco.synthasite.com/resources/googleImage5.png', // Yola site
        //themerBackgroundImage = 'https://raw.githubusercontent.com/srazzano/Images/master/image', // GitHub site
        themerBackgroundImage = 'https://sonco.synthasite.com/resources/image'; // Yola site

  var changeInterval;

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
      bod.style.background = "url("+ themerBackgroundImage + hour +".jpg) no-repeat center center / cover";
      btn.innerHTML = changeThemeText + '  On';
    } else {
      GM_setValue('themeNumber', defaultBackgroundImage);
      bod.style.background = "url("+ themerBackgroundImage + defaultBackgroundImage +".jpg) no-repeat center center / cover";
      btn.innerHTML = changeThemeText + '  Off';
  } }

  function onClose() {
    clearInterval(changeInterval);
  }

  function onLoad() {
    let signIn = $q('a.gb_3.gb_4.gb_3d.gb_3c'),
        pop = $q('#dEjpnf'),
        li = $c('li', {role: "none"}),
        btn = $c('button', {id: 'buttonThemer', className: 'EzVRq', onclick: () => themeChanger()});
    li.appendChild(btn);
    pop.appendChild(li);
    if (signIn) signIn.click();
    setThemer();
  }

  function setThemer() {
    if (GM_getValue('themeChanger')) changeInterval = setInterval(() => changeBg(), themerInterval);
    else clearInterval(changeInterval);
    changeBg();
  }

  function themeChanger() {
    let bool = GM_getValue('themeChanger') !== true ? true : false;
    GM_setValue('themeChanger', bool);
    setThemer();
  }

  if (!GM_getValue('themeChanger')) GM_setValue('themeChanger', false);
  if (!GM_getValue('themeNumber')) GM_setValue('themeNumber', defaultBackgroundImage);

  window.onload = onLoad();
  window.onunload = onClose();

  GM_addStyle(''+
    '#hplogo {'+
    '  background: url('+ googleImage +') no-repeat !important;'+
    '  height: 140px !important;'+
    '  padding-left: 436px !important;'+
    '  width: 0 !important;'+
    '}'+
    '.o3j99.c93Gbe {'+
    '  background: transparent !important;'+
    '}'+
    '#Mses6b {'+
    '  background: #111 !important;'+
    '  border-radius: 4px !important;'+
    '  color: #FFF !important;'+
    '}'+
    '.EzVRq {'+
    '  color: #FFF !important;'+
    '}'+
  '');

})();
