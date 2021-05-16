// ==UserScript==
// @name         Google
// @namespace    srazzano
// @version      1.0.1
// @description  Layout and Theme
// @author       Sonny Razzano a.k.a. srazzano
// @match        https://www.google.com/*
// @icon         https://raw.githubusercontent.com/srazzano/Images/master/googleicon64.png
// @grant        GM_addStyle
// ==/UserScript==

(function() {

  'use strict';

  const dateFormat = 1,
        defaultDateTimeView = false,
        defaultSecondsView = false,
        defaultAMPM = true,
        timerLong = 15000,
        timerShort = 500,
        am = 'AM',
        pm = 'PM',
        buttonSpacer = '14px',
        hideDateTime = 'Click to Hide Date/Time',
        showDateTime = 'Click to Show Date/Time',
        addSeconds = 'Date/Time\n\u2022 Click to Add :seconds',
        removeSeconds = 'Date/Time\n\u2022 Click to Remove :seconds',
        DayNameAbbr = 'Sun.,Mon.,Tue.,Wed.,Thu.,Fri.,Sat.',
        DayName = 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
        MonthNameAbbr = 'Jan.,Feb.,Mar.,Apr.,May,Jun.,Jul.,Aug.,Sep.,Oct.,Nov.,Dec.',
        MonthName = 'January,February,March,April,May,June,July,August,September,October,November,December',
        MonthNum = '1,2,3,4,5,6,7,8,9,10,11,12',
        MonthNo = '01,02,03,04,05,06,07,08,09,10,11,12',
        DayNum = '"",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31',
        DayNo = '"",01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31',
        DayOrd = '"",1st,2nd,3rd,4th,5th,6th,7th,8th,9th,10th,11th,12th,13th,14th,15th,16th,17th,18th,19th,20th,21st,22nd,23rd,24th,25th,26th,27th,28th,29th,30th,31st',
        comma = ',',
        hyphen = '-',
        separator = '\u2022',
        slash = '/',
        space = ' ',
        daynameabbr = DayNameAbbr.split(','),
        dayname = DayName.split(','),
        monthnameabbr = MonthNameAbbr.split(','),
        monthname = MonthName.split(','),
        monthnum = MonthNum.split(','),
        monthno = MonthNo.split(','),
        daynum = DayNum.split(','),
        dayno = DayNo.split(','),
        dayord = DayOrd.split(',');

  function $c(type, props) {
    let node = document.createElement(type);
    if (props && typeof props == 'object') for (let prop in props) typeof node[prop] == 'undefined' ? node.setAttribute(prop, props[prop]) : node[prop] = props[prop];
    return node;
  }

  function $q(el, all) {
    if (all) return document.querySelectorAll(el);
    return document.querySelector(el);
  }

  function aDateTime(dateFormat) {
    let date = new Date(),
        dy = date.getDay(),
        mth = date.getMonth(),
        dt = date.getDate(),
        yr = date.getFullYear(),
        hr = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds(),
        w_Sep = daynameabbr[dy] + space + separator + space,
        ww_Sep = dayname[dy] + space + separator + space,
        m_Hyphen = monthnum[mth] + hyphen,
        m_Slash = monthnum[mth] + slash,
        mm_Hyphen = monthno[mth] + hyphen,
        mm_Slash = monthno[mth] + slash,
        mmm_Space = monthnameabbr[mth] + space,
        mmmm_Space = monthname[mth] + space,
        d_Comma = daynum[dt] + comma + space,
        d_Hyphen = daynum[dt] + hyphen,
        d_Slash = daynum[dt] + slash,
        dd_Comma = dayno[dt] + comma + space,
        dd_Hyphen = dayno[dt] + hyphen,
        dd_Slash = dayno[dt] + slash,
        ddd_Comma = dayord[dt] + comma + space,
        yy_Sep = yr - 2000 + space + separator + space,
        yyyy_Sep = yr + space + separator + space,
        hr12, hr24, ampm;
    if (hr > 12) {hr12 = hr - 12; hr24 = hr}
    else {hr12 = hr; hr24 = hr}
    if (hr < 10) {hr12 = hr; hr24 = '0' + hr}
    if (hr === 0) {hr12 = 12; hr24 = '00'}
    min < 10 ? min = ':0' + min : min = ':' + min;
    sec < 10 ? sec = ':0' + sec : sec = ':' + sec;
    hr < 12 ? ampm = am : ampm = pm;
    span1.hasAttribute('view-seconds') ? sec = sec : sec = '';
    defaultAMPM ? ampm = ampm : ampm = '';
    switch (dateFormat) {
      // RETURN OPTIONS: (w_Sep / ww_Sep) + (m_Hyphen / m_Slash / mm_Hyphen / mm_Slash / mmm_Space / mmmm_Space) + (d_Comma / d_Hyphen / d_Slash / dd_Comma / dd_Hyphen / dd_Slash / ddd_Comma) +  (yy_Sep / yyyy_Sep) + (hr12 / hr24) + (min) + (sec) + (ampm)
      case 1: return ww_Sep + mmmm_Space + ddd_Comma + yyyy_Sep + hr12 + min + sec + space + ampm; // Sunday • March 1??, 2021 • 12:34 AM
      case 2: return w_Sep + mmm_Space + d_Comma + yyyy_Sep + hr12 + min + sec + space + ampm; // Sun. • Mar. 1, 2021 • 12:34 AM
      case 3: return w_Sep + mmm_Space + dd_Comma + yyyy_Sep + hr12 + min + sec + space + ampm; // Sun. • Mar. 01, 2021 • 12:34 AM
      case 4: return w_Sep + m_Hyphen + d_Hyphen + yyyy_Sep + hr12 + min + sec + space + ampm; // Sun. • 3-1-2021 • 12:34 AM
      case 5: return w_Sep + mm_Hyphen + dd_Hyphen + yyyy_Sep + hr12 + min + sec + space + ampm; // Sun. • 03-01-2021 • 12:34 AM
      case 6: return w_Sep + m_Slash + d_Slash + yyyy_Sep + hr12 + min + sec + space + ampm; // Sun. • 3/1/2021 • 12:34 AM
      case 7: return w_Sep + mm_Slash + dd_Slash + yyyy_Sep + hr12 + min + sec + space + ampm; // Sun. • 03/01/2021 • 12:34 AM
      case 8: return;
      case 9: return;
  } }

  function setTimer() {
    clearInterval(timer);
    if (span1.hasAttribute('view-seconds')) timer = setInterval(function() {span1.textContent = aDateTime(dateFormat)}, timerShort);
    else timer = setInterval(function() {span1.textContent = aDateTime(dateFormat)}, timerLong);
  }

  function defaultSeconds() {
    clearInterval(timer);
    if (defaultSecondsView) {
      span1.setAttribute('view-seconds', true);
      span1.title = removeSeconds;
    } else {
      span1.removeAttribute('view-seconds');
      span1.title = addSeconds;
    }
    span1.textContent = aDateTime(dateFormat);
    setTimer();
  }

  function defaultDateTime() {
    clearInterval(timer);
    span1.hidden = !defaultDateTimeView;
    defaultDateTimeView ? button8.title = hideDateTime : button8.title = showDateTime;
    defaultSeconds();
    span1.textContent = aDateTime(dateFormat);
  }

  function toggleDateTime() {
    span1.hidden = !span1.hidden;
    if (span1.hidden) {
      clearInterval(timer);
      button8.title = showDateTime;
    } else {
      button8.title = hideDateTime;
      span1.textContent = aDateTime(dateFormat);
      setTimer();
  } }

  function toggleSeconds() {
    clearInterval(timer);
    if (span1.hasAttribute('view-seconds')) {
      span1.removeAttribute('view-seconds');
      span1.title = addSeconds;
    } else {
      span1.setAttribute('view-seconds', true);
      span1.title = removeSeconds;
    }
    span1.textContent = aDateTime(dateFormat);
    setTimer();
  }

  var div1 = $q('body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd > div'),
      div2 = $q('#gb > div'),
      div3 = $q('body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf > div'),
      span1 = $c('span', {id: 'dateTime', hidden: true, onclick: function() {toggleSeconds()}}),
      input1 = $q('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b'),
      button1 = $c('button', {id: 'gCalendar', className: 'gBtn', textContent: 'Calendar', title: url1, style: 'background-image: url('+ icon1 +')', onclick: function() {window.open(url1, '_blank')}}),
      button2 = $c('button', {id: 'gMail', className: 'gBtn', textContent: 'Gmail', title: url2, style: 'background-image: url('+ icon2 +')', onclick: function() {window.open(url2, '_blank')}}),
      button3 = $c('button', {id: 'gMaps', className: 'gBtn', textContent: 'Maps', title: url3, style: 'background-image: url('+ icon3 +')', onclick: function() {window.open(url3, '_blank')}}),
      button4 = $c('button', {id: 'gPlay', className: 'gBtn', textContent: 'Play Store', title: url4, style: 'background-image: url('+ icon4 +')', onclick: function() {window.open(url4, '_blank')}}),
      button5 = $c('button', {id: 'gTranslate', className: 'gBtn', textContent: 'Translate', title: url5, style: 'background-image: url('+ icon5 +')', onclick: function() {window.open(url5, '_blank')}}),
      button6 = $c('button', {id: 'gYouTube', className: 'gBtn', textContent: 'YouTube', title: url6, style: 'background-image: url('+ icon6 +')', onclick: function() {window.open(url6, '_blank')}}),
      button7 = $c('button', {id: 'gYouTubeTV', className: 'gBtn', textContent: 'YouTube TV', title: url7, style: 'background-image: url('+ icon7 +')', onclick: function() {window.open(url7, '_blank')}}),
      button8 = $c('button', {id: 'gClock', style: 'background-image: url('+ icon8 +')', onclick: function() {toggleDateTime()}}),
      timer;

  div1.appendChild(button1);
  div1.appendChild(button2);
  div1.appendChild(button3);
  div1.appendChild(button4);
  div1.appendChild(button5);
  div1.appendChild(button6);
  div1.appendChild(button7);
  div2.appendChild(button8);
  div2.appendChild(span1);
  div3.insertBefore(input1, div3.firstChild);
  input1.id = 'gSearch';

  addEventListener('unload', function() {clearInterval(timer)}, false);

  setTimeout(function() {
    let lia = $q('#dEjpnf > li > a', true),
        num = $q('body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd > div > .gBtn', true),
        len = ($q('#gSearch').offsetWidth + $q('#Mses6b').offsetWidth) / 2,
        screenWidth = window.screen.width / 2,
        int = parseInt(buttonSpacer.match('\\d+') / 2),
        spacerCount = (num.length - 1) * int,
        os1 = $q('body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd').offsetHeight,
        os2 = $q('body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ').offsetHeight,
        os3 = $q('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb').offsetHeight,
        ost = (os1 + os2 + os3 + 30) + 'px',
        arr = [];
    div3.style.top = ost;
    for (let i = 0; i < lia.length; i++) lia[i].setAttribute('target', '_blank');
    for (let j = 0; j < num.length; j++) arr.push(num[j].offsetWidth);
    let sum = arr.reduce(function(a, b) {return a + b}, 1),
        buttonsWidth = sum / 2,
        fromLeft1 = Math.round(screenWidth - buttonsWidth - spacerCount) + 'px',
        fromLeft2 = Math.round(screenWidth - len - int) + 'px';
    div1.style.marginLeft = fromLeft1;
    div3.style.left = fromLeft2;
    defaultDateTime();
    span1.textContent = aDateTime(dateFormat);
  }, 100);

  GM_addStyle(''+
    '#hplogocta, a.MV3Tnb, #gb > div > div:nth-child(1) > div, #gbqfbb, body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.ssOUyb, body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.AghGtd, body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf > a, body > div.L3eUgb > div.o3j99.qarstb > div, body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div > div.SuUcIb, body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div > div:nth-child(2) {'+
    '  display: none !important;'+
    '}'+
    'body {'+
    '  background: #111 !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd > div > .gBtn {'+
    '  background-position: 4px center !important;'+
    '  background-repeat: no-repeat !important;'+
    '  border-radius: 4px !important;'+
    '  height: 32px !important;'+
    '  margin-right: '+ buttonSpacer +' !important;'+
    '  padding: 0 6px !important;'+
    '  text-indent: 20px !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd {'+
    '  padding: 0 !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd a, body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd a, .gb_qa svg {'+
    '  color: #FFF !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd a:hover, body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd a:hover > svg {'+
    '  background-color: #FFF !important;'+
    '  color: #000 !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd > div > a {'+
    '  font-size: 16px !important;'+
    '  padding-right: 20px !important;'+
    '}'+
    '#gClock {'+
    '  background-repeat: no-repeat !important;'+
    '  background-position: center !important;'+
    '  cursor: pointer !important;'+
    '  border-radius: 50% !important;'+
    '  height: 40px !important;'+
    '  width: 40px !important;'+
    '}'+
    '#gClock:hover {'+
    '  background-color: #FFF !important;'+
    '}'+
    '#dateTime {'+
    '  border-radius: 4px !important;'+
    '  font: 16px monospace !important;'+
    '  margin: 0 10px !important;'+
    '  padding: 5px 6px 6px 6px !important;'+
    '  min-width: 300px !important;'+
    '}'+
    '#gClock:hover + #dateTime {'+
    '  background: #900 !important;'+
    '  border-color: #C00 !important;'+
    '}'+
    '#gb {'+
    '  height: 8px !important;'+
    '  width: 100% !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ {'+
    '  max-height: 230px !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div {'+
    '  margin-top: 50px !important;'+
    '  max-height: 185px !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img, #hplogo {'+
    '  background: url('+ googleImage +') no-repeat !important;'+
    '  height: 164px !important;'+
    '  padding-left: 512px !important;'+
    '  pointer-events: none !important;'+
    '  width: 0 !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf {'+
    '  padding: 0 20px !important;'+
    '}'+
    '#gSearch, #Mses6b {'+
    '  border-radius: 4px !important;'+
    '  padding: 9px 16px !important;'+
    '  text-decoration: none !important;'+
    '}'+
    '.gBtn, #dateTime, #gSearch, #Mses6b {'+
    '  background-color: #303030 !important;'+
    '  border: 1px solid #666 !important;'+
    '  color: #FFF !important;'+
    '  cursor: pointer !important;'+
    '  text-shadow: 1px 1px 2px #000 !important;'+
    '}'+
    '.gBtn:hover, #dateTime:hover, #gSearch:hover:hover, #Mses6b:hover {'+
    '  background-color: #FFF !important;'+
    '  border-color: #FFF !important;'+
    '  color: #000 !important;'+
    '  text-shadow: none !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf {'+
    '  width: 100% !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf > div {'+
    '  display: flex !important;'+
    '  position: absolute !important;'+
    '}'+
    '#gSearch {'+
    '  margin-right: '+ buttonSpacer +' !important;'+
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
    '#dEjpnf {'+
    '  background-color: #303030 !important;'+
    '  border-radius: 4px !important;'+
    '}'+
    '#dEjpnf > li {'+
    '  background: none !important;'+
    '  border: none !important;'+
    '}'+
    '#dEjpnf > li > a, #dEjpnf > li > button {'+
    '  color: #FFF !important;'+
    '  padding: 10px !important;'+
    '}'+
    '#dEjpnf > li:hover {'+
    '  background-color: #FFF !important;'+
    '}'+
    '#dEjpnf > li:hover > a, #dEjpnf > li:hover > button {'+
    '  color: #000 !important;'+
    '  text-decoration: none !important;'+
    '}'+
    '#dEjpnf > li:first-of-type {'+
    '  border-radius: 4px 4px 0 0 !important;'+
    '}'+
    '#dEjpnf > li:last-of-type {'+
    '  border-radius: 0 0 4px 4px !important;'+
    '}'+
  '');

})();
