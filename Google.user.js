// ==UserScript==
// @name         Google
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

  const openInterval = 20,
        themerInterval = 60000,
        timerLong = 10000,
        timerShort = 1000,
        dateTimeFormatCount = 9,
        elementSpacing = '8px',
        am = 'AM',
        pm = 'PM',
        bullet = '•',
        comma = ',',
        hyphen = '-',
        slash = '/',
        space = ' ',
        star = '★',
        changeThemeText = 'Change wallpaper hourly:',
        changeThemeTooltip = 'Active wallpaper image',
        customFormat = 'Add a custom format in script line ',
        defaultWallpaperText = 'Default wallpaper image',
        defaultWallpaperTooltip = '1 - 24 and 0 for no wallpaper',
        linksTextCurrent = 'Search links in current tab',
        linksTextNew = 'Search links in new tab',
        hideShow = bullet + ' Left-click to Hide/Show Date/Time',
        addRemove = bullet + ' Left-click to Add/Remove :seconds\n' + bullet + ' Shift + Left-click to Add/Remove AM/PM\n' + bullet + ' Ctrl + Left-click to change Date format',
        DayNameAbbr = 'Sun.,Mon.,Tue.,Wed.,Thu.,Fri.,Sat.',
        DayName = 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
        MonthNameAbbr = 'Jan.,Feb.,Mar.,Apr.,May,Jun.,Jul.,Aug.,Sep.,Oct.,Nov.,Dec.',
        MonthName = 'January,February,March,April,May,June,July,August,September,October,November,December',
        MonthNum = '1,2,3,4,5,6,7,8,9,10,11,12',
        MonthNo = '01,02,03,04,05,06,07,08,09,10,11,12',
        DayNum = '"",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31',
        DayNo = '"",01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31',
        DayOrd = '"",1ˢᵗ,2ⁿᵈ,3ʳᵈ,4ᵗʰ,5ᵗʰ,6ᵗʰ,7ᵗʰ,8ᵗʰ,9ᵗʰ,10ᵗʰ,11ᵗʰ,12ᵗʰ,13ᵗʰ,14ᵗʰ,15ᵗʰ,16ᵗʰ,17ᵗʰ,18ᵗʰ,19ᵗʰ,20ᵗʰ,21ˢᵗ,22ⁿᵈ,23ʳᵈ,24ᵗʰ,25ᵗʰ,26ᵗʰ,27ᵗʰ,28ᵗʰ,29ᵗʰ,30ᵗʰ,31ˢᵗ',
        daynameabbr = DayNameAbbr.split(','),
        dayname = DayName.split(','),
        monthnameabbr = MonthNameAbbr.split(','),
        monthname = MonthName.split(','),
        monthnum = MonthNum.split(','),
        monthno = MonthNo.split(','),
        daynum = DayNum.split(','),
        dayno = DayNo.split(','),
        dayord = DayOrd.split(','),
        googleImage = 'https://raw.githubusercontent.com/srazzano/Images/master/googleImage.png', // GitHub site
        themerBackgroundImage = 'https://raw.githubusercontent.com/srazzano/Images/master/image', // GitHub site
        //googleImage = 'https://sonco.synthasite.com/resources/googleImage.png', // Yola site
        //themerBackgroundImage = 'https://sonco.synthasite.com/resources/image', // Yola site
        themeOff = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACE0lEQVR42pWSS4hSYRTHz+QrEV/DmKAoIqi1yIWWu8BVIrgKJHDRqo0Ybdyam1au3AhCtJYZ3YQJEiIItokJcVW5EfGFNk4+8IV6s3M+nIg7d2D6w+E797vn/7vnO/c7Ap4KhYIIl+cYLzEeH7bPMd5jnAUCAe7f+iOe+cF+v/9mt9tBJpOBSCQCfAaJRAK9Xo+Cw72HCPl+DYDmY47jLl0uF4xGI8D8L2C73YLFYoFOpwPdbncpFotNCPnFB6R0Ol0EAxqNBsjlchZkXi6XLNdqtZDNZnsej+cDAl7xARf4lZPZbMa+pFKpmGmz2cBisYDVagVOpxOq1SqYTKYRAnSCgHa7zVo3m83s7CQ6f6vVArfbDaVSCWw2myAghYOLjMdjmM/nrAOFQgG73Q5oj2ai1+uhWCz+8Pl8ZaEjHGPxxXq9vkMGXBmAjCTqRqlUglQqXWNuvDZEUjKZfGS1Ws8nkwlMp1M2QPqldCy1Wk3AXS6Xe5bJZD4K3gOSwWC4F4vFhrjCYDAAo9HIuimXy1/y+fxrLPna7/d/3wggBYPBVDQajdRqNZo4DIdDiMfjL/DVKZq3N97EK/n9/qcI+FSv18HhcECz2YREIvEEzZ/5tYIAbP9uOp1e0SxIGo0GwuHwfQQ0bgUgVSqV/VXu9XrfIPQdAn7+F4CMh/xtKBQ6QcDlrQGoGBkPHfixgyoCFvyiP+nSCSCyiE9MAAAAAElFTkSuQmCC',
        themeOn = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACKElEQVR42pWSS2gTURSG/+nEpCE2qWkSQaK0iosRKUSNuinMQmoFKaKCmyKCEsSISzdWQcWNbhSjYhARdKELUapQFZVgu7CtWgR1ELH1EYtNbPNoXm0zif90UpBJlHrgzD1z/3u+OefOEWCwDz0QueyhH6D7K9tD9Gv0O2s6of55XjAkS9phaX2XDY0tgMmmC8UskByF8vpWVoMSolQBmOzkMirJZ+wwvWRYAOqsuljK81FP0GYokWNpvrQQMmkEhKR1HUE4fMDMZX7dA6heXRSjTI4B5kNAahjKm0eXCDhsBMSltlMuCA+R+j4IR1Mj1RW6WP6G1EQSjuUbGW+H0nfiFwHuaoC8z4XMXWDWATTsYNWVFgpsYeo+sCgFLN7FNm7UBISkte5guhDH2Gdg5SpW3OCc02amJjHCvWXcs9e7obyL12zBOT0txr3Nal30ExBLMmGpro2NAx525F0NRL+IJYtFdVddomZnjzZt2LopMVRWS8ix2kQG+GELw2cOwLoEyBXMxe6Lpp1P+nMPas5BxTy958Xx1lYVaQIEQYTVouLkFevA9Xv5I9RfaT/2XwB0bUHo5oXO4NuBHgwWw2h3BtC8G3sp3abP/nUS563Dj/beq77Hz54PY8TOFkoB+A+ijVK/8WxNgDZ25/Yjr3wFMhzIF+/x9Gdi7tY/LhSASCRSno9lWT7OJUyP/RegkqjFpxm7GE4sGEDr1hIrFWzj0kfPGg/9BuI3xhFLjykHAAAAAElFTkSuQmCC',
        imgClock = 'data:image/png;base64,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';

  var signIn = $q('a.gb_3.gb_4.gb_3d.gb_3c'),
      div0 = $q('body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ'),
      div1 = $q('body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd'),
      div2 = $q('body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf > div'),
      btns = $q('body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf > div'),
      form = $q('body > div.L3eUgb form'),
      pop = $q('#dEjpnf'),
      searchButton = $q('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b'),
      settingsButton = $q('#Mses6b'),
      btnClock = $c('button', {id: 'gClock', style: 'background-image: url('+ imgClock +')', title: hideShow, onmousedown: e => dateTimeToggle(e)}),
      dateTimeContainer = $c('div', {id: 'dateTimeContainer'}),
      dateTime = $c('span', {id: 'dateTime', className: 'gBtn', onmousedown: e => dateTimeSecondsAmPmFormat(e)}),
      img = $c('img', {id: 'googImg'}),
      div3 = $c('div', {id: 'divThemer'}),
      div4 = $c('div', {id: 'divNumber'}),
      div5 = $c('div', {id: 'divLinks'}),
      li = $c('li', {role: "none"}),
      btn = $c('button', {id: 'buttonThemer', onclick: () => wallpaperChanger()}),
      ti = $c('img', {id: 'themeImage'}),
      li2 = $c('li', {role: "none"}),
      button = $c('button', {id: 'themerNumber'}),
      input = $c('input', {id: 'themerNum', type: 'number', min: 0, max: 24, oninput: e => wallpaperDefaultChanger(e)}),
      li3 = $c('li', {role: "none"}),
      button2 = $c('button', {id: 'searchLinks', onclick: () => where()}),
      clockInterval,
      initInterval,
      wallpaperInterval;

  function $c(type, props) {
    let node = document.createElement(type);
    if (props && typeof props == 'object') for (let prop in props) typeof node[prop] == 'undefined' ? node.setAttribute(prop, props[prop]) : node[prop] = props[prop];
    return node;
  }

  function $q(el, all) {
    if (all) return document.querySelectorAll(el);
    return document.querySelector(el);
  }

  function dateTimeFormat(int) {
    if (!GM_getValue('defaultDateTimeView')) return;
    let date = new Date(),
        dy = date.getDay(),
        mth = date.getMonth(),
        dt = date.getDate(),
        yr = date.getFullYear(),
        hr = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds(),
        w = daynameabbr[dy],
        ww = dayname[dy],
        m = monthnum[mth],
        mm = monthno[mth],
        mmm = monthnameabbr[mth],
        mmmm = monthname[mth],
        d = daynum[dt],
        dd = dayno[dt],
        ddd = dayord[dt],
        yy = yr - 2000,
        yyyy = yr,
        hr12, hr24, ampm;
    if (hr > 12) {hr12 = hr - 12; hr24 = hr}
    else {hr12 = hr; hr24 = hr}
    if (hr < 10) {hr12 = hr; hr24 = '0' + hr}
    if (hr === 0) {hr12 = 12; hr24 = '00'}
    min < 10 ? min = ':0' + min : min = ':' + min;
    if (GM_getValue('defaultSecondsView')) sec < 10 ? sec = ':0' + sec : sec = ':' + sec;
    else sec = '';
    if (GM_getValue('defaultAMPM')) hr < 12 ? ampm = am : ampm = pm;
    else ampm = '';
    switch (int) {
      // RETURN OPTIONS: (w / ww) + (m / mm / mmm / mmmm) + (d / dd / ddd) +  (yy / yyyy) + (hr12 / hr24) + (min) + (sec) + (ampm) special characters: bullet, comma, hyphen, slash, space, star
      case 1: return ww + space + bullet + space + mmmm + space + ddd + comma + space + yyyy + space + star + space + hr12 + min + sec + space + ampm; // Sunday • March 1ˢᵗ, 2021 ★ 12:34 AM
      case 2: return w + space + bullet + space + mmm + space + d + comma + space + yyyy + space + bullet + space + hr12 + min + sec + space + ampm; // Sun. • Mar. 1, 2021 • 12:34 AM
      case 3: return w + space + bullet + space + mmm + space + dd + comma + space + yyyy + space + bullet + space + hr12 + min + sec + space + ampm; // Sun. • Mar. 01, 2021 • 12:34 AM
      case 4: return w + space + bullet + space + m + hyphen + d + hyphen + yyyy + space + bullet + space + hr12 + min + sec + space + ampm; // Sun. • 3-1-2021 • 12:34 AM
      case 5: return w + space + bullet + space + mm + hyphen + dd + hyphen + yyyy + space + bullet + space + hr12 + min + sec + space + ampm; // Sun. • 03-01-2021 • 12:34 AM
      case 6: return w + space + bullet + space + m + slash + d + slash + yyyy + space + bullet + space + hr12 + min + sec + space + ampm; // Sun. • 3/1/2021 • 12:34 AM
      case 7: return w + space + bullet + space + mm + slash + dd + slash + yyyy + space + bullet + space + hr12 + min + sec + space + ampm; // Sun. • 03/01/2021 • 12:34 AM
      // Delete "customFormat + 210/customFormat + 211" text below and add return options with bullet, comma, hyphen, slash, space, star characters.
      case 8: return customFormat + 143;
      case 9: return customFormat + 144;
  } }

  function dateTimeDefault() {
    dateTime.hidden = false;
    dateTime.textContent = dateTimeFormat(GM_getValue('dateFormat'));
    dateTime.title = addRemove + ' (' + GM_getValue('dateFormat') + ')';
    dateTimeTimer();
  }

  function dateTimeTimer() {
    clearInterval(clockInterval);
    if (!GM_getValue('defaultDateTimeView')) return;
    if (GM_getValue('defaultSecondsView')) clockInterval = setInterval(function() {dateTime.textContent = dateTimeFormat(GM_getValue('dateFormat'))}, timerShort);
    else clockInterval = setInterval(function() {dateTime.textContent = dateTimeFormat(GM_getValue('dateFormat'))}, timerLong);
  }

  function dateTimeToggle(e) {
    let bool;
    if (!e.shiftKey && !e.ctrlKey && !e.altKey && e.button === 0) {
      bool = dateTime.hidden !== true ? true : false;
      dateTime.hidden = bool;
      GM_setValue('defaultDateTimeView', !bool);
      if (bool) clearInterval(clockInterval);
      else {dateTime.textContent = dateTimeFormat(GM_getValue('dateFormat')); dateTimeTimer()}
  } }

  function dateTimeSecondsAmPmFormat(e) {
    if (!e.button === 0) return;
    let bool1, bool2, int;
    e.preventDefault();
    if (!e.shiftKey && !e.ctrlKey && !e.altKey && e.button === 0) {
      bool1 = GM_getValue('defaultSecondsView') !== true ? true : false;
      GM_setValue('defaultSecondsView', bool1);
      dateTimeTimer();
    } else if (e.shiftKey && !e.ctrlKey && !e.altKey && e.button === 0) {
      bool2 = GM_getValue('defaultAMPM') !== true ? true : false;
      GM_setValue('defaultAMPM', bool2);
    } else if (!e.shiftKey && e.ctrlKey && !e.altKey && e.button === 0) {
      int = GM_getValue('dateFormat') + 1;
      int < dateTimeFormatCount + 1 ? GM_setValue('dateFormat', int) : GM_setValue('dateFormat', 1);
      dateTime.title = addRemove + ' (' + GM_getValue('dateFormat') + ')';
    }
    dateTime.textContent = dateTimeFormat(GM_getValue('dateFormat'));
  }

  function onClose() {
    clearInterval(wallpaperInterval);
    clearInterval(clockInterval);
  }

  function searchPopupLinks() {
    let links = $q('#dEjpnf > li > a', true);
    for (let i = 0; i < links.length; i++) links[i].setAttribute('target', GM_getValue('linksWhere'));
  }

  function wallpaper() {
    let body = $q('body'),
        now = new Date(),
        hour = now.getHours(),
        btn = $q('#buttonThemer'),
        ti = $q('#themeImage');
    if (GM_getValue('themeChanger')) {
      if (hour === 0) hour = 24;
      else hour = hour;
      GM_setValue('wallpaperImage', hour);
      body.style.background = "url("+ themerBackgroundImage + hour +".jpg) no-repeat center center / cover";
      btn.innerHTML = changeThemeText + '  On';
      btn.title = changeThemeTooltip + hour;
      ti.src = themeOn;
    } else {
      if (GM_getValue('wallpaperDefaultImage') === 0) body.style.background = 'initial';
      else body.style.background = 'url('+ themerBackgroundImage + GM_getValue('wallpaperDefaultImage') +'.jpg) no-repeat center center / cover';
      btn.innerHTML = changeThemeText + '  Off';
      btn.title = changeThemeTooltip + GM_getValue('wallpaperDefaultImage');
      ti.src = themeOff;
  } }

  function wallpaperChanger() {
    let bool = GM_getValue('themeChanger') !== true ? true : false;
    GM_setValue('themeChanger', bool);
    wallpaperTimer();
  }

  function wallpaperDefaultChanger(e) {
    let inp = e.target.value;
    GM_setValue('wallpaperDefaultImage', parseInt(inp));
    wallpaper();
  }

  function wallpaperTimer() {
    if (GM_getValue('themeChanger')) wallpaperInterval = setInterval(() => wallpaper(), themerInterval);
    else clearInterval(wallpaperInterval);
    wallpaper();
  }

  function where() {
    let bool = GM_getValue('linksWhere') !== '_blank' ? '_blank' : '_self';
    GM_setValue('linksWhere', bool);
    if (bool === '_self') button2.textContent = linksTextCurrent;
    else button2.textContent = linksTextNew;
    searchPopupLinks();
  }

  if (!GM_getValue('dateFormat')) GM_setValue('dateFormat', 1);
  if (!GM_getValue('defaultAMPM')) GM_setValue('defaultAMPM', false);
  if (!GM_getValue('defaultDateTimeView')) GM_setValue('defaultDateTimeView', false);
  if (!GM_getValue('defaultSecondsView')) GM_setValue('defaultSecondsView', false);
  if (!GM_getValue('linksWhere')) GM_setValue('linksWhere', '_self');
  if (!GM_getValue('themeChanger')) GM_setValue('themeChanger', false);
  if (!GM_getValue('wallpaperDefaultImage')) GM_setValue('wallpaperDefaultImage', 0);
  if (!GM_getValue('wallpaperImage')) GM_setValue('wallpaperImage', 0);

  searchButton.id = 'gSearch';

  div2.insertBefore(searchButton, div2.firstChild);

  initInterval = setInterval(() => {
    try {
      if (signIn) signIn.click();
      if (GM_getValue('defaultDateTimeView')) dateTimeDefault();
      else {dateTime.hidden = true; clearInterval(clockInterval)}
      dateTime.title = addRemove + ' (' + GM_getValue('dateFormat') + ')';
      div0.insertBefore(img, div0.firstChild.nextSibling);
      div0.insertBefore(form, div0.lastChild);
      div0.appendChild(btns);
      dateTimeContainer.appendChild(btnClock);
      dateTimeContainer.appendChild(dateTime);
      div1.appendChild(dateTimeContainer);
      if (GM_getValue('themeChanger')) {
        btn.textContent = 'Change theme hourly:  On';
        ti.src = themeOn;
      } else {
        btn.textContent = 'Change theme hourly:  Off';
        ti.src = themeOff;
      }
      button.textContent = defaultWallpaperText;
      button.title = defaultWallpaperTooltip;
      input.value = GM_getValue('wallpaperDefaultImage');
      div3.appendChild(btn);
      div3.appendChild(ti);
      li.appendChild(div3);
      div4.appendChild(button);
      div4.appendChild(input);
      li2.appendChild(div4);
      div5.appendChild(button2);
      li3.appendChild(div5);
      button2.textContent = GM_getValue('linksWhere') === '_self' ? linksTextCurrent : linksTextNew;
      pop.appendChild(li);
      pop.appendChild(li2);
      pop.appendChild(li3);
      settingsButton.onclick = () => searchPopupLinks();
      wallpaperTimer();
      if (dateTimeContainer) clearInterval(initInterval);
    } catch(ex) {}
  }, openInterval);

  wallpaperInterval = setInterval(() => wallpaper(), themerInterval)

  window.onunload = () => onClose();

  GM_addStyle(''+
    'body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img.lnXdpd {'+
    '  display: none !important;'+
    '}'+
    '#hplogo, #hpcta, #hpcanvas, #hplogocta, div.ddlsv-cta_, a.MV3Tnb, #gb > div > div:nth-child(1) > div, #gbqfbb, body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.ssOUyb, body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.AghGtd, body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf > a, body > div.L3eUgb > div.o3j99.qarstb > div, body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div > div.SuUcIb, body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div > div:nth-child(2), #yDmH0d, #gb > div > div.gb_0a.gb_E.gb_k.gb_1a.gb_la > div.gb_Qf.gb_sb {'+
    '  display: none !important;'+
    '}'+
    '#clockImage {'+
    '  display: inline-block !important;'+
    '  height: 16px !important;'+
    '  margin: 0 9px 0 16px !important;'+
    '  opacity: 0 !important;'+
    '  position: relative !important;'+
    '  top: 2px !important;'+
    '  width: 16px !important;'+
    '}'+
    '#viewClock {'+
    '  color: #999 !important;'+
    '  cursor: pointer !important;'+
    '  margin-left: 15px !important;'+
    '  margin-top: 16px !important;'+
    '}'+
    '#viewClock:hover + #clockImage {'+
    '  opacity: 1 !important;'+
    '}'+
    '#dateTimeContainer {'+
    '  margin: -16px 0 0 0 !important;'+
    '}'+
    '#dateTimeContainer:hover > #gClock {'+
    '  filter: none !important;'+
    '  opacity: .7 !important;'+
    '}'+
    '#dateTimeContainer:hover > #gClock:hover {'+
    '  opacity: 1 !important;'+
    '}'+
    '#dateTimeContainer > #dateTime {'+
    '  border-radius: 4px !important;'+
    '  color: #AAA !important;'+
    '  font: 16px monospace !important;'+
    '  margin-left: '+ elementSpacing +' !important;'+
    '  min-width: 100px !important;'+
    '  padding: 5px 8px 6px 8px !important;'+
    '  position: relative !important;'+
    '  top: -9px !important;'+
    '}'+
    '#dateTime {'+
    '  background: linear-gradient(135deg, #070707, #333) !important;'+
    '  border: 1px solid #CCC !important;'+
    '  box-shadow: 1px 0 4px #000 inset !important;'+
    '  cursor: pointer !important;'+
    '}'+
    '#gClock {'+
    '  background-repeat: no-repeat !important;'+
    '  background-position: center !important;'+
    '  cursor: pointer !important;'+
    '  border-radius: 50% !important;'+
    '  height: 40px !important;'+
    '  filter: grayscale(1) brightness(.65) !important;'+
    '  position: relative !important;'+
    '  top: 6px !important;'+
    '  width: 40px !important;'+
    '}'+
    '#gClock:hover + #dateTime {'+
    '  background: #900 !important;'+
    '  border-color: #C00 !important;'+
    '  color: #FFF !important;'+
    '}'+
    '#googImg {'+
    '  background: url('+ googleImage +') no-repeat !important;'+
    '  margin-bottom: 16px !important;'+
    '  min-height: 140px !important;'+
    '  padding-left: 436px !important;'+
    '  pointer-events: none !important;'+
    '  position: relative !important;'+
    '  top: 12px !important;'+
    '  width: 0 !important;'+
    '}'+
    '#gSearch, #Mses6b {'+
    '  border-radius: 8px !important;'+
    '  max-height: 36px !important;'+
    '  padding: 9px 16px !important;'+
    '  text-decoration: none !important;'+
    '}'+
    '#gSearch, #Mses6b {'+
    '  margin-right: '+ elementSpacing +' !important;'+
    '}'+
    '#dEjpnf {'+
    '  min-width: 230px !important;'+
    '  padding-bottom: 0 !important;'+
    '  text-align: left !important;'+
    '}'+
    '#dEjpnf .EzVRq, #dEjpnf button.EzVRq {'+
    '  color: #CCC !important;'+
    '  padding: 8px !important;'+
    '  text-decoration: none !important;'+
    '}'+
    '#dEjpnf .EzVRq:hover, #dEjpnf button.EzVRq:hover {'+
    '  background-color: #333 !important;'+
    '  color: #FFF !important;'+
    '}'+
    '#divThemer {'+
    '  margin-top: -4px !important;'+
    '}'+
    '#divThemer,'+
    '#divNumber,'+
    '#divLinks {'+
    '  padding: 7px 0 7px 9px !important;'+
    '}'+
    '#divThemer:hover,'+
    '#divNumber:hover,'+
    '#divLinks:hover {'+
    '  background-color: #333 !important;'+
    '}'+
    '#themeImage {'+
    '  margin-left: 14px !important;'+
    '  opacity: 0 !important;'+
    '  position: relative !important;'+
    '  top: 2px !important;'+
    '}'+
    '#themerNum {'+
    '  border: none !important;'+
    '  color: #CCC !important;'+
    '  text-align: center !important;'+
    '  width: 42px !important;'+
    '}'+
    '#buttonThemer,'+
    '#divLinks,'+
    '#searchLinks {'+
    '  cursor: pointer !important;'+
    '}'+
    '#buttonThemer,'+
    '#themerNumber {'+
    '  color: #CCC !important;'+
    '}'+
    '#divThemer:hover > #buttonThemer,'+
    '#divNumber:hover > #themerNumber,'+
    '#divNumber:hover > #themerNum {'+
    '  color: #FFF !important;'+
    '}'+
    'input[type=number]::-webkit-inner-spin-button,'+
    'input[type=number]::-webkit-outer-spin-button {'+
    '  opacity: 0 !important;'+
    '}'+
    '#divThemer:hover > #themeImage,'+
    '#divThemer:hover input[type=number]::-webkit-inner-spin-button,'+
    '#divThemer:hover input[type=number]::-webkit-outer-spin-button,'+
    '#divNumber:hover input[type=number]::-webkit-inner-spin-button,'+
    '#divNumber:hover input[type=number]::-webkit-outer-spin-button {'+
    '  opacity: 1 !important;'+
    '}'+
    '.tFYjZe {'+
    '  padding: 0 !important;'+
    '}'+
    '#YUIDDb > div:hover,'+
    '#viewClock:hover:hover {'+
    '  color: #FFF !important;'+
    '}'+
    'body > div.L3eUgb form {'+
    '  margin-top: 21px !important;'+
    '  width: 584px !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div.ayzqOc {'+
    '  display: inline-flex !important;'+
    '  position: absolute !important;'+
    '  top: 320px !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd > div > .gBtn {'+
    '  background-position: 4px center !important;'+
    '  background-repeat: no-repeat !important;'+
    '  border-radius: 4px !important;'+
    '  height: 32px !important;'+
    '  margin-right: '+ elementSpacing +' !important;'+
    '  padding: 0 6px !important;'+
    '  text-indent: 20px !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd {'+
    '  padding: 0 !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd a, body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd a, .gb_qa svg, .gLFyf {'+
    '  color: #FFF !important;'+
    '}'+
    '.QCzoEc, .ExCKkf {'+
    '  background: transparent !important;'+
    '  color: #CCC !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd a:hover, body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd a:hover > svg {'+
    '  background-color: #FFF !important;'+
    '  color: #000 !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd > div > a {'+
    '  font-size: 16px !important;'+
    '  padding-right: 20px !important;'+
    '}'+
    '.gb_Wd {'+
    '  padding: 0 !important;'+
    '}'+
    '#gb > div > div.gb_Se {'+
    '  height: 40px !important;'+
    '  margin-top: -8px !important;'+
    '}'+
    '#gbwa {'+
    '  padding: 0 !important;'+
    '  width: 40px !important;'+
    '}'+
    '#gbwa > div > a {'+
    '  background-color: #303030 !important;'+
    '  border: 1px solid #CCC !important;'+
    '  border-radius: 50% !important;'+
    '  box-shadow: 1px 0 4px #000 inset !important;'+
    '  position: relative !important;'+
    '  right: -4px !important;'+
    '}'+
    '#gbwa > div > a:hover {'+
    '  background-color: #444 !important;'+
    '  border: 1px solid #000 !important;'+
    '}'+
    '#gbwa > div > a:hover > svg {'+
    '  background-color: #444 !important;'+
    '}'+
    '.gb_Na .gb_C {'+
    '  padding: 0 !important;'+
    '}'+
    '#gb > div > div.gb_Me > div.gb_Na.gb_bd.gb_gg.gb_h.gb_uf > div {'+
    '  margin: 0 0 0 '+ elementSpacing +' !important;'+
    '}'+
    '.gb_Ca {'+
    '  height: 40px !important;'+
    '  width: 40px !important;'+
    '}'+
    '#gb > div > div.gb_Se > div.gb_Na.gb_bd.gb_mg.gb_h.gb_Af > div > a > img, #gb > div > div.gb_Se > div.gb_Na.gb_bd.gb_mg.gb_h.gb_Af {'+
    '  height: 40px !important;'+
    '  width: 40px !important;'+
    '  margin-right: '+ elementSpacing +' !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd > div.LX3sZb {'+
    '  margin-top: -8px !important;'+
    '}'+
    '#gb > div {'+
    '  margin-right: 0 !important;'+
    '}'+
    '#gb {'+
    '  height: 8px !important;'+
    '  width: 100% !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div > a {'+
    '  display: none !important;'+
    '}'+
    '.RNNXgb,'+
    '#gSearch,'+
    '#Mses6b,'+
    '#headerButton {'+
    '  border-color: #CCC !important;'+
    '  box-shadow: none !important;'+
    '}'+
    '.RNNXgb:hover, .RNNXgb:focus-within {'+
    '  border-color: #777 !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf {'+
    '  padding: 0 20px !important;'+
    '}'+
    '#gSearch, #Mses6b, #headerButton, #submit, center > input {'+
    '  border: 1px solid #CCC !important;'+
    '  color: #AAA !important;'+
    '  cursor: pointer !important;'+
    '  width: auto !important;'+
    '  min-height: 32px  !important;'+
    '}'+
    '#dateTimeContainer > #dateTime:hover, #gSearch:hover:hover, #Mses6b:hover, #headerButton:hover, #submit:hover, center > input:hover, #gb > div > div.gb_0a.gb_E.gb_k.gb_1a.gb_la .gb_Pe:hover {'+
    '  border: 1px solid #000 !important;'+
    '  color: #FFF !important;'+
    '}'+
    '#gb > div > div.gb_0a.gb_E.gb_k.gb_1a.gb_la > div.gb_Qb:hover > a, #gb > div > div.gb_0a.gb_E.gb_k.gb_1a.gb_la > div.gb_Qf.gb_sb > a:hover, #gb .gb_Vf:hover a {'+
    '  background-color: #444 !important;'+
    '  border-color: #000 !important;'+
    '}'+
    'div.gb_0b {'+
    '  filter: none !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf {'+
    '  width: 100% !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf > div {'+
    '  display: flex !important;'+
    '  position: absolute !important;'+
    '  top: 300px !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf > div a, #gb > div > div.gb_1a.gb_F.gb_l.gb_2a.gb_ma a, #gb > div > div.gb_1a.gb_F.gb_l.gb_2a.gb_ma svg {'+
    '  color: #000 !important;'+
    '}'+
    '#gb > div > div.gb_1a.gb_F.gb_l.gb_2a.gb_ma a:hover {'+
    '  background-color: #E8F0FE !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.c93Gbe {'+
    '  background-color: transparent !important;'+
    '}'+
    '.xtSCL {'+
    '  border-top: 1px solid transparent !important;'+
    '}'+
    '.aajZCb li:hover {'+
    '  background: #111 !important;'+
    '}'+
    '#gb > div > div:nth-child(4) {'+
    '  height: calc(-140px + 100vh) !important;'+
    '}'+
    '.aajZCb {'+
    '  background: #252525 !important;'+
    '  border: 1px solid #777 !important;'+
    '  border-top: none !important;'+
    '  box-shadow: none !important;'+
    '}'+
    '.aajZCb li span {'+
    '  color: #FFF !important;'+
    '}'+
    '#gb > div > div:last-of-type {'+
    '  top: -8px !important;'+
    '}'+
    '#gb > div > div.gb_0a.gb_E.gb_k.gb_1a.gb_la {'+
    '  margin-top: -10px !important;'+
    '}'+
    '.MV3Tnb,'+
    '#Mses6b,'+
    '.gb_h > a.gb_f,'+
    'div.ayzqOc > input,'+
    'div.ayzqOc > button,'+
    '.RNNXgb,'+
    '.FPdoLc.lJ9FBc input {'+
    '  background: rgba(24, 26, 27, .01) !important;'+
    '  box-shadow: none !important;'+
    '}'+
    '.MV3Tnb:hover,'+
    '#Mses6b:hover,'+
    '.gb_h > a.gb_f:hover,'+
    'div.ayzqOc > input:hover,'+
    'div.ayzqOc > button:hover,'+
    '.RNNXgb:hover,'+
    '.FPdoLc.lJ9FBc input:hover {'+
    '  background-color: rgb(24, 26, 27) !important;'+
    '  color: #FFF !important;'+
    '}'+
  '');

})();
