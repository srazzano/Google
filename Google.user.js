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

  const themerInterval = 30000, // Frequency to check for hour change in milliseconds
        wallpaperDefault = 1, // 1 - 13 or 0 for no wallpaper
        changeThemeText = 'Change theme hourly:', // Label in Settings Popup
        //googleImage = 'https://raw.githubusercontent.com/srazzano/Images/master/googleImage.png', // GitHub site
        googleImage = 'https://sonco.synthasite.com/resources/googleImage.png', // Yola site
        //wallpaper = 'https://raw.githubusercontent.com/srazzano/Images/master/image', // GitHub site
        wallpaper = 'https://sonco.synthasite.com/resources/image', // Yola site
        statusOffImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACE0lEQVR42pWSS4hSYRTHz+QrEV/DmKAoIqi1yIWWu8BVIrgKJHDRqo0Ybdyam1au3AhCtJYZ3YQJEiIItokJcVW5EfGFNk4+8IV6s3M+nIg7d2D6w+E797vn/7vnO/c7Ap4KhYIIl+cYLzEeH7bPMd5jnAUCAe7f+iOe+cF+v/9mt9tBJpOBSCQCfAaJRAK9Xo+Cw72HCPl+DYDmY47jLl0uF4xGI8D8L2C73YLFYoFOpwPdbncpFotNCPnFB6R0Ol0EAxqNBsjlchZkXi6XLNdqtZDNZnsej+cDAl7xARf4lZPZbMa+pFKpmGmz2cBisYDVagVOpxOq1SqYTKYRAnSCgHa7zVo3m83s7CQ6f6vVArfbDaVSCWw2myAghYOLjMdjmM/nrAOFQgG73Q5oj2ai1+uhWCz+8Pl8ZaEjHGPxxXq9vkMGXBmAjCTqRqlUglQqXWNuvDZEUjKZfGS1Ws8nkwlMp1M2QPqldCy1Wk3AXS6Xe5bJZD4K3gOSwWC4F4vFhrjCYDAAo9HIuimXy1/y+fxrLPna7/d/3wggBYPBVDQajdRqNZo4DIdDiMfjL/DVKZq3N97EK/n9/qcI+FSv18HhcECz2YREIvEEzZ/5tYIAbP9uOp1e0SxIGo0GwuHwfQQ0bgUgVSqV/VXu9XrfIPQdAn7+F4CMh/xtKBQ6QcDlrQGoGBkPHfixgyoCFvyiP+nSCSCyiE9MAAAAAElFTkSuQmCC',
        statusOnImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACKElEQVR42pWSS2gTURSG/+nEpCE2qWkSQaK0iosRKUSNuinMQmoFKaKCmyKCEsSISzdWQcWNbhSjYhARdKELUapQFZVgu7CtWgR1ELH1EYtNbPNoXm0zif90UpBJlHrgzD1z/3u+OefOEWCwDz0QueyhH6D7K9tD9Gv0O2s6of55XjAkS9phaX2XDY0tgMmmC8UskByF8vpWVoMSolQBmOzkMirJZ+wwvWRYAOqsuljK81FP0GYokWNpvrQQMmkEhKR1HUE4fMDMZX7dA6heXRSjTI4B5kNAahjKm0eXCDhsBMSltlMuCA+R+j4IR1Mj1RW6WP6G1EQSjuUbGW+H0nfiFwHuaoC8z4XMXWDWATTsYNWVFgpsYeo+sCgFLN7FNm7UBISkte5guhDH2Gdg5SpW3OCc02amJjHCvWXcs9e7obyL12zBOT0txr3Nal30ExBLMmGpro2NAx525F0NRL+IJYtFdVddomZnjzZt2LopMVRWS8ix2kQG+GELw2cOwLoEyBXMxe6Lpp1P+nMPas5BxTy958Xx1lYVaQIEQYTVouLkFevA9Xv5I9RfaT/2XwB0bUHo5oXO4NuBHgwWw2h3BtC8G3sp3abP/nUS563Dj/beq77Hz54PY8TOFkoB+A+ijVK/8WxNgDZ25/Yjr3wFMhzIF+/x9Gdi7tY/LhSASCRSno9lWT7OJUyP/RegkqjFpxm7GE4sGEDr1hIrFWzj0kfPGg/9BuI3xhFLjykHAAAAAElFTkSuQmCC';

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

  function initialize() {
    let signIn = $q('a.gb_3.gb_4.gb_3d.gb_3c'),
        div1 = $q('.o3j99.LLD4me.LS8OJ'),
        btn = $q('.o3j99.c93Gbe'),
        pop = $q('#dEjpnf'),
        li = $c('li', {role: 'none'}),
        div2 = $c('div', {id: 'divThemer', className: 'EzVRq'}),
        input1 = $c('input', {id: 'buttonThemer', type: 'button', onclick: () => setStatus()}),
        input2 = $c('input', {id: 'buttonImage', type: 'image', onclick: () => setStatus()});
    div1.appendChild(btn);
    div2.appendChild(input1);
    div2.appendChild(input2);
    li.appendChild(div2);
    pop.appendChild(li);
    if (signIn) signIn.click();
    setTimer();
  }

  function setBackground() {
    let now = new Date(),
        hour = now.getHours(),
        body = $q('body'),
        input1 = $q('#buttonThemer'),
        input2 = $q('#buttonImage');
    if (GM_getValue('themeChanger')) {
      if (hour > 12) hour = hour - 12;
      else if (hour === 0) hour = 12;
      else hour = hour;
      GM_setValue('themeNumber', hour);
      body.style.background = 'url('+ wallpaper + hour +'.jpg) no-repeat center center / cover';
      input1.value = changeThemeText + ' On';
      input2.src = statusOnImage;
    } else {
      GM_setValue('themeNumber', wallpaperDefault);
      body.style.background = 'url('+ wallpaper + wallpaperDefault +'.jpg) no-repeat center center / cover';
      input1.value = changeThemeText + ' Off';
      input2.src = statusOffImage;
  } }

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

  if (!GM_getValue('themeChanger')) GM_setValue('themeChanger', false);
  if (!GM_getValue('themeNumber')) GM_setValue('themeNumber', wallpaperDefault);

  initialize();

  window.addEventListener('unload', () => clearInterval(timer));

  GM_addStyle(''+
    '.KxwPGc.AghGtd,'+
    '.KxwPGc.ssOUyb,'+
    '.KxwPGc.iTjxkf > a {'+
    '  display: none !important;'+
    '}'+
    '#hplogo {'+
    '  background: url('+ googleImage +') no-repeat !important;'+
    '  border-radius: 20px !important;'+
    '  height: 140px !important;'+
    '  padding-left: 436px !important;'+
    '  width: 0 !important;'+
    '}'+
    '.KxwPGc.iTjxkf {'+
    '  width: 100% !important;'+
    '}'+
    '.ayzqOc {'+
    '  margin: auto !important;'+
    '  top: -20px !important;'+
    '}'+
    '#Mses6b {'+
    '  background: #282828 !important;'+
    '  border: 1px solid #999 !important;'+
    '  border-radius: 4px !important;'+
    '  color: #CCC !important;'+
    '  height: 36px !important;'+
    '  padding: 0 16px !important;'+
    '}'+
    '#Mses6b:hover {'+
    '  color: #FFF !important;'+
    '}'+
    '.EzVRq {'+
    '  color: #999 !important;'+
    '  padding: 6px 16px !important;'+
    '  text-decoration: none !important;'+
    '}'+
    '#buttonThemer.EzVRq {'+
    '  margin-top: -5px !important;'+
    '}'+
    '.EzVRq:hover {'+
    '  background-color: #111 !important;'+
    '  color: #FFF !important;'+
    '}'+
    '#divThemer {'+
    '  margin-top: -8px !important;'+
    '}'+
    '#buttonThemer {'+
    '  background: none !important;'+
    '  border: none !important;'+
    '  color: #999 !important;'+
    '  cursor: pointer !important;'+
    '  margin: 0 8px 0 -6px !important;'+
    '}'+
    '#buttonImage {'+
    '  opacity: 0 !important;'+
    '  position: relative !important;'+
    '  top: 2px !important;'+
    '}'+
    '#divThemer:hover > #buttonThemer {'+
    '  color: #FFF !important;'+
    '}'+
    '#divThemer:hover > #buttonImage {'+
    '  opacity: 1 !important;'+
    '}'+
    '.om7nvf {'+
    '  padding: 0 !important;'+
    '}'+
    '.o3j99.c93Gbe {'+
    '  background: transparent !important;'+
    '}'+
    '.SuUcIb {'+
    '  background-color: #222 !important;'+
    '  border: 1px solid #CCC !important;'+
    '  border-radius: 50% !important;'+
    '  padding: 4px !important;'+
    '}'+
  '');

})();
