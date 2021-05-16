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
        dayord = DayOrd.split(','),
        icon1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABT0lEQVR42mNkAAKp9Iv/GYgELMxMYJqZmZHh/mQdRkZSNMPAfwZGMM0IYpFjADJANyCMkIaHocYgahVOA57O0Fv17x8Dw7//IH8ygB37H6qCEcj5s5c1DK8BD6fqrTp+5w9DRP81hsNNOgxyIkwMJ+/+ZQjrvcoANJywAQ+m6K16/O4fg5IYE4N0xiWGvXU6DM5NV8CSRBkA8sLbL/8Z9EouM2yq0GYwVmBmuPrkL4NbC5EueDRNb9XDNwgXPJ6ux3D9KQkG3Jqou+rcg7/gMPAwUmWYncrJcPPZXwaXZiINeDJdbxUjJJ0w/PzDwMDOwsDw+y+Ez8pMRCzcmqyyCpLaGKDpDRWwH+IP+/+TGayGkf0vA6Ncs+3/X39/E52QLh3+uwqZj24AQQA0AM4W23uakVGx1eH/998/SDYApJkB5k2JBguiMxTIAJhmEAAA4quznkbNVyMAAAAASUVORK5CYII=',
        icon2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMElEQVR42mN85Wz6nwEIfjEw9MvsPV3EQAT4vYelD0gVgtiMMANA4DMjY9gU3Ygt/PyffjY0NPxD0sMYGrqKSVv7Gnu1TYs3kL8KLoFsAMyQQ9GZm7m5uX+Hhob+a2xsZGRgsGeSlPzMlqQchKIZqwEwQxbbJG9lYHj+B8T/ws3N2m5Y6YWuGWyAU+uX/yv2OWL1K8gguYpzDNg0goDlG3+IASAOLkMEK88z4NIMdwFMEJsh2AyAacYwAARm73cK4/3/fxUOA8KAmlEDEd2AfdU8jHddzEJhhiAZEMbq8me1yYrg/wQNANEwQ6AGgDWDGEQZAIx/5tWrV/8FGQKKBZBmmBixLmAEpkRGLS0txmvXrv2vr6//z8jI+J9oF4Do////g2mYRhgYQgbgAugGAAAzKLYhKvyRPwAAAABJRU5ErkJggg==',
        icon3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACEElEQVR42o2Ty2sTURTGv9kIJZGx4kJUrGhQFELQcSPJygekKYg7l/VNjIsgqAVbF+6s4J/gwrbRYqfRjbErH+hK4zLgwpY4o41CxReMZcjM9d5zcm9GV71w577O9zvfPZexsMa2dOKIEN0IQghAxMg0Xllq31qLePH4YaUCYsEAmkvI09eWtedBmaHgw7g3cphcy8AX7kfK2vz2k4DO4HoCqCBr9/0yhb8ZvoUw7uLQwnUDiKXoOYkFmivf8f7XH4LuSw/gwGCaAZnaBfG2NImDjTE05aja/idXjaNnEmCp7Cs/GCDne+0UHNkJsEsClNBpXCPxu9JtAqjsdI0owsu6xy70FTakaa26tbN2Xmjh/9nVgZdfxlJ1lbIlC6iGzIIs4o6Zc0JXmyVIiDu0241ieJdDsq8zqxegZxyaOdsHiB4gIVa9FdxBEATYePMKA+RzquwE2D59RmiRhviFL0b8e9McPM+j/YGxCgE+VCdQLBYZsG3qtHGgml/omAuNuPOYLcckVpAwDGGPV/H1xiTy+TwDtiYAnwp92yNuHdrabDmi83a7jaB2F+tOjsJxHAZsmTpFcZ8Ly8ZFSYp1MQgnPw8vMqTVaiGVSiGXyzFg871R0TG2pXi+boToibWTuQr/TL7vI5vNMkAsHhP9zI/+EZriJoBuhZ3Ytq0BR+ls2H1sRMlXSV5D79cvRQbwF5scUJszafjwAAAAAElFTkSuQmCC',
        icon4 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABzklEQVR42pWTvUscQRjGn3dm78RwfqGYcLn6hGskVSCFjYVcc1Zu/oH0VtqEI4VNCsWQnGgsJNi5JxY2KuJ3DisRAzGQFLGJFhaxSCKsuzO+M3uai1nFG5hi3o/fPM87uyTWfw2g+bPXnFrAWWvg4tFYGXUssgDAo2wR0tcIk4QwM051ATRJj1QI6ipCSUCTMLl7qbEA1cAAzSefA7khKCSqaaZB3wmKFKSkpy/4wBDyQyD3kiHiuiiHhzjEaSwoUtAkWAHBQrgfvHV6Dmg5+Kf468k+sk826X9Ai/SgNUjVQAJjZ5iVOKwlwLPz31g9moFu4LiE2/gU5b+AdgaYJlUDsXaYkiti8WgFvedf7I3a4XjSdNoRuRGgwygwAI4HpgrXSuY/DCH/vBQ11QIce4wAupMBJln1f6Wk/P41+j59ZHcEerEHp+vnFeCGhTQ/Y1C9oQrpPv6OrVeDNpZwlBkR5OgaGnsQM8THkQViC5pBs9NjyO9UICQ/Jg/DESFCJdzWvdVbnjETWTAzmHzzFv2VbSSEguQthIptjAVMld6hsLFlEw+Sfpkb3ft9yhnypkoT6Fuu4EL7yH5bqu9nKvzY9cZHSmhr+nOn3Lh1CbI13UN9EkzxAAAAAElFTkSuQmCC',
        icon5 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACM0lEQVR42oWTz2sTQRTHvzOzWxrzY1uNpoGKTYkHhdZLaa1VUTCKNhZtTEU8+uOmtCcVvXgRUWulB/8FIaVe/AWeBC8KogdFRCUUS4n4o5q0S9TN7vpmdhuSFtLHzrzdZd7nve+8GZa5Y+YYnKzrAg7IXPVAfmuCj0yPBqfQwFhmYsFljHtBywCCY4oAIw0BwzWA2mDpHauEBxfirCHgqA/wCPUAOfWE3qAzNAshGA0Bh3Q6NDHm0jpGgNseYH0YOLXLQjQIFIrA+FMdFVrcYZg43fcTa1sjBKBKXS+T9Ap0hAAAx+VBC4/fCrz+whFuBkplrxJOmca259EWDSAcWkOZWT1gaNyrYPLEP5y/14R9Wxykttqo2MCl+7qSkk4WsKPzLyanH+Hq2ZNV/bZtE+CWB7iStvDkncCrGY7ehIOBpEMyNLUPBptDV+glNE3Aph/zCyY2xqIY2tkDdtgHbIgAZ2gPYgbwvcRw95lQXlYgmIOD8efoSsaQnysg2mqge3PCk5C+WdPGJavriKv8/vY8fnx9gUBzE46nBqgaTXWFDd7w27gyvhosp47IPILFh2gxgji2tw+6rqsNZYeWAaptqqHJd44KRns/omyZeD8zi8yefnBOAHkXzD92dmV2OmVMDg6fid2J3xjuXsS3X0W0rWvxJDQ6pgeuL0pwzv+cuNj/eSweCygw59yTgFXMh2TPbfuQ3dQeUK2UpUuAugurAZYg11KfcrquKYDKTMM0y/gPuRvvNRWbsbkAAAAASUVORK5CYII=',
        icon6 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAX0lEQVR42s2SwQoAIQhEx2t9X37k9n91NBGWTkE1sOxchHBeoyggJf8AGPB4KYfe6maVS/OEWAQgRlgCzJ9V/Y9KAF7lDLRGAKJTCEBKQO9f72BT/B1EWuYSmfgxAgsYuQErVcPEBlcAAAAASUVORK5CYII=',
	icon7 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZklEQVR42s2S0QrAIAhFr6/1ffMj1//VoxNB9tRYXRg7BEHYUUuBY8Dp24E1mgAqm5dviUUB+8wF5seqnqMRgqRWoHdCEJFCCEoBxvj6DV7Cz0FUy0ziU0S2J7EmLfxHsPobKaUFF2w1NVWPtXHxAAAAAElFTkSuQmCC',
        icon8 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAJyklEQVR42q1Xe3BU1Rn/3efu3fcmmyWbEBICyYZXiLRiG4udQQ0+2jo+ivZhq5bRaX3UDqWilCLSMirtdCz1Dx2pHdqxU21HZ1oroDKOtqi0IoEAeUJCSDYkm30/7717b79zd5dBizM+embOnJ2999zv9/2+7/ud73D4BGNg67KltFxN8wqay2jWVR7N0DxK8zWar4S3HO37uN/kPoZRh2ma93Ac9ws9mzku2RWfUlMflDx+u+RwACag5bOmlkoU87Gpaa2QT4hO12Las4n2/JbA5D41ADJ+Gy07zERqyrdsxVLvvGbIogbeSAN6hmah/KKo0HTC4N1QdQnJ02NIHD3Ux/k89fR0A4H4/ScCwLym5UXZ4+uRnG4EO5ZC0iIozY4gOZtDImtDwXDBgGS9z0OFnc/C5yzCW+uAULsAmhTCdH8ftGwaaiqxj167/kJscBcwHqDlSKB9eaim0WX9p00explJDoWihIKqI+tshuptBRQvzJIOrpCAnB6HMzsGuyzCbtMwt8GE1NBl7Y9NZBAd7I3Qz04CEf1IABXPh+u7ukMeJU6GjyCe92A2aUMqzyEdvh5ScxfsnhpIAvldLMJmsxEFAlRNQyEVgzZ2GO6BF+FRTNR6i/ArKQLSSfv9mDp8gIFYeD4THwawt27RRT1+bw7qRB+GJ3zg9Bwiwcshr1wLj9cLmQcEnoMoStj55FP4yjVr0NraAo0AlAwTqgGkkkmoB59HaPp1mKIDCxuJocaliCcdmDnx/j4CsOZ/ALCEc/jrnp27dC60iSMYGnMgXt8Nx2XrUCoZcFG4BY4Dx/MEgIdB/23bvgM33XAdVqxYjiKxUTIMmDRLpomMRu8TS7k3n4F/6gDamnOQGjtxpu8McvGZ26uJyZ1H/VhNc3sgMM+J6aERzEZyKHzzTxa4zwKADftz30BtyIFg2wJET2cRGxtkedDMQmEB6N+yZBNX0u9aeGVPkz51CCOjEs7Wr4b3i2utDyicbhkVBJHCLVq/s5ksHtr8CG65+UZcvvrLyOXyFgCDkrLEJv3Om6K1P/n285gztR8LWjSI9Ssw/Oq+cUjyTgKwo8qAFlyyQvQ54zg5kMS0PgfSNT+DQzStDwiCAJEMiyIzLlggCvk8vn3bnVh3x3fw9RuvRzqTKRs3StB1HboFpGTtz+kctH88gqB4Fq1hL5WxH9PHDukEQOKYvJpqcc+CK9Y0YqYXAydJSFbeC29TOwTTKOuMJEGipCuDKANIxJK4+Vu34o7bv4u71t2BRCppAdD1kmVc0zXolJhWCDkeyfFBeA/uRLiV/qtbjpHX9k5wsu0qBmCD3V3z83ldLfLMwCBO50Lgrt0GO9EuCmWhkQgAy3qJMVABcvLkKO78/g9wy9q1WP+j+5BMpcpek2GNMcDWCgC9RCVK4TBf3ox5jgjqwu04fXhULaRjP2UA9pLo9NT4Uhg6lkQstBoKlZxoqGRYLgOwjMvnmGCA3jvUi40PPogre67Ew5seQq6Qh/H2OxBefRXJ++8jEKrFgiVkmgqdl5Gn0qyJ7EfbEi9iCQ8Tp30MwOTci7tDDv0UjvWbyH7+TtgbwpCo1pkxKwQVo2yV2ZRteG3/G3js8UfR3f0lbN+2FebuP0DasgWze16GGqi1vNerABgbpBGFyQE4//M0lnRwyInzcebfByIMgNZ8yRdEMT+KE0MC8qvWw+ars5SuGgI2HA6nlYAOxQGP24end+3CEzt/g+WdXdgdrAN//Bgyf9xNpwKJEXmsqqrFghUCBoDKtpiYgfLWr7CojfJEacHYu+/oFoCWlStFoTBOAEg4LiMAngBkynybXSkzQDFnbLBqsNvsiM7GsHHTZui5NB7459vgu7rAP/4YfD4PSbNs1T9Pk8WejVQyBZUqopiKwvEmA0BaYW/C6MGDFoDJps9dFLKVZnBioIRM9w9hr22ESYnEvK2GgJUgS0KPx4MX/vIS9jz7Ozx96DB2LwpjFxWLx+UkkRLgdLpQU+O3ZjAYsPZfe00PONpbmJ2A68ATWBQWUBTqMP7e+1YI9gY7O3p8Ug4D/QXE226Evf1S4k0jBmwVBioVQEw4qQkZee7PuPjue7F+VTd6CWRRN9EQClJoPLArCoFwghoSixE2rr7qClbLKAz+C/6hvyLcYUdCc2D6SL+VhBtcgcDjDQt9mBhJI8LPh3nZvZCpCsRqElZFiELgfulv8D26Ay88sAGv9B5FqCGEtTfdgFrymKPEtein1SANYfLMRjpNPQFVAffmToSMU2hc4MbkcAKZaPQnlhDxMA+2XhJW1KyJwVMF5FZvpmxn6idUQlD2Prjj17ANDiG66ynYyFtmgFUHV8l0poIlvaKEBtMEvaIDJeqUSnDs34b2+XbITg4n3x3IG+BWls+Ch5caLV1hzmbnMHiCDouGVeCXXAXJKH9AJF1vue/HUDvCmH1gPXhStuqhxKhmB5BBK/OagTDIIJNhJkwWAF6CcWwPaibfQvsiJ4oFE6OHB8yOh/v46lmwweFUHp27qI7PG3Mw3B9BatUGyIoT0vQMFt/6PUzdfzdS132V6BVAzSaBoK1c5TS3jBMQC4BRBsDOBLP8XMtn4HlrBxZ2hKDwZ3HmxIyRy+Y3nn8YOciLeMvyVllWRExO0mmY0JFfvRFNTz2D9KWXoNC52NIBruI9z32wmzPOMWFY3hO9Vu1bp+kbv8Qcn4iGBg1qXsdo70mVvuE/dxxXGxJ/vf/ZwLxaShoPRsYTUJd8DfqcZZA4g3oB81MBEM8eg3zi71jQ5IPbnaJ+YBbxqfgHG5LqGN66WA2FGyUlEEJsUsPpaJFabQn5S++hKiKBMUtl+nne2noOgwmL/nNhoD10V4DjwJPgTR3z6hTUNNB3ohFEBia0hVuOyx/ZlFK/l23qCEKqbUFsaBRZlafGVES6jS5ELSstJnjylONMy7BlnyEh4yVehEGaj1MH4Bl5ncTIA5fbCS/dn7TZUYz3T7O+0XmhppStJhWdcHzrMj+BmGlsC5Aku62H2YwT4+Mx0nkbchQSvb4TcNVSedjKIEpFmJkopEgvHNN9sPEmmjra4JTKHXghegYTQ1FmvG7xlqNxalNKVZtVAKzgS+czIXJGxh/ycf6giykRTFs9ARExOxVDtqBbtU2Xggp8gQ4vUkmngkBTAxQnhSo9TJbziM/kED+bNHWTd33oYmLZrAJgQTXwocES0zCMZ0JzFMEbIlm1OwFbEIbgJsZlKjfe8oMnj3mBwmLSlS1LrX8+heRkEpGZYonyZd3HvZp9FAh2It1Nc7vLboo1AQWSW4Egy8xypQSo7un815I5zEbzyBZ5pkAP0XzyM11OLwDm/349/y+KQsAZaCmLAQAAAABJRU5ErkJggg==';

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
