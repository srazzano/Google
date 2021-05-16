// ==UserScript==
// @name          Pale Moon Forum
// @id            srazzano/Pale Moon Forum@greasespot.net
// @version       1.0.2
// @namespace     srazzano
// @description   Pale Moon Forum Tweaks
// @author        Sonny Razzano
// @include       https://forum.palemoon.org*
// @icon          https://raw.githubusercontent.com/srazzano/Images/master/logo.png
// @homepageURL   https://github.com/srazzano/Pale_Moon_Forum
// @downloadURL   https://raw.githubusercontent.com/srazzano/Pale_Moon_Forum/master/Pale_Moon_Forum.user.js
// @support       srazzano@gmail.com
// @grant         GM_addStyle
// @grant         GM_getValue
// @grant         GM_setValue
// ==/UserScript==

(function () {

  'use strict';

  const sheetType = '/* AGENT_SHEET */',
        mozDocument = '@-moz-document domain(forum.palemoon.org)',
        sheetDomain = sheetType + mozDocument,
        timerInterval = 10000,
        customCheckbox = true,
        customScrollbar = true,
        fontSize = '105%',
        bodyBG = '#F0F0F0',
        headerBG = 'linear-gradient(#4D85CA, #314A85)',
        headerText = '#FFFFFF',
        boardBG = 'linear-gradient(#4D85CA, #314A85)',
        boardHoverBG = '#001752',
        rowHover = '#FFFFFF',
        lockedBG = '#EED9D9',
        lockedHoverBG = '#FFEAEA',
        textColor = '#FFFFFF',
        textHoverColor = '#FFFFFF',
        imgInsert = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAY0lEQVR42mNkwAcy1/0H09ODGHEpYSRogEEgA8OF9TgNIc4AEMBhCPEG4DCENAOwGMIIDyhcAN0ANEMYsdpCDIAaQr4BUEMG0AAUL1AUiPgAUdFIigEUJSSKkjJFmQkE8GRnACyoSj2cch09AAAAAElFTkSuQmCC',
        imgClear = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACZUlEQVR42p2Ta0iTURzGn3duvrt4fd+cNq/zSmkXV4zhKktECRP8YFkUQUXSh6Lbl6QoyYhiOryARSFBhCF9GHTBIrIPUpmpwxWWoULa3Hjn9m65a9tcmwsjTDSfb+c55//j//zPOQRWqaKb95q4Af80sZriwkttT7Wigooc89DYfwPK7vQc7BkYeeCLobCFN3N/xYDS229bvjkl+7+eTReH1kSzDtvt/ceXBexSv1LrExVnHKSQ0OsngYAIV2po1CcBssYXT5YElKg0dcOZVdeFvjlsSuJgYhZI4ACfXIDZZAIsRqSYddYlAZldVt/4vtiIrc+BQZMH+RQJowdIEwB6ZxDiAOLGur3/BMjVmsfrdlZVZqzFfKshlb8EelnA5ZxFlDAadrsb6R9vLb7GkpbOk72i4rZEsQTbksNenuQPqN4IdGuBfu0gZLbXHX8BFO2aR1Ope6qTuFxMBLOyrDW8wQarUqU4kEKisyhs8U+oAjkzuiyi9MLFyFk+1TyZW3GUH5dHRgYAgxfID2b94gofXhMRah34bmEA4ygQFQ+qq3bYMvBuM6E4fa5mWpjaOkXJxQF/DOC3ITlbCT0zApl0/TyAxwPes15IhTxYfgI2ZhKF4x1qbdPV8wsRCg8f2c043Spmw958LxNsObscoH8P4YceENGA2wqSSofHw0D2QVU31NZ4Y9EQ5cdqpazD3mClMipNtDxm3hztA4pPAWNvAHEWQAIbP3c06O62X17uJe6IpuOVHDqhmlOgyPGSAv6cIJozR8Zycn2GaysBLCj0iWzTWmVo2AZeGlnG9h0yPmt9+As0sN6pDq4A3QAAAABJRU5ErkJggg==',
        imgPalemoon = 'data:image/png;base64,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',
        bullet = '\u2022',
        textPaleMoon = 'Pale Moon ',
        linkAddonsSite = 'add-ons site',
        Url1 = 'https://www.palemoon.org/',
        Url2 = 'https://addons.palemoon.org/extensions/',
        textInA = ' (in ',
        linkHomePage = 'home page',
        linkNewTab = 'new tab',
        textBracket = ')',
        searchKeyword = 'Search for keywords...',
        insertField = 'Insert selected text into search field',
        clearField = 'Clear search field',
        hideStats = 'Stats',
        hideFooter = 'Footer',
        viewBoardsText = 'View All Boards',
        viewBoardsTip = 'View All Unchecked Boards',
        hideBoardsText = 'Hide Unchecked Boards',
        hideBoardsTip = 'Hide All Unchecked Boards',
        dateTimeTip = 'Current Local Time',
        Weekday = 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
        WeekdayAbbr = 'Sun.,Mon.,Tue.,Wed.,Thu.,Fri.,Sat.',
        Month = 'January,February,March,April,May,June,July,August,September,October,November,December',
        MonthAbbr = 'Jan.,Feb.,Mar.,Apr.,May,Jun.,Jul.,Aug.,Sep.,Oct.,Nov.,Dec.',
        MonthNo = '1,2,3,4,5,6,7,8,9,10,11,12',
        DayNo = '"",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31',
        DayOrd = '"",1st,2nd,3rd,4th,5th,6th,7th,8th,9th,10th,11th,12th,13th,14th,15th,16th,17th,18th,19th,20th,21st,22nd,23rd,24th,25th,26th,27th,28th,29th,30th,31st';

  function $(q, root, single, context) {
    root = root || document;
    context = context || root;
    if (q[0] == '#') return root.getElementById(q.substr(1));
    if (q[0] == '.') {
      if (single) return root.getElementsByClassName(q.substr(1))[0];
      return root.getElementsByClassName(q.substr(1));
    }
    if (q.match(/^[\/\.]/)) {
      if (single) return root.evaluate(q, context, null, 9, null).singleNodeValue;
      var arr = [], 
          xpr = root.evaluate(q, context, null, 7, null);
      for (var i = 0; i < xpr.snapshotLength; i++) arr.push(xpr.snapshotItem(i));
      return arr;
    }
    if (single) return root.getElementsByTagName(q)[0];
    return root.getElementsByTagName(q);
  }

  function $c(type, props, evls) {
    var node = document.createElement(type);
    if (props && typeof props == 'object') {
      for (var prop in props) {
        if (typeof node[prop] == 'undefined') node.setAttribute(prop, props[prop]);
        else node[prop] = props[prop];
    } }
    if (evls instanceof Array) {
      for (var i = 0; i < evls.length; i++) {
        var evl = evls[i];
        if (typeof evl.type == 'string' && typeof evl.fn == 'function') node.addEventListener(evl.type, evl.fn, false);
    } }
    return node;
  }

  function $n(type, props) {
    var node = document.createTextNode(type);
    if (props && typeof props == 'object') for (var prop in props) node[prop] = props[prop];
    return node;
  }

  function $q(el, all) {
    if (all) return document.querySelectorAll(el);
    return document.querySelector(el);
  }

  function aDateTime() {
    var date = new Date(),
        wd = date.getDay(),
        mth = date.getMonth(),
        dy = date.getDate(),
        yr = date.getFullYear(),
        hr = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds(),
        weekdaylong = Weekday.split(','),
        weekdayabbr = WeekdayAbbr.split(','),
        monthlong = Month.split(','),
        monthabbr = MonthAbbr.split(','),
        monthnum = MonthNo.split(','),
        daynum = DayNo.split(','),
        dayord = DayOrd.split(','),
        ww = weekdayabbr[wd] + ' ',
        wwww = weekdaylong[wd] + ', ',
        m = monthnum[mth] + ' ',
        mm = monthabbr[mth] + ' ',
        mmmm = monthlong[mth] + ' ',
        dd = daynum[dy] + ', ',
        dddd = dayord[dy] + ', ',
        yy = yr - 2000,
        yyyy = yr,
        hr12, hr24, ampm;
    if (hr > 12) {hr12 = hr - 12; hr24 = hr} 
    else {hr12 = hr; hr24 = hr}
    if (hr < 10) {hr12 = hr; hr24 = '0' + hr}
    if (hr === 0) {hr12 = 12; hr24 = '00'}
    hr < 12 ? ampm = ' AM' : ampm = ' PM';
    min < 10 ? min = ':0' + min : min = ':' + min;
    sec < 10 ? sec = ':0' + sec : sec = ':' + sec;
    // OPTIONS: (ww / wwww) + bullet + (m / mm / mmmm) + (dd / dddd) +  (yy / yyyy) + bullet + (hr12 / hr24) + (min) + (sec) + (ampm)
    return ww + '\u2022\u2004' + mm + dd + yyyy + '\u2004\u2022\u2005' + hr12 + min + ampm;
  }

  function CollapseExpandBoards(e) {
    var bool = GM_getValue(e.id) !== false ? false : true,
        elm = e.parentNode,
        sty = bool ? 'block' : 'none';
    GM_setValue(e.id, bool); 
    elm.setAttribute('opened', bool);
    elm.childNodes[2].lastElementChild.style.display = sty;
  }

  function ViewHideBoards(bool) {
    for (var i = 0, elm = $('.boardCB'); i < elm.length; i++) {
      if (elm[i].checked === false) {
        if (bool) elm[i].parentNode.style.display = 'none';
        else {
          elm[i].parentNode.style.display = 'block';
          elm[i].parentNode.childNodes[2].lastElementChild.style.display = 'none';
  } } } }

  function ViewHideFooter(e) {
    var bool = GM_getValue(e.id) !== false ? false : true;
    GM_setValue(e.id, bool);
    $('#hidefooter').checked = bool;
    if (bool) $('#page-footer').removeAttribute('hide-footer');
    else $('#page-footer').setAttribute('hide-footer', true);
  }

  function ViewHideStats(e) {
    var bool = GM_getValue(e.id) !== false ? false : true;
    GM_setValue(e.id, bool);
    $('#hidestats').checked = bool;
    if (bool) $('#page-body').removeAttribute('hide-stats');
    else $('#page-body').setAttribute('hide-stats', true);
  }

  var timer,
      head = $q('HEAD'),
      body = $('#phpbb'),
      classStr = body.getAttribute('class'),
      ActionBar = $('.action-bar', $('#page-body'), 1),
      Link0 = $c('a', {id: 'aLink0', textContent: linkNewTab.toUpperCase()}, [{type: 'click', fn: function() {window.open(Url1, '_blank')}}]),
      Label0 = $n('text', {textContent: textBracket}),
      Separator = $c('span', {id: 'aSep', textContent: bullet}),
      Label1 = $n('text', {textContent: textPaleMoon}),
      Link1 = $c('a', {id: 'aLink1', href: Url2, textContent: linkAddonsSite.toUpperCase()}),
      Label2 = $n('text', {textContent: textInA}),
      Link2 = $c('a', {id: 'aLink2', textContent: linkNewTab.toUpperCase()}, [{type: 'click', fn: function() {window.open(Url2, '_blank')}}]),
      Label3 = $n('text', {textContent: textBracket}),
      Bullet = $c('span', {id: 'aBull', textContent: bullet}),
      SiteDescription = $('#site-description'),
      SiteDescriptionP = $q('#site-description > p'),
      NavMain = $('#nav-main'),
      NavBreadcrumbs = $('#nav-breadcrumbs'),
      IconNotification = $q('.icon-notification > a > strong'),
      IconPM = $q('.icon-pm > a > strong'),
      url = window.location.href.toLowerCase(),
      pmindex = url.match('https://forum.palemoon.org/index'),
      pmforum = url.match('https://forum.palemoon.org/viewforum'),
      pmtopic = url.match('https://forum.palemoon.org/viewtopic'),
      pmsearch = url.match('https://forum.palemoon.org/search'),
      pmucp = url.match('https://forum.palemoon.org/ucp'),
      pmapp = url.match('https://forum.palemoon.org/app');

  if (!GM_getValue('hidestats')) GM_setValue('hidestats', false);
  if (!GM_getValue('hidefooter')) GM_setValue('hidefooter', false);
  if (!GM_getValue('Board1')) GM_setValue('Board1', false);
  if (!GM_getValue('Board2')) GM_setValue('Board2', false);
  if (!GM_getValue('Board3')) GM_setValue('Board3', false);
  if (!GM_getValue('Board4')) GM_setValue('Board4', false);
  if (!GM_getValue('Board5')) GM_setValue('Board5', false);
  if (!GM_getValue('Board6')) GM_setValue('Board6', false);
  if (!GM_getValue('Board7')) GM_setValue('Board7', false);
  if (!GM_getValue('Board8')) GM_setValue('Board8', false);
  if (!GM_getValue('Board9')) GM_setValue('Board9', false);
  if (!GM_getValue('Board10')) GM_setValue('Board10', false);

  if (head.innerHTML.match('pycode')) body.setAttribute('class', 'pycode ' + classStr);
  else body.setAttribute('class', 'prosilver ' + classStr);

  try {
    SiteDescriptionP.innerHTML = SiteDescriptionP.innerHTML.replace('Visit the', '').replace('Discussion forum for the Pale Moon web browser', '').replace(/\(or\s+in/, '(in').replace(/\sa\s/g, ' ');
    $('#keywords').placeholder = searchKeyword;
    $q('A[href="//www.palemoon.org/"][target="_blank"][style="color:#ffff80;"]').style.display = 'none';
    $q('A[href="//www.palemoon.org/"][style="color:#ffff80;"]').innerHTML = linkHomePage.toUpperCase();
    $q('A[href="//www.palemoon.org/"][target="_blank"][style="color: rgb(255, 255, 128); display: none;"]').nextSibling.nodeValue = '';
    SiteDescription.appendChild(NavMain);
    SiteDescriptionP.appendChild(Link0);
    SiteDescriptionP.appendChild(Label0);
    SiteDescriptionP.appendChild(Label1);
    SiteDescriptionP.appendChild(Link1);
    SiteDescriptionP.appendChild(Label2);
    SiteDescriptionP.appendChild(Link2);
    SiteDescriptionP.appendChild(Label3);
    SiteDescriptionP.insertBefore(Separator, Label1);
    SiteDescriptionP.appendChild(NavBreadcrumbs);
  } catch(ex) {}

  var dt = $c('span', {id: 'date-time'}),
      sd = $q('#site-description > H1'),
      nm = $('#nav-main'),
      spn = $c('span', {id: 'stats-footer'}),
      ckBox1 = $c('input', {id: 'hidestats', className: 'headerCB checkbox', type: 'checkbox'}, [{type: 'click', fn: function() {ViewHideStats(this)}}]),
      hsl = $c('label', {id: 'hidestatsLabel', textContent: hideStats}, [{type: 'click', fn: function() {ViewHideStats(this.previousSibling)}}]),
      ckBox2 = $c('input', {id: 'hidefooter', className: 'headerCB checkbox', type: 'checkbox'}, [{type: 'click', fn: function() {ViewHideFooter(this)}}]),
      hfl = $c('label', {id: 'hidefooterLabel', textContent: hideFooter}, [{type: 'click', fn: function() {ViewHideFooter(this.previousSibling)}}]),
      bool1 = GM_getValue('hidestats'),
      bool2 = GM_getValue('hidefooter');
  sd.appendChild(dt);
  dt.textContent = aDateTime();
  dt.title = dateTimeTip;
  dt.addEventListener('mouseover', function() {dt.textContent = aDateTime()}, false);
  spn.appendChild(ckBox1);
  spn.appendChild(hsl);
  spn.appendChild(ckBox2);
  spn.appendChild(hfl);
  nm.insertBefore(spn, nm.firstChild);
  $('#hidestats').checked = bool1;
  $('#hidefooter').checked = bool2;
  if (bool1) $('#page-body').removeAttribute('hide-stats');
  else $('#page-body').setAttribute('hide-stats', true);
  if (bool2) $('#page-footer').removeAttribute('hide-footer');
  else $('#page-footer').setAttribute('hide-footer', true);

  try {
    var drop = $q('#quick-links .dropdown-contents'),
        faq = $q('#nav-main > LI:nth-child(3)'),
        rule = $q('#nav-main > LI:nth-child(4)'),
        pm = $q('#nav-main > LI:nth-child(6)'),
        sep = $c('LI', {id: 'separator'});
    drop.insertBefore(pm, drop.childNodes[15]);
    drop.appendChild(rule);
    drop.appendChild(faq);
    drop.insertBefore(sep, drop.childNodes[15]);
  } catch(ex) {}

  try {
    var srch = $('#search-box'),
        clr = $c('button', {id: 'clearBtn', className: 'clearBtn insclrBtn', title: clearField}, [{type: 'click', fn: function() {$('#keywords').value = ''}}]),
        inst = $c('button', {id: 'insertBtn', className: 'insertBtn insclrBtn', title: insertField}, [{type: 'click', fn: function() {$('#keywords').value = getSelection()}}]);
    srch.insertBefore(clr, srch.firstChild);
    srch.insertBefore(inst, srch.firstChild);
  } catch(ex) {}

  try {
    for (var i = 0, utc = $q('#nav-footer > LI.rightside', true); i < utc.length; i++) if (utc[i].textContent.match('All times')) utc[i].setAttribute('id', 'utc');
    var ut = $q('#utc > span');
    ut.textContent = ut.textContent.replace('-0', ' -').replace('-1', ' -1').replace(':00', '');
  } catch(ex) {}

  if (pmindex) {
    var hBoards = $c('button', {id: 'hideBoardsBtn', className: 'viewHideBtn', textContent: hideBoardsText, title: hideBoardsTip}, [{type: 'click', fn: function() {ViewHideBoards(true)}}]),
        vBoards = $c('button', {id: 'viewBoardsBtn', className: 'viewHideBtn', textContent: viewBoardsText, title: viewBoardsTip}, [{type: 'click', fn: function() {ViewHideBoards(false)}}]);
    ActionBar.insertBefore(hBoards, ActionBar.firstElementChild);
    ActionBar.insertBefore(vBoards, ActionBar.firstElementChild);
    for (var i = 0, item = $('.forabg'); i < item.length; i++) {
      var ckBox3 = $c('input', {id: 'Board'+(i+1), className: 'boardCB checkbox', type: 'checkbox'}, [{type: 'click', fn: function() {CollapseExpandBoards(this)}}]),
          bool3 = GM_getValue('Board' + (i+1)),
          sty3 = bool3 ? 'block' : 'none';
      item[i].insertBefore(ckBox3, item[i].firstChild);
      $('#Board' + (i+1)).checked = bool3;
      item[i].setAttribute('opened', bool3);
      item[i].style.display = sty3;
      item[i].childNodes[2].lastElementChild.style.display = sty3;
  } }

  if (pmforum) try {
    var announ = $q('.forumbg.announcement, .forumbg2.announcement'),
        ckBox4 = $c('input', {id: 'Board10', className: 'boardCB checkbox', type: 'checkbox'}, [{type: 'click', fn: function() {CollapseExpandBoards(this)}}]),
        bool4 = GM_getValue('Board10'),
        sty4 = bool4 ? 'block' : 'none';
    if (announ) {
      announ.insertBefore(ckBox4, announ.firstChild);
      $('#Board10').checked = bool4;
      announ.setAttribute('opened', bool4);
      announ.childNodes[2].lastElementChild.style.display = sty4;
    }
  } catch(ex) {}

  try {
    var lock = $q('.forumbg dt', true);
    for (var i = 0; i < lock.length; i++) {
      if (lock[i].title.match('This topic is locked')) lock[i].parentNode.parentNode.setAttribute('locked', true);
      else lock[i].parentNode.parentNode.removeAttribute('locked');
    }
  } catch(ex) {}

  if (pmsearch || pmforum || pmtopic) try {
    var srch = $q('#page-body .search-box'),
        inst = $c('button', {id: 'insertBtn2', className: 'insertBtn insclrBtn', title: insertField}, [{type: 'click', fn: function() {pmsearch ? $('#add_keywords').value = getSelection() : $('#search_keywords').value = getSelection()}}]),
        clr = $c('button', {id: 'clearBtn2', className: 'clearBtn insclrBtn', title: clearField}, [{type: 'click', fn: function() {pmsearch ? $('#add_keywords').value = '' : $('#search_keywords').value = ''}}]);
    srch.insertBefore(clr, srch.firstChild);
    srch.insertBefore(inst, srch.firstChild);
    var buf = $q('.postbody', true);
  } catch(ex) {}

  try {
    var stat1 = $q('.stat-block.online-list'),
        stat2 = $q('.stat-block.statistics'),
        stat3 = $q('.stat-block.permissions');
    if (stat3) stat1.appendChild(stat3);
    if (stat2) stat1.appendChild(stat2);
  } catch(ex) {}

  addEventListener('load', function() {timer = setInterval(function() {dt.textContent = aDateTime()}, timerInterval)}, false);
  addEventListener('unload', function() {clearInterval(timer)}, false);

  try {
    if (IconNotification.textContent != '0') GM_addStyle('\
      ' + mozDocument + ' {\
        #notification_list_button {\
          -moz-appearance: none !important;\
          background: linear-gradient(#314984, #61B0FC) !important;\
          border: 1px solid #314984 !important;\
          border-radius: 4px !important;\
          color: #FFF !important;\
          padding: 0 8px !important;\
          text-decoration: none !important;\
          text-shadow: 1px 1px 2px #000 !important;\
        }\
        #notification_list_button:hover {\
          background: linear-gradient(#61B0FC, #314984) !important;\
        }\
      }\
    ');

    if (IconPM.textContent != '0') GM_addStyle('\
      ' + mozDocument + ' {\
        .icon-pm > a {\
          -moz-appearance: none !important;\
          background: linear-gradient(#006300, #00CC00) !important;\
          border: 1px solid #006300 !important;\
          border-radius: 4px !important;\
          color: #FFF !important;\
          padding: 0 8px !important;\
          text-decoration: none !important;\
          text-shadow: 1px 1px 2px #000 !important;\
        }\
        .icon-pm > a:hover {\
          background: linear-gradient(#00CC00, #006300) !important;\
        }\
      }\
    ');
  } catch(ex) {}

  if (customCheckbox) GM_addStyle('\
    ' + sheetDomain + ' {\
      input.checkbox {-moz-appearance: none !important; border: 1px solid #FFF !important; border-radius: 3px !important; box-shadow: inset 0 0 2px #000 !important; height: 18px !important; width: 18px !important;}\
    }\
  ');
  else GM_addStyle('\
    ' + mozDocument + ' {\
      input.checkbox {position: relative !important; top: 3px !important;}\
    }\
  ');

  if (customScrollbar) GM_addStyle('\
    ' + sheetDomain + ' {\
      scrollbar {-moz-appearance: none !important; background: #000 !important;}\
      scrollbar > slider {-moz-appearance: none !important; background: rgba(0, 0, 0, .3) !important; border-width: 0 !important; border-radius: 8px !important; box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, .3), inset 3px 3px 3px 3px rgba(0, 0, 0, .3), inset -3px -3px 6px 3px hsla(0, 0%, 70%, 0.70) !important;}\
      scrollbar > slider > thumb {-moz-appearance: none !important; background-color: rgba(0, 0, 0, .8) !important; border-width: 0 !important; border-radius: 10px !important; box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, .3), inset -3px -3px 3px 3px rgba(0, 0, 0, .3), inset 5px 5px 5px 5px hsla(0, 0%, 90%, 0.80) !important;}\
      scrollbar[orient="vertical"] > slider > thumb {min-height: 35px !important;}\
      scrollbar[orient="horizontal"] > slider > thumb {min-width: 35px !important;}\
      scrollbar > slider > thumb:hover, scrollbar > slider > thumb:active {box-shadow: inset 0 0 1px 0 rgba(255, 255, 255, .2), inset 0 0 2px 2px rgba(0, 0, 0, .2), inset -3px -3px 3px 3px rgba(0, 0, 0, .5), inset 5px 5px 6px 6px hsla(0, 0%, 100%, 0.90) !important;}\
      scrollbar > scrollbarbutton {-moz-appearance: none !important; background: none !important; border: none !important;}\
      scrollbar[orient="vertical"] > scrollbarbutton {min-height: 0 !important;}\
      scrollbar[orient="horizontal"] > scrollbarbutton {min-width: 0 !important;}\
      scrollbar[orient="vertical"] {padding-left: 0 !important;}\
      scrollbar[orient="horizontal"] {padding-top: 0 !important;}\
      scrollbar-corner {display: none !important;}\
    }\
  ');

  GM_addStyle('\
    ' + mozDocument + ' {\
      html {height: 100% !important;}\
      #page-header {-moz-user-select: none !important; position: fixed !important; top: 0 !important; width: 100% !important; z-index: 2147483646 !important;}\
      #page-header > .headerbar {border-radius: 0 !important; margin: 0 !important; padding: 0 !important;}\
      #page-header > .headerbar a, #hidestatsLabel, #hidefooterLabel {font-style: italic !important; font-weight: bold !important;}\
      #site-description ul.linklist li {margin: 0 5px 0 0 !important;}\
      #site-description > p {margin: 0 !important; padding: 0 !important;}\
      #site-description > p:nth-child(3) {margin: 0 !important; padding: 0 !important;}\
      #site-description {margin: 0 !important; padding: 0 !important; width: 100% !important;}\
      #site-description br, #page-body h2, .rules, .copyright {display: none !important;}\
      .advanced-search-link span#aBull {display: none !important;}\
      #page-body > DIV:nth-child(3), #phpbb_announcement, body.section-viewforum #page-body > div:nth-child(2) > P {display: none !important;}\
      body.section-index #page-body > DIV:nth-child(3) {display: -moz-box !important;}\
      body.section-viewtopic #page-body > P {display: none !important;}\
      .rightside.responsive-search {display: none !important;}\
      #page-body > p {display: none !important;}\
      .forabg[opened="false"] .row-item dd, .forumbg[opened="false"] .row-item dd {display: none !important;}\
      #page-body[hide-stats] .stat-block {display: none !important;}\
      A[href="#faqlinks"][class="top"] {display: none !important;}\
      #page-body .stat-block {display: block !important;}\
      .stat-block.online-list > h3 > a {display: block !important;}\
      #date-time {font-size: 70% !important; margin-left: 10px !important;}\
      .header, .header a {display: block !important; font-size: ' + fontSize + ' !important; font-weight: bold !important; position: relative !important; top: -1px !important;}\
      #wrap {border: none !important; box-shadow: none !important; min-width: 100% !important; padding: 0 !important;}\
      a {border: 1px dotted transparent !important; outline: none !important;}\
      #aLink0, #aLink2 {cursor: pointer !important;}\
      #logo {padding: 6px 4px 6px 2px !important; position: relative !important; z-index: 2147483647 !important;}\
      .site_logo {background-image: url(' + imgPalemoon + ') !important; height: 70px !important; width: 70px !important;}\
      .headerbar h1 {margin: 6px 0 0 0 !important;}\
      #aSep {margin: 0 6px !important;}\
      .insclrBtn {-moz-appearance: none !important; filter: grayscale(1) !important; float: left !important; width: 29px !important;}\
      .insclrBtn:hover { filter: none !important;}\
      #search-box {border: none !important; float: right !important; margin: -58px -2px 0 0 !important;}\
      .search-box {width: 308px !important;}\
      .search-box i {font-size: 16px !important;}\
      .search-header {margin-top: 30px !important;}\
      .search-box button.search-icon, .search-box a.button {padding: 3px 4px 1px 2px !important;}\
      .advanced-search-link { margin: 7px 0 0 0 !important;}\
      ul.navlinks {border: none !important;}\
      .crumb span {margin-left: 4px !important;}\
      .icon-boardrules {margin-right: 50px !important;}\
      #nav-main {position: absolute !important; right: 4px !important; top: 0 !important;}\
      #nav-main a, #nav-main span, #viewfolder .mark {font-weight: bold !important;}\
      #nav-breadcrumbs {height: 0 !important; margin: 7px 0 0 0 !important; padding: 0 !important;}\
      #nav-breadcrumbs li {margin: 2px 8px 0 0 !important;}\
      #nav-breadcrumbs span {font-size: ' + fontSize + ' !important;}\
      #hidefooter, #hidestats {margin: 5px 0 0 0 !important;}\
      #hidefooterLabel, #hidestatsLabel {font-size: ' + fontSize + ' !important; margin: 7px 4px 0 0 !important; padding-left: 4px !important;}\
      #hidefooter, #hidefooterLabel, #hidestats, #hidestatsLabel {float: left !important;}\
      #hidefooterLabel {margin-right: 0 !important;}\
      #hidefooter:hover + #hidefooterLabel, #hidefooterLabel:hover, #hidestats:hover + #hidestatsLabel, #hidestatsLabel:hover {cursor: pointer !important; text-decoration: underline !important;}\
      #aBull {margin: 0 8px !important;}\
      .dropdown-trigger.dropdown-toggle {text-decoration: none !important;}\
      .dropdown-trigger.dropdown-toggle:hover > span {text-decoration: underline !important;}\
      #page-header, .topics, .posts, .views {cursor: default !important;}\
      #quick-links LI {border: none !important;}\
      .row strong, .lastpost > span:last-child {cursor: default !important;}\
      .action-bar a {text-decoration: none !important;}\
      .action-bar > a.button {height: 24px !important;}\
      .action-bar > a.button > span, .action-bar > a.button > i {position: relative !important; top: 3px !important;}\
      .action-bar.bar-top button.button.button-search {height: 26px !important;}\
      .action-bar.bar-top a.button.button-search-end {padding: 3px 4px !important;}\
      .mark-read.rightside:before, .mark[data-ajax]:before, .pagination > a:before {content: "\u2714" !important; margin-right: 6px !important;}\
      .mark-read.rightside {padding: 4px 6px 0 6px !important;}\
      .pagination > a {padding: 5px 6px !important; margin-bottom: 2px !important;}\
      .pagination > a.mark, .pagination > a.mark-read, .action-bar.bar-bottom .pagination a[data-ajax] {height: 21px !important; padding: 3px 6px 0 6px !important;}\
      .action-bar.bar-top .pagination {margin-bottom: -2px !important;}\
      .forabg a:hover {text-decoration: underline !important;}\
      .forabg[opened="false"] dt > .list-inner > a {height: 17px !important; top: -4px !important; padding: 3px 0 0 0 !important;}\
      .forabg[opened="true"] dt > .list-inner > a {height: 11px !important; top: -1px !important;}\
      .forumbg > div:nth-child(1) .header dt > div {position: relative !important; left: 20px !important;}\
      .forabg[opened="false"] .list-inner, .forumbg[opened="false"] .list-inner {width: 100% !important;}\
      input.boardCB {float: left !important; margin: -1px 5px 0 0 !important; padding: 0 !important; position: relative !important; z-index: 2 !important;}\
      .topiclist.forums {background: none !important;}\
      li.header dt, li.header dd, #nav-footer {-moz-user-select: none !important;}\
      li.row dl {margin: 0 !important;}\
      .topiclist.forums {margin-top: -2px !important;}\
      #team > TBODY tr, #team > TBODY tr td {border: none !important;}\
      .stat-block.online-list > h3 > a:after {content: " ?" !important;}\
      .stat-block.online-list p, .stat-block.statistics p {margin: 4px 8px !important;}\
      .stat-block.online-list p em {margin-top: 5px !important;}\
      .stat-block.online-list p * {display: inline-block !important;}\
      .stat-block.statistics {border: none !important; border-radius: 0 !important; padding: 4px 0 4px 0 !important;}\
      .stat-block.statistics > h3 {padding: 0 !important; margin: 0 4px !important;}\
      .stat-block.permissions > h3 {border: none !important; padding: 0 !important; margin: 8px 0 -4px 4px !important;}\
      #page-footer {display: -moz-box !important; margin: 0 0 0 2px !important; padding: 0 !important;}\
      #page-footer[hide-footer] {display: none !important;}\
      .navbar {background: transparent !important; padding: 0 !important;}\
      #viewfolder > DIV:first-child > DIV > FIELDSET > DIV > a {margin: 5px 0 0 0 !important; padding: 1px 6px !important; text-decoration: none !important;}\
      body.section-viewforum .button.button-secondary.dropdown-trigger.dropdown-select.dropdown-toggle {height: 24px !important; padding: 0 6px !important;}\
      body.section-viewforum .button.button-secondary.dropdown-trigger.dropdown-select.dropdown-toggle > .icon {margin-top: 5px !important;}\
      body.section-viewforum .button.button-secondary.dropdown-trigger.dropdown-select.dropdown-toggle > span i {margin-top: 2px !important;}\
      #jumpbox {height: 26px !important; margin: 0 !important; padding: 0 !important;}\
      body.section-viewforum #jumpbox span span {position: relative !important; top: 1px !important;}\
      body.section-viewtopic #jumpbox > span > span {position: relative !important; top: -2px !important;}\
      body.section-viewtopic #jumpbox > span > span > i {position: relative !important; top: 1px !important;}\
      .action-bar.actions-jump {margin-bottom: 2px !important;}\
      #jumpbox span {margin: -3px 0 0 0 !important; text-decoration: none !important;}\
      .section-viewforum .jumpbox-return {margin-top: -2px !important;}\
      #page-body .jumpbox-return {padding: 3px 6px 4px 4px !important;}\
      a.top {font-weight: bold !important; padding: 5px !important; text-decoration: none !important;}\
      #viewfolder > DIV:first-child > DIV > FIELDSET > DIV:last-child {margin-top: 5px !important;}\
      BODY[class*="section-app/rules"] #phpbb_announcement, BODY[class*="section-app/rules"] #page-body > DIV:last-child, BODY[class*="section-app/rules"] #page-footer {display: -moz-box !important;}\
      #nav-footer #utc {position: relative !important; top: -2px !important;}\
    }\
  ');

  if ($q('BODY.prosilver')) GM_addStyle('\
    ' + mozDocument + ' {\
      html, body {background: ' + bodyBG + ' !important;}\
      #page-header > .headerbar {background: ' + headerBG + ' !important; border: 1px solid #001752 !important; height: 83px !important;}\
      #site-description h1, #site-description p, #site-description span, #site-description a, #site-description i, #site-description span.username, #stats-footer > label, ul#nav-main span {color: ' + headerText + ' !important;}\
      .header, .header a {color: ' + textColor + ' !important; text-shadow: 1px 1px 2px #000 !important;}\
      .header:hover, .header:hover a {color: ' + textHoverColor + ' !important;}\
      #wrap {background: ' + bodyBG + ' !important;}\
      .insertBtn {background: url(' + imgInsert + ') no-repeat center, linear-gradient(#FFFFFF, #E9E9E9) !important; border-right: 1px solid #C7C3BF !important; border-radius: 4px 0 0 4px !important; box-shadow: 0 0 0 1px #FFF inset !important; height: 24px !important;}\
      .insertBtn:hover {background: url(' + imgInsert + ') no-repeat center, linear-gradient(#E9E9E9, #FFFFFF) !important;}\
      .clearBtn {background: url(' + imgClear + ') no-repeat center, linear-gradient(#FFFFFF, #E9E9E9) !important; border-right: 1px solid #C7C3BF !important; border-radius: 0 !important; box-shadow: 0 0 0 1px #FFF inset !important; height: 24px !important;}\
      .clearBtn:hover {background: url(' + imgClear + ') no-repeat center, linear-gradient(#E9E9E9, #FFFFFF) !important;}\
      #page-body .insertBtn {border: 1px solid #C7C3BF !important; height: 26px !important;}\
      #page-body .clearBtn {border: 1px solid #C7C3BF !important; border-left: none !important; border-right: none !important; height: 26px !important;}\
      #keywords, #add_keywords {border-radius: 0 !important; width: 181px !important;}\
      #search_keywords, #add_keywords {border-radius: 0 !important; color: #000 !important; height: 26px !important; width: 181px !important;}\
      #nav-main a, #nav-main span, #viewfolder .mark {color: ' + textColor + ' !important; text-shadow: 1px 1px 2px #000 !important;}\
      #nav-main .dropdown *, #notification_list *, #nav-main #quick-links a, .header .list-inner.with-mark, .header .mark {color: #000 !important; text-shadow: none !important;}\
      #nav-breadcrumbs a {color: ' + textColor + ' !important;}\
      #hidefooterLabel, #hidestatsLabel {color: ' + textColor + ' !important; text-shadow: 1px 1px 2px #000 !important;}\
      .icon.fa-bars.fa-fw {text-shadow: 1px 1px 2px #000 !important;}\
      #site-description {text-shadow: 1px 1px 2px #000 !important;}\
      #username_logged_in .username {color: ' + textColor + ' !important; text-shadow: 1px 1px 2px #000 !important;}\
      #username_logged_in a span {color: #000 !important; text-shadow: none !important;}\
      #page-header .dropdown li#separator {border-bottom: 1px solid #000 !important;}\
      #page-body {margin: 76px 2px 0 2px !important;}\
      .icon.fa-file-o.fa-fw.icon-red {color: ' + textColor + ' !important;}\
      .mark-read.rightside {background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; float: right !important; font-size: ' + fontSize + ' !important; height: 20px !important; margin: 0 !important; padding: 4px 6px 0 6px !important; text-decoration: none !important; text-shadow: 1px 1px 2px #000 !important; }\
      .mark-read.rightside:hover {background: ' + boardHoverBG + ' !important; color: ' + textColor + ' !important;}\
      .button.button-search icon.fa-search.fa-fw, .button.button-search icon.fa-cog.fa-fw {color: #606060 !important;}\
      .action-bar {-moz-user-select: none !important; margin: 0 0 5px 0 !important;}\
      .action-bar > a.button > i {color: #FFF !important;}\
      #page-header .button.button-search {border: none !important; border-left: 1px solid #C7C3BF !important; padding: 2px 5px 4px 5px !important;}\
      #page-header .button.button-search-end {border: none !important; border-left: 1px solid #C7C3BF !important; height: 20px !important; width: 23px !important;}\
      .action-bar .button-search-end {border: 1px solid #C7C3BF !important; margin-left: -1px !important;}\
      input.button1, input.button2, a.top, .viewHideBtn, .action-bar > a.button, #ucp .panel a.mark {-moz-appearance: none !important; background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; cursor: pointer !important; font-size: ' + fontSize + ' !important; margin: 0 5px 0 0 !important; padding: 0 6px !important; text-shadow: 1px 1px 2px #000 !important;}\
      input.button1, input.button2 {padding: 4px 6px !important;}\
      .viewHideBtn {height: 26px !important;}\
      .mark, .pagination > a, .advanced-search-link {background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; font-size: ' + fontSize + ' !important; font-weight: bold !important; padding: 4px 6px !important; text-shadow: 1px 1px 2px #000 !important;}\
      .mark-read.rightside:before, .mark[data-ajax]:before, .pagination > a:before {color: ' + textColor + ' !important;}\
      .button.button-secondary:not([class*="bbcode-"]) {-moz-appearance: none !important; background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; padding: 3px 6px !important; text-shadow: 1px 1px 2px #000 !important;}\
      .button.button-secondary .fa-fw {color: ' + textColor + ' !important;}\
      input.button1:hover, input.button2:hover, .button.button-secondary:not([class*="bbcode-"]):hover {background: ' + boardHoverBG + ' !important;}\
      .pagination li.active span, .pagination li a:hover, .pagination li a:hover .icon, .pagination .dropdown-visible a.dropdown-trigger, .nojs .pagination .dropdown-container:hover a.dropdown-trigger {background: ' + boardBG + ' !important; border-color: #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important;}\
      .pagination li.active span {background: ' + boardHoverBG + ' !important; cursor: default !important;}\
      .pagination li a:hover {background: ' + boardBG + ' !important; color: ' + textColor + ' !important;}\
      .mark:hover, .pagination > a:hover, .advanced-search-link:hover {background: ' + boardHoverBG + ' !important;}\
      .forabg, .forumbg {background: ' + boardHoverBG + ' !important; border: 1px solid #001752 !important; border-radius: 6px 6px 12px 12px !important; box-shadow: inset 0 0 1px #FFF !important; margin: 0 0 5px 0 !important; padding: 4px 4px 3px 4px !important; position: relative !important;}\
      .forabg:hover .header a, .forumbg:hover .header a {color: ' + textHoverColor + ' !important;}\
      .forabg[opened="false"], .forumbg[opened="false"] {background: ' + boardBG + ' !important; border-radius: 4px !important; height: 17px !important; width: 310px !important;}\
      .forabg[opened="false"]:hover, .forumbg[opened="false"]:hover {background: ' + boardHoverBG + ' !important;}\
      .forabg[opened="true"], .forumbg[opened="true"] {background: ' + boardHoverBG + ' !important;}\
      .forumbg.forumbg-table {border: 2px solid #001752 !important; box-shadow: none !important;}\
      #team > TBODY tr:last-child {border-radius: 0 0 9px 9px !important;}\
      .forabg li:last-child, .forumbg.announcement ul > li:last-child, .topiclist.topics li:last-of-type {border-radius: 0 0 9px 9px !important;}\
      li.header dt, li.header dd {color: ' + textColor + ' !important;}\
      li.header dt:hover, li.header dd:hover {color: ' + textHoverColor + ' !important;}\
      #page-body > div:nth-child(5) > div > ul:last-child > li:last-child {border-radius: 0 0 9px 9px !important;}\
      #page-body > div:nth-child(6) > div > ul:last-child > li:last-child {border-radius: 0 0 9px 9px !important;}\
      body.section-index #page-body > div:nth-child(4):hover > div > ul:first-child > li > dl > dt > div {color: ' + textHoverColor + ' !important; cursor: default !important;}\
      body.section-viewforum #page-body > div:nth-child(4):hover > div > UL:first-child > li > dl > dt > div {color: ' + textHoverColor + ' !important; cursor: default !important;}\
      body.section-viewforum #page-body > div:nth-child(5):hover > div > UL:first-child > li > dl > dt > div {color: ' + textHoverColor + ' !important; cursor: default !important;}\
      body.section-viewforum #page-body > div:nth-child(6):hover > div > UL:first-child > li > dl > dt > div {color: ' + textHoverColor + ' !important; cursor: default !important;}\
      .row-item.forum_unread .list-inner {color: #000 !important;}\
      .row:hover {background-color: ' + rowHover + ' !important;}\
      .forumbg li[locked] {background: ' + lockedBG + ' !important;}\
      .forumbg li[locked]:hover {background: ' + lockedHoverBG + ' !important;}\
      .stat-block.online-list {color: #000 !important;}\
      .stat-block.online-list {background: #F0F4F9 !important; border: 5px solid #001752 !important; border-radius: 6px 6px 12px 12px !important; margin-bottom: 5px !important; padding: 0 !important; width: 800px !important;}\
      .stat-block.online-list > h3 {background: ' + boardHoverBG + ' !important; border: none !important; margin: -5px 0 0 0 !important;padding: 5px 6px !important; text-decoration: none !important; text-shadow: 1px 1px 2px #000 !important;}\
      .stat-block.online-list > h3 > a {color: ' + textColor + ' !important; display: block !important;}\
      #page-body > DIV:last-child > DIV > P > STRONG * {color: #000  !important;}\
      #page-body .stat-block.online-list:hover {background: ' + rowHover + ' !important;}\
      #nav-footer {background: ' + boardHoverBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; margin: 0 !important; padding: 0 4px !important; text-shadow: 1px 1px 2px #000 !important; width: 800px !important;}\
      #nav-footer > li {height: 24px !important; padding: 0 !important; margin-top: -1px !important;}\
      #utc:before {color: ' + textColor + ' !important; content: "\u2022" !important; font-family: monospace !important; font-size: 24px !important; margin-left: 4px !important; position: relative !important; top: 3px !important;}\
      #utc {cursor: default !important; margin: 0 4px 1px 0 !important; position: relative !important; top: 0 !important;}\
      #nav-footer a, #nav-footer span, #nav-footer i {color: ' + textColor + ' !important;}\
      #viewfolder > DIV:first-child > DIV > FIELDSET > DIV > a, .jumpbox-return {background: ' + boardBG + ' !important; border: 1px solid #001752 !important; border-radius: 4px !important; box-shadow: inset 0 0 1px #FFF !important; color: ' + textColor + ' !important; font-size: ' + fontSize + ' !important; font-weight: bold !important; margin: 0px 0 3px 0 !important; padding: 3px 6px 3px 4px !important; text-shadow: 1px 1px 2px #000 !important;}\
      .jumpbox-return * {color: ' + textColor + ' !important;}\
      .jumpbox-return:hover, .advanced-search-link:hover, #viewfolder > DIV:first-child > DIV > FIELDSET > DIV > a:hover {background: ' + boardHoverBG + ' !important;}\
      body.section-posting #nav-footer > LI:nth-child(3) {margin-top: 1px !important;}\
      #viewfolder .header dd.mark {background: none !important; border: none !important; color: #000 !important; text-shadow: none !important; }\
      #ucp .topiclist > .header > dl a, #ucp .row-item, #ucp .mark, #ucp span {background: none !important; border: none !important; color: #000 !important; cursor: default !important; text-decoration: none !important; text-shadow: none !important;}\
      .row-item.pm_read .mark {background: none !important; border: none !important;}\
      a.top {padding: 4px !important;}\
      a.top i {color:#FFF !important;}\
      a.top:hover, .viewHideBtn:hover, .action-bar > a.button:hover, #ucp .panel a.mark:hover {background: ' + boardHoverBG + ' !important; color: ' + textHoverColor + ' !important;}\
      #quick-links .dropdown .pointer, #username_logged_in .dropdown .pointer {border-color: #001752 transparent !important;}\
      #quick-links .dropdown .pointer-inner, #username_logged_in .dropdown .pointer-inner {border-color: #001752 transparent !important; bottom: -9px !important;}\
      #quick-links .dropdown-extended .pointer-inner, #username_logged_in .dropdown-extended .pointer-inner {border-color: #001752 transparent !important;}\
      #quick-links .dropdown .dropdown-contents, #username_logged_in .dropdown .dropdown-contents {background: #001752 !important; border-color: #000 !important; margin-top: -1px !important;}\
      #nav-main #quick-links .dropdown .dropdown-contents i, #nav-main #username_logged_in .dropdown .dropdown-contents i {color: #CCC !important;}\
      #nav-main #quick-links .dropdown .dropdown-contents span, #nav-main #username_logged_in .dropdown .dropdown-contents span {color: #CCC !important; text-shadow: 1px 1px 2px #000 !important;}\
      #nav-main #quick-links .dropdown .dropdown-contents li#separator, #nav-main #username_logged_in .dropdown .dropdown-contents li#separator {border-color: #CCC !important;}\
      #nav-main #quick-links .dropdown .dropdown-contents li:hover i, #nav-main #username_logged_in .dropdown .dropdown-contents li:hover i {color: #FFF !important;}\
      #nav-main #quick-links .dropdown .dropdown-contents li:hover span, #nav-main #username_logged_in .dropdown .dropdown-contents li:hover span {color: #FFF !important; text-decoration: underline !important;}\
      #username_logged_in .dropdown .separator {display: none !important;}\
      #username_logged_in .dropdown li {border: none !important;}\
    }\
  ');
  else GM_addStyle('\
    ' + mozDocument + ' {\
      #page-header a, #page-header label {color: #CCC !important;}\
      #page-header a:hover, #page-header label:hover {color: #FFF !important;}\
      #page-header > .headerbar {background: #42474F !important; border: 1px solid #000 !important; height: 88px !important;}\
      .insertBtn {background: #4E545C url(' + imgInsert + ') no-repeat center !important; border: 1px solid #000 !important; height: 26px !important;}\
      .insertBtn:hover {background: #565D67 url(' + imgInsert + ') no-repeat center !important;}\
      .clearBtn {background: #4E545C url(' + imgClear + ') no-repeat center !important; border-top: 1px solid #000 !important; border-bottom: 1px solid #000 !important; height: 26px !important;}\
      .clearBtn:hover {background: #565D67 url(' + imgClear + ') no-repeat center !important;}\
      .button.button-search {border: none !important; border-top: 1px solid #000 !important; border-bottom: 1px solid #000 !important;}\
      .button.button-search-end {border: 1px solid #000 !important; border-radius: 0 !important;}\
      #keywords, #search_keywords, #add_keywords {border: 1px solid #000 !important; border-radius: 0 !important; height: 26px !important; width: 181px !important;}\
      #hidefooter:hover + #hidefooterLabel, #hidefooterLabel:hover, #hidestats:hover + #hidestatsLabel, #hidestatsLabel:hover {color: #FFF !important;}\
      #quick-links .dropdown-contents {min-height: 320px !important; width: 180px !important;}\
      #page-body {margin: 80px 2px 0 2px !important;}\
      .mark-read.rightside {float: right !important; font-size: ' + fontSize + ' !important; height: 20px !important; margin: 0 !important; padding: 4px 6px 0 6px !important; text-decoration: none !important;}\
      .action-bar {-moz-user-select: none !important; margin: 5px 0 !important;}\
      #page-header .button.button-search {padding: 2px 5px 4px 5px !important;}\
      #page-header .button.button-search-end {height: 20px !important; width: 23px !important;}\
      .action-bar .button-search-end {margin-left: -1px !important;}\
      a.top, .viewHideBtn, .action-bar > a.button, #ucp .panel a.mark {cursor: pointer !important; font-size: ' + fontSize + ' !important; margin: 0 5px 0 0 !important; padding: 0 6px !important; text-shadow: 1px 1px 2px #000 !important;}\
      .viewHideBtn {background-color: #4E545C !important; border-color: #202225 !important; color: #CCC !important; height: 26px !important;}\
      .mark, .pagination > a, .advanced-search-link {font-size: ' + fontSize + ' !important; font-weight: bold !important; padding: 4px 6px !important;}\
      .button.button-secondary:not([class*="bbcode-"]) {padding: 3px 6px !important;}\
      .pagination li.active span {cursor: default !important;}\
      .forabg, .forumbg {margin: 0 0 5px 0 !important; padding: 4px 4px 3px 4px !important; position: relative !important;}\
      .header {background: linear-gradient(#111, #333, #111) !important;}\
      li.header dt, li.header dd {color: #CCC !important;}\
      .forabg[opened="false"], .forumbg[opened="false"] {height: 17px !important; width: 310px !important;}\
      .forumbg2.announcement[opened="false"] {width: 380px !important;}\
      .forumbg2.announcement[opened="false"] .list-inner {display: inline-block !important;}\
      .forumbg2.announcement[opened="false"] dd {display: none !important;}\
      body.section-index #page-body > div:nth-child(4):hover > div > ul:first-child > li > dl > dt > div {cursor: default !important;}\
      body.section-viewforum #page-body > div:nth-child(4):hover > div > UL:first-child > li > dl > dt > div {cursor: default !important;}\
      body.section-viewforum #page-body > div:nth-child(5):hover > div > UL:first-child > li > dl > dt > div {cursor: default !important;}\
      body.section-viewforum #page-body > div:nth-child(6):hover > div > UL:first-child > li > dl > dt > div {cursor: default !important;}\
      #site-description, .row-item, .pagination {text-shadow: 1px 1px 2px #000 !important;}\
      li.row:hover {background-color: #191919 !important; border-color: #444 !important;}\
      li.row:hover .list-inner, li.row:hover .list-inner .forumtitle {color: #FFF !important;}\
      #page-body .forumbg2 {padding: 0 !important;}\
      .stat-block.online-list {background: #202225 !important; margin: 10px 0 5px 0 !important; padding: 0 !important; width: 812px !important;}\
      .stat-block.online-list > h3 {border: none !important; margin: -5px 0 0 0 !important;padding: 5px 6px !important; text-decoration: none !important;}\
      .stat-block.online-list:hover {background: #191919 !important;}\
      .stat-block.online-list:hover p {color: #FFF !important;}\
      #nav-footer {background: #202225 !important; margin: 0 !important; padding: 0 8px 0 4px !important; width: 800px !important;}\
      #nav-footer:hover {background: #191919 !important;}\
      #utc:before {content: "\u2022" !important; font-family: monospace !important; font-size: 24px !important; position: relative !important; top: 3px !important;}\
      #viewfolder > DIV:first-child > DIV > FIELDSET > DIV > a, .jumpbox-return {font-size: ' + fontSize + ' !important; font-weight: bold !important; margin: 0px 0 3px 0 !important; padding: 3px 6px 4px 4px !important;}\
      .mark, .mark-read, .jumpbox-return {background: #565D67 !important; text-shadow: 1px 1px 2px #000 !important;}\
      .mark:hover, .mark-read:hover, .jumpbox-return:hover {background: #4E545C !important;}\
      a.top {padding: 4px !important;}\
      a.top:hover i {color: #FFF !important;}\
      a.top:hover, .viewHideBtn:hover, .action-bar > a.button:hover, #ucp .panel a.mark:hover {color: #FFF !important;}\
      .stat-block.online-list .username-coloured {color: tan !important;}\
      .row .username-coloured, .row .username, .stat-block.online-list a {color: #FF0 !important;}\
      .content SPAN {color: tan !important; text-decoration: none !important; text-shadow: 1px 1px 2px #000 !important;}\
      .author .username-coloured, .author .username, .notice a.username-coloured {color: #FF0 !important;}\
      .signature {color: #F00 !important; filter: invert(80%) !important; text-shadow: 1px 1px 2px #FFF !important;}\
    }\
  ');

})();
