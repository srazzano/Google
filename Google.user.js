// ==UserScript==
// @name         Google
// @namespace    srazzano
// @version      1.0.1
// @description  Layout and Theme
// @author       Sonny Razzano a.k.a. srazzano
// @include      https://www.google.com*
// @icon         https://raw.githubusercontent.com/srazzano/Images/master/googleicon64.png
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {

  'use strict';

  const dateFormat = 1,
        timerLong = 15000,
        timerShort = 500,
        am = 'AM',
        pm = 'PM',
        buttonSpacer = '14px',
        hideShowDateTime = 'Left-click to 𝐇𝐈𝐃𝐄/𝐒𝐇𝐎𝐖 𝐃𝐚𝐭𝐞/𝐓𝐢𝐦𝐞',
        addRemoveSeconds = '𝐃𝐚𝐭𝐞/𝐓𝐢𝐦𝐞\n\u2022 Left-click to 𝐀𝐃𝐃/𝐑𝐄𝐌𝐎𝐕𝐄 :𝐬𝐞𝐜𝐨𝐧𝐝𝐬',
        addRemoveAMPM = '\u2022 Middle-click to 𝐀𝐃𝐃/𝐑𝐄𝐌𝐎𝐕𝐄 AM/PM',
        DayNameAbbr = 'Sun.,Mon.,Tue.,Wed.,Thu.,Fri.,Sat.',
        DayName = 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
        MonthNameAbbr = 'Jan.,Feb.,Mar.,Apr.,May,Jun.,Jul.,Aug.,Sep.,Oct.,Nov.,Dec.',
        MonthName = 'January,February,March,April,May,June,July,August,September,October,November,December',
		    MonthNum = '1,2,3,4,5,6,7,8,9,10,11,12',
        MonthNo = '01,02,03,04,05,06,07,08,09,10,11,12',
		    DayNum = '"",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31',
        DayNo = '"",01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31',
        DayOrd = '"",1ˢᵗ,2ⁿᵈ,3ʳᵈ,4ᵗʰ,5ᵗʰ,6ᵗʰ,7ᵗʰ,8ᵗʰ,9ᵗʰ,10ᵗʰ,11ᵗʰ,12ᵗʰ,13ᵗʰ,14ᵗʰ,15ᵗʰ,16ᵗʰ,17ᵗʰ,18ᵗʰ,19ᵗʰ,20ᵗʰ,21ˢᵗ,22ⁿᵈ,23ʳᵈ,24ᵗʰ,25ᵗʰ,26ᵗʰ,27ᵗʰ,28ᵗʰ,29ᵗʰ,30ᵗʰ,31ˢᵗ',
        comma = ',',
        hyphen = '-',
        separator = '•',
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
        dayord = DayOrd.split(','),
        icon1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABT0lEQVR42mNkAAKp9Iv/GYgELMxMYJqZmZHh/mQdRkZSNMPAfwZGMM0IYpFjADJANyCMkIaHocYgahVOA57O0Fv17x8Dw7//IH8ygB37H6qCEcj5s5c1DK8BD6fqrTp+5w9DRP81hsNNOgxyIkwMJ+/+ZQjrvcoANJywAQ+m6K16/O4fg5IYE4N0xiWGvXU6DM5NV8CSRBkA8sLbL/8Z9EouM2yq0GYwVmBmuPrkL4NbC5EueDRNb9XDNwgXPJ6ux3D9KQkG3Jqou+rcg7/gMPAwUmWYncrJcPPZXwaXZiINeDJdbxUjJJ0w/PzDwMDOwsDw+y+Ez8pMRCzcmqyyCpLaGKDpDRWwH+IP+/+TGayGkf0vA6Ncs+3/X39/E52QLh3+uwqZj24AQQA0AM4W23uakVGx1eH/998/SDYApJkB5k2JBguiMxTIAJhmEAAA4quznkbNVyMAAAAASUVORK5CYII=',
        icon2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMElEQVR42mN85Wz6nwEIfjEw9MvsPV3EQAT4vYelD0gVgtiMMANA4DMjY9gU3Ygt/PyffjY0NPxD0sMYGrqKSVv7Gnu1TYs3kL8KLoFsAMyQQ9GZm7m5uX+Hhob+a2xsZGRgsGeSlPzMlqQchKIZqwEwQxbbJG9lYHj+B8T/ws3N2m5Y6YWuGWyAU+uX/yv2OWL1K8gguYpzDNg0goDlG3+IASAOLkMEK88z4NIMdwFMEJsh2AyAacYwAARm73cK4/3/fxUOA8KAmlEDEd2AfdU8jHddzEJhhiAZEMbq8me1yYrg/wQNANEwQ6AGgDWDGEQZAIx/5tWrV/8FGQKKBZBmmBixLmAEpkRGLS0txmvXrv2vr6//z8jI+J9oF4Do////g2mYRhgYQgbgAugGAAAzKLYhKvyRPwAAAABJRU5ErkJggg==',
        icon3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACEElEQVR42o2Ty2sTURTGv9kIJZGx4kJUrGhQFELQcSPJygekKYg7l/VNjIsgqAVbF+6s4J/gwrbRYqfRjbErH+hK4zLgwpY4o41CxReMZcjM9d5zcm9GV71w577O9zvfPZexsMa2dOKIEN0IQghAxMg0Xllq31qLePH4YaUCYsEAmkvI09eWtedBmaHgw7g3cphcy8AX7kfK2vz2k4DO4HoCqCBr9/0yhb8ZvoUw7uLQwnUDiKXoOYkFmivf8f7XH4LuSw/gwGCaAZnaBfG2NImDjTE05aja/idXjaNnEmCp7Cs/GCDne+0UHNkJsEsClNBpXCPxu9JtAqjsdI0owsu6xy70FTakaa26tbN2Xmjh/9nVgZdfxlJ1lbIlC6iGzIIs4o6Zc0JXmyVIiDu0241ieJdDsq8zqxegZxyaOdsHiB4gIVa9FdxBEATYePMKA+RzquwE2D59RmiRhviFL0b8e9McPM+j/YGxCgE+VCdQLBYZsG3qtHGgml/omAuNuPOYLcckVpAwDGGPV/H1xiTy+TwDtiYAnwp92yNuHdrabDmi83a7jaB2F+tOjsJxHAZsmTpFcZ8Ly8ZFSYp1MQgnPw8vMqTVaiGVSiGXyzFg871R0TG2pXi+boToibWTuQr/TL7vI5vNMkAsHhP9zI/+EZriJoBuhZ3Ytq0BR+ls2H1sRMlXSV5D79cvRQbwF5scUJszafjwAAAAAElFTkSuQmCC',
        icon4 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABzklEQVR42pWTvUscQRjGn3dm78RwfqGYcLn6hGskVSCFjYVcc1Zu/oH0VtqEI4VNCsWQnGgsJNi5JxY2KuJ3DisRAzGQFLGJFhaxSCKsuzO+M3uai1nFG5hi3o/fPM87uyTWfw2g+bPXnFrAWWvg4tFYGXUssgDAo2wR0tcIk4QwM051ATRJj1QI6ipCSUCTMLl7qbEA1cAAzSefA7khKCSqaaZB3wmKFKSkpy/4wBDyQyD3kiHiuiiHhzjEaSwoUtAkWAHBQrgfvHV6Dmg5+Kf468k+sk826X9Ai/SgNUjVQAJjZ5iVOKwlwLPz31g9moFu4LiE2/gU5b+AdgaYJlUDsXaYkiti8WgFvedf7I3a4XjSdNoRuRGgwygwAI4HpgrXSuY/DCH/vBQ11QIce4wAupMBJln1f6Wk/P41+j59ZHcEerEHp+vnFeCGhTQ/Y1C9oQrpPv6OrVeDNpZwlBkR5OgaGnsQM8THkQViC5pBs9NjyO9UICQ/Jg/DESFCJdzWvdVbnjETWTAzmHzzFv2VbSSEguQthIptjAVMld6hsLFlEw+Sfpkb3ft9yhnypkoT6Fuu4EL7yH5bqu9nKvzY9cZHSmhr+nOn3Lh1CbI13UN9EkzxAAAAAElFTkSuQmCC',
        icon5 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACM0lEQVR42oWTz2sTQRTHvzOzWxrzY1uNpoGKTYkHhdZLaa1VUTCKNhZtTEU8+uOmtCcVvXgRUWulB/8FIaVe/AWeBC8KogdFRCUUS4n4o5q0S9TN7vpmdhuSFtLHzrzdZd7nve+8GZa5Y+YYnKzrAg7IXPVAfmuCj0yPBqfQwFhmYsFljHtBywCCY4oAIw0BwzWA2mDpHauEBxfirCHgqA/wCPUAOfWE3qAzNAshGA0Bh3Q6NDHm0jpGgNseYH0YOLXLQjQIFIrA+FMdFVrcYZg43fcTa1sjBKBKXS+T9Ap0hAAAx+VBC4/fCrz+whFuBkplrxJOmca259EWDSAcWkOZWT1gaNyrYPLEP5y/14R9Wxykttqo2MCl+7qSkk4WsKPzLyanH+Hq2ZNV/bZtE+CWB7iStvDkncCrGY7ehIOBpEMyNLUPBptDV+glNE3Aph/zCyY2xqIY2tkDdtgHbIgAZ2gPYgbwvcRw95lQXlYgmIOD8efoSsaQnysg2mqge3PCk5C+WdPGJavriKv8/vY8fnx9gUBzE46nBqgaTXWFDd7w27gyvhosp47IPILFh2gxgji2tw+6rqsNZYeWAaptqqHJd44KRns/omyZeD8zi8yefnBOAHkXzD92dmV2OmVMDg6fid2J3xjuXsS3X0W0rWvxJDQ6pgeuL0pwzv+cuNj/eSweCygw59yTgFXMh2TPbfuQ3dQeUK2UpUuAugurAZYg11KfcrquKYDKTMM0y/gPuRvvNRWbsbkAAAAASUVORK5CYII=',
        icon6 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAX0lEQVR42s2SwQoAIQhEx2t9X37k9n91NBGWTkE1sOxchHBeoyggJf8AGPB4KYfe6maVS/OEWAQgRlgCzJ9V/Y9KAF7lDLRGAKJTCEBKQO9f72BT/B1EWuYSmfgxAgsYuQErVcPEBlcAAAAASUVORK5CYII=',
	      icon7 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZklEQVR42s2S0QrAIAhFr6/1ffMj1//VoxNB9tRYXRg7BEHYUUuBY8Dp24E1mgAqm5dviUUB+8wF5seqnqMRgqRWoHdCEJFCCEoBxvj6DV7Cz0FUy0ziU0S2J7EmLfxHsPobKaUFF2w1NVWPtXHxAAAAAElFTkSuQmCC',
        icon8 = 'data:image/png;base64,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',
	      googleImage = 'data:image/png;base64,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',
	      url1 = 'https://calendar.google.com/calendar/u/0/r',
        url2 = 'https://mail.google.com/mail/?authuser=0&amp;ogbl',
        url3 = 'https://www.google.com/maps/@36.1489458,-115.0874625,15z?hl=en&authuser=0',
        url4 = 'https://play.google.com/store/apps',
        url5 = 'https://translate.google.com/?hl=en',
        url6 = 'https://www.youtube.com/?gl=US',
        url7 = 'https://tv.youtube.com/library';

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
    GM_getValue("defaultSecondsView") ? sec = sec : sec = '';
    GM_getValue('defaultAMPM') ? ampm = ampm : ampm = '';
    switch (dateFormat) {
      // RETURN OPTIONS: (w_Sep / ww_Sep) + (m_Hyphen / m_Slash / mm_Hyphen / mm_Slash / mmm_Space / mmmm_Space) + (d_Comma / d_Hyphen / d_Slash / dd_Comma / dd_Hyphen / dd_Slash / ddd_Comma) +  (yy_Sep / yyyy_Sep) + (hr12 / hr24) + (min) + (sec) + (ampm)
      case 1: return ww_Sep + mmmm_Space + ddd_Comma + yyyy_Sep + hr12 + min + sec + space + ampm; // Sunday • March 1ˢᵗ, 2021 • 12:34 AM
      case 2: return w_Sep + mmm_Space + d_Comma + yyyy_Sep + hr12 + min + sec + space + ampm; // Sun. • Mar. 1, 2021 • 12:34 AM
      case 3: return w_Sep + mmm_Space + dd_Comma + yyyy_Sep + hr12 + min + sec + space + ampm; // Sun. • Mar. 01, 2021 • 12:34 AM
      case 4: return w_Sep + m_Hyphen + d_Hyphen + yyyy_Sep + hr12 + min + sec + space + ampm; // Sun. • 3-1-2021 • 12:34 AM
      case 5: return w_Sep + mm_Hyphen + dd_Hyphen + yyyy_Sep + hr12 + min + sec + space + ampm; // Sun. • 03-01-2021 • 12:34 AM
      case 6: return w_Sep + m_Slash + d_Slash + yyyy_Sep + hr12 + min + sec + space + ampm; // Sun. • 3/1/2021 • 12:34 AM
      case 7: return w_Sep + mm_Slash + dd_Slash + yyyy_Sep + hr12 + min + sec + space + ampm; // Sun. • 03/01/2021 • 12:34 AM
      case 8: return;
      case 9: return;
      default: return ww_Sep + mmmm_Space + ddd_Comma + yyyy_Sep + hr12 + min + sec + space + ampm; // Sunday • March 1ˢᵗ, 2021 • 12:34 AM
  } }

  function defaultDateTime() {
    span1.hidden = false;
    GM_getValue('defaultSecondsView') ? span1.setAttribute('view-seconds', true) : span1.removeAttribute('view-seconds');
    span1.textContent = aDateTime(dateFormat);
    setTimer();
  }

  function onClose() {
    removeEventListener('unload', function() {onClose()}, false);
    clearInterval(timer);
    GM_setValue('defaultDateTimeView', GM_getValue("defaultDateTimeView"));
    GM_setValue('defaultSecondsView', GM_getValue("defaultSecondsView"));
    GM_setValue('defaultAMPM', GM_getValue("defaultAMPM"));
  }

  function onOpen() {
    removeEventListener('load', function() {onOpen()}, false);
    clearInterval(timer);
    if (GM_getValue('defaultDateTimeView')) defaultDateTime();
    else span1.hidden = true;
  }

  function setTimer() {
    clearInterval(timer);
    if (GM_getValue('defaultSecondsView')) timer = setInterval(function() {span1.textContent = aDateTime(dateFormat)}, timerShort);
    else timer = setInterval(function() {span1.textContent = aDateTime(dateFormat)}, timerLong);
  }

  function toggleDateTime() {
    let bool = span1.hidden !== true ? true : false;
    span1.hidden = bool;
    GM_setValue('defaultDateTimeView', !bool);
    if (bool) clearInterval(timer);
    else {span1.textContent = aDateTime(dateFormat); setTimer()}
  }

  function toggleSecondsAMPM(e) {
    switch (e.button) {
      case 0:
        if (GM_getValue('defaultSecondsView')) span1.removeAttribute('view-seconds');
        else span1.setAttribute('view-seconds', true);
        GM_setValue('defaultSecondsView', span1.hasAttribute('view-seconds'))
        span1.textContent = aDateTime(dateFormat);
        setTimer();
        break;
      case 1:
        var bool = GM_getValue('defaultAMPM') !== true ? true : false;
        GM_setValue('defaultAMPM', bool);
        span1.textContent = aDateTime(dateFormat);
  } }

  if (!GM_getValue('defaultDateTimeView')) GM_setValue('defaultDateTimeView', false);
  if (!GM_getValue('defaultSecondsView')) GM_setValue('defaultSecondsView', false);
  if (!GM_getValue('defaultAMPM')) GM_setValue('defaultAMPM', false);

  var div1 = $q('body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd > div'),
      div2 = $q('#gb > div'),
      div3 = $q('body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf > div'),
      span1 = $c('span', {id: 'dateTime', title: addRemoveSeconds + '\n' + addRemoveAMPM, onmousedown: function(e) {toggleSecondsAMPM(e)}}),
      input1 = $q('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b'),
      button1 = $c('button', {id: 'gCalendar', className: 'gBtn', textContent: 'Calendar', title: url1, style: 'background-image: url('+ icon1 +')', onclick: function() {window.open(url1, '_blank')}}),
      button2 = $c('button', {id: 'gMail', className: 'gBtn', textContent: 'Gmail', title: url2, style: 'background-image: url('+ icon2 +')', onclick: function() {window.open(url2, '_blank')}}),
      button3 = $c('button', {id: 'gMaps', className: 'gBtn', textContent: 'Maps', title: url3, style: 'background-image: url('+ icon3 +')', onclick: function() {window.open(url3, '_blank')}}),
      button4 = $c('button', {id: 'gPlay', className: 'gBtn', textContent: 'Play Store', title: url4, style: 'background-image: url('+ icon4 +')', onclick: function() {window.open(url4, '_blank')}}),
      button5 = $c('button', {id: 'gTranslate', className: 'gBtn', textContent: 'Translate', title: url5, style: 'background-image: url('+ icon5 +')', onclick: function() {window.open(url5, '_blank')}}),
      button6 = $c('button', {id: 'gYouTube', className: 'gBtn', textContent: 'YouTube', title: url6, style: 'background-image: url('+ icon6 +')', onclick: function() {window.open(url6, '_blank')}}),
      button7 = $c('button', {id: 'gYouTubeTV', className: 'gBtn', textContent: 'YouTube TV', title: url7, style: 'background-image: url('+ icon7 +')', onclick: function() {window.open(url7, '_blank')}}),
      button8 = $c('button', {id: 'gClock', style: 'background-image: url('+ icon8 +')', title: hideShowDateTime, onclick: function() {toggleDateTime()}}),
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

  addEventListener('load', function() {onOpen()}, false);
  addEventListener('unload', function() {onClose()}, false);

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
    $q('#gb > div > div.gb_Se > a').click();
  }, 100);

  GM_addStyle(''+
    '#hpcanvas, #hplogocta, a.MV3Tnb, #gb > div > div:nth-child(1) > div, #gbqfbb, body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.ssOUyb, body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.AghGtd, body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf > a, body > div.L3eUgb > div.o3j99.qarstb > div, body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div > div.SuUcIb, body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div > div:nth-child(2), #yDmH0d, #gb > div > div.gb_0a.gb_E.gb_k.gb_1a.gb_la > div.gb_Qf.gb_sb {'+
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
    'body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd a, body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd a, .gb_qa svg, .gLFyf {'+
    '  color: #FFF !important;'+
    '}'+
    '.QCzoEc, .ExCKkf {'+
    '  background: transparent !important;'+
    '  color: #CCC !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd a:hover, body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd a:hover > svg{'+
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
    '#dateTime:not(#f) {'+
    '  border-radius: 4px !important;'+
    '  color: #FFF !important;'+
    '  font: 16px monospace !important;'+
    '  margin: 0 10px !important;'+
    '  padding: 5px 6px 6px 6px !important;'+
    '  min-width: 100px !important;'+
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
    '  max-height: 194px !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div {'+
    '  margin-top: 50px !important;'+
    '  max-height: 185px !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img, #hplogo {'+
    '  background: url('+ googleImage +') no-repeat !important;'+
    '  height: 86px !important;'+
    '  padding-left: 250px !important;'+
    '  pointer-events: none !important;'+
    '  width: 0 !important;'+
    '}'+
    '.RNNXgb {'+
    '  background: linear-gradient(#222, #444) !important;'+
    '  border-color: #CCC !important;'+
    '  box-shadow: 1px 0px 8px #000 inset !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf {'+
    '  padding: 0 20px !important;'+
    '}'+
    '#gSearch, #Mses6b {'+
    '  border-radius: 4px !important;'+
    '  padding: 9px 16px !important;'+
    '  text-decoration: none !important;'+
    '}'+
    '.gBtn, #dateTime, #gSearch, #Mses6b, center > input, #gb > div > div.gb_0a.gb_E.gb_k.gb_1a.gb_la .gb_Pe {'+
    '  background-color: #303030 !important;'+
    '  border: 1px solid #CCC !important;'+
    '  box-shadow: 1px 0px 4px #000 inset !important;'+
    '  color: #AAA !important;'+
    '  cursor: pointer !important;'+
    '}'+
    '.gBtn:hover, #dateTime:hover, #gSearch:hover:hover, #Mses6b:hover, center > input:hover, #gb > div > div.gb_0a.gb_E.gb_k.gb_1a.gb_la .gb_Pe:hover {'+
    '  background-color: #444 !important;'+
    '  border: 1px solid #000 !important;'+
    '  box-shadow: none !important;'+
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
    '.xtSCL {'+
    '  border-top: 1px solid transparent !important;'+
    '}'+
    '.aajZCb {'+
    '  background: #333 !important;'+
    '}'+
    '.aajZCb li span {'+
    '  color: #FFF !important;'+
    '}'+
    '.aajZCb li:hover {'+
    '  background: #222 !important;'+
    '}'+
  '');

})();
