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

  const timerLong = 15000,
        timerShort = 500,
        elementSpacing = '8px',
        am = 'AM',
        pm = 'PM',
        formatCount = 8,
        customFormat = 'Add a format in script line 198',
        hideShow = '• Left-click to Hide/Show Date/Time',
        addRemove = '• Left-click to Add/Remove :seconds\n• Shift + Left-click to Add/Remove AM/PM\n• Ctrl + Left-click to change Date format',
        reloadTooltip = 'Reload page for changes to take effect',
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
        imgCalendar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABT0lEQVR42mNkAAKp9Iv/GYgELMxMYJqZmZHh/mQdRkZSNMPAfwZGMM0IYpFjADJANyCMkIaHocYgahVOA57O0Fv17x8Dw7//IH8ygB37H6qCEcj5s5c1DK8BD6fqrTp+5w9DRP81hsNNOgxyIkwMJ+/+ZQjrvcoANJywAQ+m6K16/O4fg5IYE4N0xiWGvXU6DM5NV8CSRBkA8sLbL/8Z9EouM2yq0GYwVmBmuPrkL4NbC5EueDRNb9XDNwgXPJ6ux3D9KQkG3Jqou+rcg7/gMPAwUmWYncrJcPPZXwaXZiINeDJdbxUjJJ0w/PzDwMDOwsDw+y+Ez8pMRCzcmqyyCpLaGKDpDRWwH+IP+/+TGayGkf0vA6Ncs+3/X39/E52QLh3+uwqZj24AQQA0AM4W23uakVGx1eH/998/SDYApJkB5k2JBguiMxTIAJhmEAAA4quznkbNVyMAAAAASUVORK5CYII=',
        imgClock = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC5ElEQVR42p2T22tcRRzHP+e2ey7J3rK76ebWXCRtUysoLYLgvaBI8EIDbaGW0vooNP0T+lLokyv4qPUSoYKCiK8iakUfkgfBmqSWamluNGmSzW525+yes2ecjUtta586w28ODPP7nJnv7/vTeGCUPnkprT4nVZxQcaC9/buKz1V8ljr1/ea957UHks9GmlnssE2EqFGNXLUr8XSB47hs+yG6DCcV5P3/AVTyR07COS1KW9wUvdSyT9Jw+9B1DbNyC3f9NwadJZxUElEWlxTkzF1A689O0imurPgs59/AHH2WXb39DHRl+fDTSxx+bZy1lWWCP3+iZ/UbCgUbsSV2bqK13iw1Y0OXDWbTx3EOHcGt3SaZSNKd798BjL96mHKlTM3dhZj+irHSZSJiaLKZaQHOeh12cbbcR/TMOVwjwLRs8rluOr3kDuDoxBFW124TBj61poX+y3uMJRapbvuTLcC0aZoH57qO0Tn2IkYosG2PbDaHE3f58uIF3qoKFt45RaMuiCwl5twP7Fv/gjAMZ1oAv24k4rcee5fO7j5MpUncdil0F9hvWMy3RJqfZ6snj++rytR91hdusvvGB8Sb5XobkIz/rQCpfAFdzXQ6zZ2ff2Xv62+yV+Vfa1dq6vIUA4MDeIak/1rxLmDasGIHZ3Nv4ww9hdFskF69Q+G5lzl/8gSbuRzDw8N4HR4xU6d3aISkv8To8sdEYTDTFtEqXg0PET5xjMRf84yOT7D043c0hgaJWzH1pDhCXb+hohIaRDNTHLBmlIjBZLuM2oa00vzRNcHgt1fYfuV5GsMjKHGJpFTqB8hmgG96hItXeXzja7RgU5VRZv4zUsot3tjoY633BWI9e7ANTbksorU21al6KAkW58iuXGEks4go1f410v1Wjp0uVSwW7KcRmVGkk1KdALoo4ZSuszucJeFUVPL2/Va+t5k0TSu6HTGEzFCVqpmkhmf6OHqJ2lYVKeXDm+lR2/kfXyNFNnilPcEAAAAASUVORK5CYII=',
        imgClock2 = 'data:image/png;base64,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',
        imgEarth = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACnUlEQVR42m1TTUgUYRh+vvn5ZnZnd2ZnTVk3icTWRPuFIDDtqJUQrKc6ei2CQPDSpUsZgtClLh2kLkkHhWghIToURnVTCDaFWq0Uf3c3dded3Z3p+2bX0a1eZmDm5Xuf53mf93sJ/op7L7easzv26PJmsTe9VfbznBkUc41hecrQhME7V4PfD54nB3+Gnmcnfq4V+3rOBWlzhILKlXzZdvA7ncf4dB6RsDw5ct3o/wfg5lh6riVKY8GAH44DCAJj1oDGcOUQYbk2M48Xn4uYWbTnHw2YrR4AZ46EpXiAFcNxHzc4kCwBx6OAWKVqNXYxnCgkBEIsroTwnr+kCsmu02HKekfAJzDpxC12Qdjrp0AsUqGTmJQWvYBbT3esjqNKGxl69sNZyIRQKAleAZUIuk+qjJ14SihT0t5UAaWije10Dm9mMyDxkV+OLYZqJsFBVErQ2aFCYSBONdfRVAHi36US8OTVMsiV4VVHolotQNUH3S+g64TqgYpCBYQbzBMPxtdALt9fcQRZw042B0kSoWgKa5V4RWeOUTYJyc3smcuBOEniAwPoufvNSW+KKBZKIOyUrMiob6qrKnFcts52H3RNqFFnl4G3H1MgF268niiUjXgRDV4L9YfDkFXZM4QDn40piJiSp2xmJonk14VJcn5gvDkQPZVcW6X0oIma7oNRr7uzc6pJrkYUCIplB+WtRWt7abbNbZaroIFD8fV0yJs/D5/uh9mge83be/IzSVjb65PTjy/1e1f54u33cyL1xVY29kfKwQhjpKydgKG5ntBSCmUrP//uYff+Vd4LrkQ1j/RtrmTprm0yNqnqWgmqmEFdxLB204sJzvzfbeTBPZF8oVHFiPZSf527zlZuI1fILk2V8pnBT2PXatb5D06f/8vKDSZRAAAAAElFTkSuQmCC',
        imgMail = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMElEQVR42mN85Wz6nwEIfjEw9MvsPV3EQAT4vYelD0gVgtiMMANA4DMjY9gU3Ygt/PyffjY0NPxD0sMYGrqKSVv7Gnu1TYs3kL8KLoFsAMyQQ9GZm7m5uX+Hhob+a2xsZGRgsGeSlPzMlqQchKIZqwEwQxbbJG9lYHj+B8T/ws3N2m5Y6YWuGWyAU+uX/yv2OWL1K8gguYpzDNg0goDlG3+IASAOLkMEK88z4NIMdwFMEJsh2AyAacYwAARm73cK4/3/fxUOA8KAmlEDEd2AfdU8jHddzEJhhiAZEMbq8me1yYrg/wQNANEwQ6AGgDWDGEQZAIx/5tWrV/8FGQKKBZBmmBixLmAEpkRGLS0txmvXrv2vr6//z8jI+J9oF4Do////g2mYRhgYQgbgAugGAAAzKLYhKvyRPwAAAABJRU5ErkJggg==',
        imgMaps = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACEElEQVR42o2Ty2sTURTGv9kIJZGx4kJUrGhQFELQcSPJygekKYg7l/VNjIsgqAVbF+6s4J/gwrbRYqfRjbErH+hK4zLgwpY4o41CxReMZcjM9d5zcm9GV71w577O9zvfPZexsMa2dOKIEN0IQghAxMg0Xllq31qLePH4YaUCYsEAmkvI09eWtedBmaHgw7g3cphcy8AX7kfK2vz2k4DO4HoCqCBr9/0yhb8ZvoUw7uLQwnUDiKXoOYkFmivf8f7XH4LuSw/gwGCaAZnaBfG2NImDjTE05aja/idXjaNnEmCp7Cs/GCDne+0UHNkJsEsClNBpXCPxu9JtAqjsdI0owsu6xy70FTakaa26tbN2Xmjh/9nVgZdfxlJ1lbIlC6iGzIIs4o6Zc0JXmyVIiDu0241ieJdDsq8zqxegZxyaOdsHiB4gIVa9FdxBEATYePMKA+RzquwE2D59RmiRhviFL0b8e9McPM+j/YGxCgE+VCdQLBYZsG3qtHGgml/omAuNuPOYLcckVpAwDGGPV/H1xiTy+TwDtiYAnwp92yNuHdrabDmi83a7jaB2F+tOjsJxHAZsmTpFcZ8Ly8ZFSYp1MQgnPw8vMqTVaiGVSiGXyzFg871R0TG2pXi+boToibWTuQr/TL7vI5vNMkAsHhP9zI/+EZriJoBuhZ3Ytq0BR+ls2H1sRMlXSV5D79cvRQbwF5scUJszafjwAAAAAElFTkSuQmCC',
        imgMSEdge = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKklEQVR42mN876/4nwEP6M96hE+agXHUgGFhAPOSd3gN+CEkNmrA8DcAAKkTP3nVsyb/AAAAAElFTkSuQmCC',
        imgNews = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAClElEQVR42o2SW0gUURjH/2cua2tby0CieYtatQyMLiBEFFmEBBFImClWREHh0lsERWJaKUFZSaAvgtFLYIH2EBUmJqwrJkpQCEUZ3toEV8fLuDPOzOnMzrTsZg8dOHO+c+b8f9/lfARxI/9GKcUWCSYoKAUINbGOqJCpAJ0SmOyQ+xLG6L2X5I+GxAN8DyopSfOAY8JUKKiSfuCoZwylU4X4rK1nABMILSJ09fm/AbmNFdSXxeNZej/cUCESHWCi6eEUtE9sRUu2GzOygtC1F6sBl8p89L4fSBY0tqPOZB5Z2GaEIPw4D1gBZJFH6+QsGgaGo1rS2eijRTsN3P3+BOGV1CjMyt8CUMe2IjfmRVDD2lNsWA7hysfrmDENkMG2dLojR8SFoQAWDCkGcBgx21qtIlq2R5PR1FeBoDwPUlWWSR9e5nB+qA8Lug3gWHCGIyZOolEQ++gsmrWqDaifnLb/y++yqP9TEEumhOICAWf3iwh+NdD0VsPFQy4c3M5HwRqr6elmBS5FxqNAOTJe95IooLs5m7aqAWzblIJzB0Q0dChITuIw8pOFm2QiSbC9G6wXwksEbpZC7fuTKOgK2IA9u3w090wPbpeno2NQYx5FpHkJRqZMLEYo9uUJsaeeCJu49fQXTr0pQVlggMSe8Vj9BK0sSsFGL4eWrmUc3y2C5zm0f9DhFp1CsvwXVbYuzKGzJoMk9EFx3Th1eyTUlIjwJgssXBPV7SpOFLqwN8euwQp7Rn/bMqDM4dXNzETAkdpxKrglCBwgsPu6YU+e2bxzy2QRqNa5MovuuqzVAH6NFN/ZTkPF9YRzpkdm0fM34HD1KAN4EwFxwvgG0yMyeu9sTgRk+/Ip4V34n0ENDWPfRqLa3wYbMFCh4PdOAAAAAElFTkSuQmCC',
        imgPhotos = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA5ElEQVR42mNkIABeOZv+B1JhYntPr8Ymz0ikASCwGmhIGCUGYDUExYCvO1hDgRQIr+b2+L0a3YB/QMyE5h1GJM2roJrhtgENCUM24D9EA4orGHFohoGwr90Gq2Ccb//+M3AxMaK6AOrsVQzYwWqgASiuwggDoAH/GfAAoAFgjVDNGFGJNRZMVgTDAjOU7+5CvLHEiEUzSngADViNI3zAYcSIphkjPIAGhOEIo9X7qnkwDMCIjTMRaxmdWr9gRDFIM4YXsLkAZACIBhoCT2RAzZgJCZcrYAYQHYjohpBlALJ3CBkAAL5FbdsK51LmAAAAAElFTkSuQmCC',
        imgPlay = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABzklEQVR42pWTvUscQRjGn3dm78RwfqGYcLn6hGskVSCFjYVcc1Zu/oH0VtqEI4VNCsWQnGgsJNi5JxY2KuJ3DisRAzGQFLGJFhaxSCKsuzO+M3uai1nFG5hi3o/fPM87uyTWfw2g+bPXnFrAWWvg4tFYGXUssgDAo2wR0tcIk4QwM051ATRJj1QI6ipCSUCTMLl7qbEA1cAAzSefA7khKCSqaaZB3wmKFKSkpy/4wBDyQyD3kiHiuiiHhzjEaSwoUtAkWAHBQrgfvHV6Dmg5+Kf468k+sk826X9Ai/SgNUjVQAJjZ5iVOKwlwLPz31g9moFu4LiE2/gU5b+AdgaYJlUDsXaYkiti8WgFvedf7I3a4XjSdNoRuRGgwygwAI4HpgrXSuY/DCH/vBQ11QIce4wAupMBJln1f6Wk/P41+j59ZHcEerEHp+vnFeCGhTQ/Y1C9oQrpPv6OrVeDNpZwlBkR5OgaGnsQM8THkQViC5pBs9NjyO9UICQ/Jg/DESFCJdzWvdVbnjETWTAzmHzzFv2VbSSEguQthIptjAVMld6hsLFlEw+Sfpkb3ft9yhnypkoT6Fuu4EL7yH5bqu9nKvzY9cZHSmhr+nOn3Lh1CbI13UN9EkzxAAAAAElFTkSuQmCC',
        imgPodcasts = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdElEQVR42mNkwAN+72H5D6JZXf4w4lLDOPgMeOVs+l9s72msGkxWBP8/E7GWEacBIM0gGmYAugtABoBoZEOoY4BT65f/+6p5GAkZgAxgehhBDJAAMQYguwCmj3IDkJ1DKBrRDQB7YXDEAtUSEqEwwAYG3gAAuNudhTC8LbkAAAAASUVORK5CYII=',
        imgTranslate = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACM0lEQVR42oWTz2sTQRTHvzOzWxrzY1uNpoGKTYkHhdZLaa1VUTCKNhZtTEU8+uOmtCcVvXgRUWulB/8FIaVe/AWeBC8KogdFRCUUS4n4o5q0S9TN7vpmdhuSFtLHzrzdZd7nve+8GZa5Y+YYnKzrAg7IXPVAfmuCj0yPBqfQwFhmYsFljHtBywCCY4oAIw0BwzWA2mDpHauEBxfirCHgqA/wCPUAOfWE3qAzNAshGA0Bh3Q6NDHm0jpGgNseYH0YOLXLQjQIFIrA+FMdFVrcYZg43fcTa1sjBKBKXS+T9Ap0hAAAx+VBC4/fCrz+whFuBkplrxJOmca259EWDSAcWkOZWT1gaNyrYPLEP5y/14R9Wxykttqo2MCl+7qSkk4WsKPzLyanH+Hq2ZNV/bZtE+CWB7iStvDkncCrGY7ehIOBpEMyNLUPBptDV+glNE3Aph/zCyY2xqIY2tkDdtgHbIgAZ2gPYgbwvcRw95lQXlYgmIOD8efoSsaQnysg2mqge3PCk5C+WdPGJavriKv8/vY8fnx9gUBzE46nBqgaTXWFDd7w27gyvhosp47IPILFh2gxgji2tw+6rqsNZYeWAaptqqHJd44KRns/omyZeD8zi8yefnBOAHkXzD92dmV2OmVMDg6fid2J3xjuXsS3X0W0rWvxJDQ6pgeuL0pwzv+cuNj/eSweCygw59yTgFXMh2TPbfuQ3dQeUK2UpUuAugurAZYg11KfcrquKYDKTMM0y/gPuRvvNRWbsbkAAAAASUVORK5CYII=',
        imgYouTube = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAX0lEQVR42s2SwQoAIQhEx2t9X37k9n91NBGWTkE1sOxchHBeoyggJf8AGPB4KYfe6maVS/OEWAQgRlgCzJ9V/Y9KAF7lDLRGAKJTCEBKQO9f72BT/B1EWuYSmfgxAgsYuQErVcPEBlcAAAAASUVORK5CYII=',
        imgYouTubeTV = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZklEQVR42s2S0QrAIAhFr6/1ffMj1//VoxNB9tRYXRg7BEHYUUuBY8Dp24E1mgAqm5dviUUB+8wF5seqnqMRgqRWoHdCEJFCCEoBxvj6DV7Cz0FUy0ziU0S2J7EmLfxHsPobKaUFF2w1NVWPtXHxAAAAAElFTkSuQmCC',
        imageGoogle = 'data:image/png;base64,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',
        urlCalendar = 'https://calendar.google.com/calendar/u/0/r',
        urlEarth = 'https://earth.google.com/web/@0,-6.8073,0a,22251752.77375655d,35y,0h,0t,0r',
        urlMail = 'https://mail.google.com/mail/?authuser=0&amp;ogbl',
        urlMaps = 'https://www.google.com/maps/@36.1489458,-115.0874625,15z?hl=en&authuser=0',
        urlMSEdge = 'https://www.microsoft.com/en-us/store/collections/edgeextensions/pc',
        urlNews = 'https://news.google.com/topstories?hl',
        urlPhotos = 'https://photos.google.com/?pageId=none',
        urlPlay = 'https://play.google.com/store/apps',
        urlPodcasts = 'https://podcasts.google.com/',
        urlTranslate = 'https://translate.google.com/?hl=en',
        urlYouTube = 'https://www.youtube.com/?gl=US',
        urlYouTubeTV = 'https://tv.youtube.com/library';

  var div1 = $q('body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd'),
      div2 = $q('body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd > div'),
      div3 = $q('body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf > div'),
      searchButton = $q('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b'),
      where = GM_getValue('aNewTab') ? '_blank' : '_self',
      btnCalendar = $c('button', {id: 'gCalendar', className: 'gBtn', textContent: 'Calendar', title: urlCalendar, style: 'background-image: url('+ imgCalendar +')', onclick: function() {window.open(urlCalendar, where)}}),
      btnEarth = $c('button', {id: 'gEarth', className: 'gBtn', textContent: 'Earth', title: urlEarth, style: 'background-image: url('+ imgEarth +')', onclick: function() {window.open(urlEarth, where)}}),
      btnMail = $c('button', {id: 'gMail', className: 'gBtn', textContent: 'Gmail', title: urlMail, style: 'background-image: url('+ imgMail +')', onclick: function() {window.open(urlMail, where)}}),
      btnMaps = $c('button', {id: 'gMaps', className: 'gBtn', textContent: 'Maps', title: urlMaps, style: 'background-image: url('+ imgMaps +')', onclick: function() {window.open(urlMaps, where)}}),
      btnMSEdge = $c('button', {id: 'gMSEdge', className: 'gBtn', textContent: 'MS Store', title: urlMSEdge, style: 'background-image: url('+ imgMSEdge +')', onclick: function() {window.open(urlMSEdge, where)}}),
      btnNews = $c('button', {id: 'gNews', className: 'gBtn', textContent: 'News', title: urlNews, style: 'background-image: url('+ imgNews +')', onclick: function() {window.open(urlNews, where)}}),
      btnPhotos = $c('button', {id: 'gPhotos', className: 'gBtn', textContent: 'Photos', title: urlPhotos, style: 'background-image: url('+ imgPhotos +')', onclick: function() {window.open(urlPhotos, where)}}),
      btnPlay = $c('button', {id: 'gPlay', className: 'gBtn', textContent: 'Play Store', title: urlPlay, style: 'background-image: url('+ imgPlay +')', onclick: function() {window.open(urlPlay, where)}}),
      btnPodcasts = $c('button', {id: 'gPodcasts', className: 'gBtn', textContent: 'Podcasts', title: urlPodcasts, style: 'background-image: url('+ imgPodcasts +')', onclick: function() {window.open(urlPodcasts, where)}}),
      btnTranslate = $c('button', {id: 'gTranslate', className: 'gBtn', textContent: 'Translate', title: urlTranslate, style: 'background-image: url('+ imgTranslate +')', onclick: function() {window.open(urlTranslate, where)}}),
      btnYouTube = $c('button', {id: 'gYouTube', className: 'gBtn', textContent: 'YouTube', title: urlYouTube, style: 'background-image: url('+ imgYouTube +')', onclick: function() {window.open(urlYouTube, where)}}),
      btnYouTubeTV = $c('button', {id: 'gYouTubeTV', className: 'gBtn', textContent: 'YouTube TV', title: urlYouTubeTV, style: 'background-image: url('+ imgYouTubeTV +')', onclick: function() {window.open(urlYouTubeTV, where)}}),
      headerButton = $c('button', {id: 'headerButton', className: 'gBtn', textContent: 'Header Buttons', onclick: function() {$q('#buttonsContainer').hidden = false}}),
      buttonsContainer = $c('div', {id: 'buttonsContainer', hidden: true}),
      cbNewTab = $c('input', {id: 'aNewTab', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aNewTab"), onclick: function(e) {onCheckbox(e)}}),
      labNewTab = $c('button', {for: 'aNewTab', className: 'aBtn', textContent: 'Open In New Tabs', onclick: function(e) {onButton(e)}}),
      brNewTab = $c('br'),
      buttonCheckAll = $c('button', {id: 'buttonCheckAll', className: 'gBtn', textContent: 'Check All', onclick: function(e) {onButton(e)}}),
      buttonClearAll = $c('button', {id: 'buttonClearAll', className: 'gBtn', textContent: 'Clear All', onclick: function(e) {onButton(e)}}),
      brButton = $c('br'),
      cbCalendar = $c('input', {id: 'aCalendar', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aCalendar"), onclick: function(e) {onCheckbox(e)}}),
      labCalendar = $c('button', {for: 'aCalendar', className: 'aBtn', textContent: 'Calendar', style: 'background: url('+ imgCalendar +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brCalendar = $c('br'),
      cbClock = $c('input', {id: 'aClock', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aClock"), onclick: function(e) {onCheckbox(e)}}),
      labClock = $c('button', {for: 'aClock', className: 'aBtn', textContent: 'Clock', style: 'background: url('+ imgClock +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brClock = $c('br'),
      cbEarth = $c('input', {id: 'aEarth', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aEarth"), onclick: function(e) {onCheckbox(e)}}),
      labEarth = $c('button', {for: 'aEarth', className: 'aBtn', textContent: 'Earth', style: 'background: url('+ imgEarth +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brEarth = $c('br'),
      cbMail = $c('input', {id: 'aMail', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aMail"), onclick: function(e) {onCheckbox(e)}}),
      labMail = $c('button', {for: 'aMail', className: 'aBtn', textContent: 'Mail', style: 'background: url('+ imgMail +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brMail = $c('br'),
      cbMaps = $c('input', {id: 'aMaps', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aMaps"), onclick: function(e) {onCheckbox(e)}}),
      labMaps = $c('button', {for: 'aMaps', className: 'aBtn', textContent: 'Maps', style: 'background: url('+ imgMaps +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brMaps = $c('br'),
      cbMSEdge = $c('input', {id: 'aMSEdge', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aMSEdge"), onclick: function(e) {onCheckbox(e)}}),
      labMSEdge = $c('button', {for: 'aMSEdge', className: 'aBtn', textContent: 'MS Store', style: 'background: url('+ imgMSEdge +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brMSEdge = $c('br'),
      cbNews = $c('input', {id: 'aNews', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aNews"), onclick: function(e) {onCheckbox(e)}}),
      labNews = $c('button', {for: 'aNews', className: 'aBtn', textContent: 'News', style: 'background: url('+ imgNews +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brNews = $c('br'),
      cbPhotos = $c('input', {id: 'aPhotos', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aPhotos"), onclick: function(e) {onCheckbox(e)}}),
      labPhotos = $c('button', {for: 'aPhotos', className: 'aBtn', textContent: 'Photos', style: 'background: url('+ imgPhotos +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brPhotos = $c('br'),
      cbPlay = $c('input', {id: 'aPlay', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aPlay"), onclick: function(e) {onCheckbox(e)}}),
      labPlay = $c('button', {for: 'aPlay', className: 'aBtn', textContent: 'Play Store', style: 'background: url('+ imgPlay +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brPlay = $c('br'),
      cbPodcasts = $c('input', {id: 'aPodcasts', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aPodcasts"), onclick: function(e) {onCheckbox(e)}}),
      labPodcasts = $c('button', {for: 'aPodcasts', className: 'aBtn', textContent: 'Podcasts', style: 'background: url('+ imgPodcasts +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brPodcasts = $c('br'),
      cbTranslate = $c('input', {id: 'aTranslate', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aTranslate"), onclick: function(e) {onCheckbox(e)}}),
      labTranslate = $c('button', {for: 'aTranslate', className: 'aBtn', textContent: 'Translate', style: 'background: url('+ imgTranslate +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brTranslate = $c('br'),
      cbYouTube = $c('input', {id: 'aYouTube', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aYouTube"), onclick: function(e) {onCheckbox(e)}}),
      labYouTube = $c('button', {for: 'aYouTube', className: 'aBtn', textContent: 'YouTube', style: 'background: url('+ imgYouTube +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brYouTube = $c('br'),
      cbYouTubeTV = $c('input', {id: 'aYouTubeTV', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aYouTubeTV"), onclick: function(e) {onCheckbox(e)}}),
      labYouTubeTV = $c('button', {for: 'aYouTubeTV', className: 'aBtn', textContent: 'YouTubeTV', style: 'background: url('+ imgYouTubeTV +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brYouTubeTV = $c('br'),
      buttonReload = $c('button', {id: 'buttonReload', className: 'gBtn', textContent: 'Reload Page', title: reloadTooltip, onclick: function() {onReload()}}),
      buttonClose = $c('button', {id: 'buttonClose', className: 'gBtn', textContent: 'Close', onclick: function() {$q("#buttonsContainer").hidden = true}}),
      dateTimeContainer = $c('div', {id: 'dateTimeContainer'}),
      btnClock = $c('button', {id: 'gClock', style: 'background-image: url('+ imgClock2 +')', title: hideShow, onmousedown: function(e) {toggleDateTime(e)}}),
      dateTime = $c('span', {id: 'dateTime', onmousedown: function(e) {toggleSecondsAmPmFormat(e)}}),
      timer;

  function $c(type, props) {
    let node = document.createElement(type);
    if (props && typeof props == 'object') for (let prop in props) typeof node[prop] == 'undefined' ? node.setAttribute(prop, props[prop]) : node[prop] = props[prop];
    return node;
  }

  function $q(el, all) {
    if (all) return document.querySelectorAll(el);
    return document.querySelector(el);
  }

  function aDateTime(int) {
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
        hr12, hr24, ampm,
        bullet = '•', comma = ',', hyphen = '-', slash = '/', space = ' ', star = '★';
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
      // RETURN OPTIONS: (w / ww) + (m / mm / mmm / mmmm) + (d / dd / ddd) +  (yy / yyyy) + (hr12 / hr24) + (min) + (sec) + (ampm)
      case 1: return ww + space + bullet + space + mmmm + space + ddd + comma + space + yyyy + space + star + space + hr12 + min + sec + space + ampm; // Sunday • March 1ˢᵗ, 2021 ★ 12:34 AM
      case 2: return w + space + bullet + space + mmm + space + d + comma + space + yyyy + space + bullet + space + hr12 + min + sec + space + ampm; // Sun. • Mar. 1, 2021 • 12:34 AM
      case 3: return w + space + bullet + space + mmm + space + dd + comma + space + yyyy + space + bullet + space + hr12 + min + sec + space + ampm; // Sun. • Mar. 01, 2021 • 12:34 AM
      case 4: return w + space + bullet + space + m + hyphen + d + hyphen + yyyy + space + bullet + space + hr12 + min + sec + space + ampm; // Sun. • 3-1-2021 • 12:34 AM
      case 5: return w + space + bullet + space + mm + hyphen + dd + hyphen + yyyy + space + bullet + space + hr12 + min + sec + space + ampm; // Sun. • 03-01-2021 • 12:34 AM
      case 6: return w + space + bullet + space + m + slash + d + slash + yyyy + space + bullet + space + hr12 + min + sec + space + ampm; // Sun. • 3/1/2021 • 12:34 AM
      case 7: return w + space + bullet + space + mm + slash + dd + slash + yyyy + space + bullet + space + hr12 + min + sec + space + ampm; // Sun. • 03/01/2021 • 12:34 AM
      // Delete "customFormat" text below and add return options with bullet, comma, hyphen, slash, space, star characters.
      case 8: return customFormat;
  } }

  function centerElements() {
    let lia = $q('#dEjpnf > li > a', true),
        num = $q('body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd > div > .gBtn', true),
        len = ($q('#gSearch').offsetWidth + $q('#Mses6b').offsetWidth + $q('#headerButton').offsetWidth) / 2,
        screenWidth = window.screen.width / 2,
        spacerWidth = parseInt(elementSpacing.match('\\d+') / 2),
        spacerCount = (num.length - 1) * spacerWidth,
        os1 = $q('body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd').offsetHeight,
        os2 = $q('body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ').offsetHeight,
        os3 = $q('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb').offsetHeight,
        ost = (os1 + os2 + os3 + 24) + 'px',
        arr = [];
    for (let i = 0; i < lia.length; i++) lia[i].setAttribute('target', '_blank');
    for (let j = 0; j < num.length; j++) arr.push(num[j].offsetWidth);
    let sum = arr.reduce(function(a, b) {return a + b}, 1),
        buttonsWidth = sum / 2,
        fromLeft1 = Math.round(screenWidth - buttonsWidth - spacerCount) + 'px',
        fromLeft2 = Math.round(screenWidth - len - (spacerWidth * 2) - 1) + 'px';
    div2.style.marginLeft = fromLeft1;
    div3.style.left = fromLeft2;
    div3.style.top = ost;
    buttonsContainer.style.top = '-' + ost;
  }

  function defaultDateTime() {
    dateTime.hidden = false;
    dateTime.textContent = aDateTime(GM_getValue('dateFormat'));
    dateTime.title = addRemove + ' (' + GM_getValue('dateFormat') + ')';
    setTimer();
  }

  function onButton(e) {
    if (e.target.id === 'aNewTab') {
      e.target.checked = !e.target.checked;
      GM_setValue('aNewTab', e.target.checked);
      return;
    }
    let cb = $q('#buttonsContainer > .aCkbx', true), x;
    if (e.target.hasAttribute('id')) {
      switch (e.target.id) {
        case 'buttonCheckAll':
          for (let i = 0; i < cb.length; i++) {
            x = cb[i];
            if (x.id === 'aNewTab') continue;
            x.checked = true;
            GM_setValue(x.id, true);
          }
          break;
        case 'buttonClearAll':
          for (let i = 0; i < cb.length; i++) {
            x = cb[i];
            if (x.id === 'aNewTab') continue;
            x.checked = false;
            GM_setValue(x.id, false);
          }
    } }
    if (e.target.hasAttribute('for')) {
      x = e.target.getAttribute('for');
      let cbx = document.getElementById(x);
      cbx.checked = !cbx.checked;
      GM_setValue(cbx.id, cbx.checked);
  } }

  function onCheckbox(e) {
    let bool = GM_getValue(e.target.id) !== true ? true : false;
    e.target.checked = bool;
    GM_setValue(e.target.id, bool);
  }

  function onClose() {
    removeEventListener('unload', function() {onClose()});
    clearInterval(timer);
  }

  function onOpen() {
    GM_getValue('defaultDateTimeView') ? defaultDateTime() : dateTime.hidden = true;
  }

  function onReload() {
    $q('#buttonsContainer').hidden = true;
    document.location.reload(true);
  }

  function setTimer() {
    clearInterval(timer);
    if (GM_getValue('defaultSecondsView')) timer = setInterval(function() {dateTime.textContent = aDateTime(GM_getValue('dateFormat'))}, timerShort);
    else timer = setInterval(function() {dateTime.textContent = aDateTime(GM_getValue('dateFormat'))}, timerLong);
  }

  function toggleDateTime(e) {
    if (!e.button === 0) return;
    let bool;
    if (!e.shiftKey && !e.ctrlKey && !e.altKey && e.button === 0) {
      bool = dateTime.hidden !== true ? true : false;
      dateTime.hidden = bool;
      GM_setValue('defaultDateTimeView', !bool);
      if (bool) clearInterval(timer);
      else {
        dateTime.textContent = aDateTime(GM_getValue('dateFormat'));
        setTimer();
  } } }

  function toggleSecondsAmPmFormat(e) {
    if (!e.button === 0) return;
    let bool1, bool2, int;
    e.preventDefault();
    if (!e.shiftKey && !e.ctrlKey && !e.altKey && e.button === 0) {
      bool1 = GM_getValue('defaultSecondsView') !== true ? true : false;
      GM_setValue('defaultSecondsView', bool1);
      setTimer();
    } else if (e.shiftKey && !e.ctrlKey && !e.altKey && e.button === 0) {
      bool2 = GM_getValue('defaultAMPM') !== true ? true : false;
      GM_setValue('defaultAMPM', bool2);
    } else if (!e.shiftKey && e.ctrlKey && !e.altKey && e.button === 0) {
      int = GM_getValue('dateFormat') + 1;
      int < formatCount + 1 ? GM_setValue('dateFormat', int) : GM_setValue('dateFormat', 1);
      dateTime.title = addRemove + ' (' + GM_getValue('dateFormat') + ')';
    }
    dateTime.textContent = aDateTime(GM_getValue('dateFormat'));
  }

  if (!GM_getValue('defaultDateTimeView')) GM_setValue('defaultDateTimeView', false);
  if (!GM_getValue('defaultSecondsView')) GM_setValue('defaultSecondsView', false);
  if (!GM_getValue('defaultAMPM')) GM_setValue('defaultAMPM', false);
  if (!GM_getValue('dateFormat')) GM_setValue('dateFormat', 1);

  buttonsContainer.appendChild(cbNewTab); buttonsContainer.appendChild(labNewTab); buttonsContainer.appendChild(brNewTab);
  buttonsContainer.appendChild(buttonCheckAll); buttonsContainer.appendChild(buttonClearAll); buttonsContainer.appendChild(brButton);
  buttonsContainer.appendChild(cbCalendar); buttonsContainer.appendChild(labCalendar); buttonsContainer.appendChild(brCalendar);
  buttonsContainer.appendChild(cbClock); buttonsContainer.appendChild(labClock); buttonsContainer.appendChild(brClock);
  buttonsContainer.appendChild(cbEarth); buttonsContainer.appendChild(labEarth); buttonsContainer.appendChild(brEarth);
  buttonsContainer.appendChild(cbMail); buttonsContainer.appendChild(labMail); buttonsContainer.appendChild(brMail);
  buttonsContainer.appendChild(cbMaps); buttonsContainer.appendChild(labMaps); buttonsContainer.appendChild(brMaps);
  buttonsContainer.appendChild(cbMSEdge); buttonsContainer.appendChild(labMSEdge); buttonsContainer.appendChild(brMSEdge);
  buttonsContainer.appendChild(cbNews); buttonsContainer.appendChild(labNews); buttonsContainer.appendChild(brNews);
  buttonsContainer.appendChild(cbPhotos); buttonsContainer.appendChild(labPhotos); buttonsContainer.appendChild(brPhotos);
  buttonsContainer.appendChild(cbPlay); buttonsContainer.appendChild(labPlay); buttonsContainer.appendChild(brPlay);
  buttonsContainer.appendChild(cbPodcasts); buttonsContainer.appendChild(labPodcasts); buttonsContainer.appendChild(brPodcasts);
  buttonsContainer.appendChild(cbTranslate); buttonsContainer.appendChild(labTranslate); buttonsContainer.appendChild(brTranslate);
  buttonsContainer.appendChild(cbYouTube); buttonsContainer.appendChild(labYouTube); buttonsContainer.appendChild(brYouTube);
  buttonsContainer.appendChild(cbYouTubeTV); buttonsContainer.appendChild(labYouTubeTV); buttonsContainer.appendChild(brYouTubeTV);
  buttonsContainer.appendChild(buttonReload); buttonsContainer.appendChild(buttonClose);
  headerButton.appendChild(buttonsContainer);
  searchButton.id = 'gSearch';

  if (GM_getValue('aCalendar')) div2.appendChild(btnCalendar);
  if (GM_getValue('aClock')) {dateTimeContainer.appendChild(btnClock); dateTimeContainer.appendChild(dateTime); div1.appendChild(dateTimeContainer);}
  if (GM_getValue('aEarth')) div2.appendChild(btnEarth);
  if (GM_getValue('aMail')) div2.appendChild(btnMail);
  if (GM_getValue('aMaps')) div2.appendChild(btnMaps);
  if (GM_getValue('aMSEdge')) div2.appendChild(btnMSEdge);
  if (GM_getValue('aNews')) div2.appendChild(btnNews);
  if (GM_getValue('aPhotos')) div2.appendChild(btnPhotos);
  if (GM_getValue('aPlay')) div2.appendChild(btnPlay);
  if (GM_getValue('aPodcasts')) div2.appendChild(btnPodcasts);
  if (GM_getValue('aTranslate')) div2.appendChild(btnTranslate);
  if (GM_getValue('aYouTube')) div2.appendChild(btnYouTube);
  if (GM_getValue('aYouTubeTV')) div2.appendChild(btnYouTubeTV);
  div3.insertBefore(searchButton, div3.firstChild);
  div3.appendChild(headerButton);
  div3.appendChild(buttonsContainer);

  addEventListener('unload', function() {onClose()});

  setTimeout(function() {
    let cb = $q('#buttonsContainer > .aCkbx', true),
        signIn = $q('#gb > div > div.gb_Se > a');
    for (var i = 0; i < cb.length; i++) if (!GM_getValue(cb[i].id)) GM_setValue(cb[i].id, false);
    if (signIn) signIn.click();
    centerElements();
    onOpen();
  }, 200);

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
    '  right: -8px !important;'+
    '}'+
    '#gbwa > div > a:hover {'+
    '  background-color: #444 !important;'+
    '  border: 1px solid #000 !important;'+
    '}'+
    '#gbwa > div > a:hover > svg {'+
    '  background-color: #444 !important;'+
    '}'+
    '.gb_Ca {'+
    '  top: -4px !important;'+
    '}'+
    '#gb > div > div.gb_Se > div.gb_Na.gb_bd.gb_mg.gb_h.gb_Af > div > a {'+
    '  margin-left: '+ elementSpacing +' !important;'+
    '}'+
    '#gb > div > div.gb_Se > div.gb_Na.gb_bd.gb_mg.gb_h.gb_Af > div > a > img, #gb > div > div.gb_Se > div.gb_Na.gb_bd.gb_mg.gb_h.gb_Af {'+
    '  height: 40px !important;'+
    '  width: 40px !important;'+
    '  margin-right: '+ elementSpacing +' !important;'+
    '}'+
    '#dateTimeContainer:hover > #gClock {'+
    '  filter: none !important;'+
    '  opacity: .7 !important;'+
    '}'+
    '#gClock {'+
    '  background-repeat: no-repeat !important;'+
    '  background-position: center !important;'+
    '  cursor: pointer !important;'+
    '  border-radius: 50% !important;'+
    '  height: 40px !important;'+
    '  margin-left: '+ elementSpacing +' !important;'+
    '  filter: grayscale(1) brightness(.65) !important;'+
    '  position: relative !important;'+
    '  top: 6px !important;'+
    '  width: 40px !important;'+
    '}'+
    '#dateTimeContainer:hover > #gClock:hover {'+
    '  opacity: 1 !important;'+
    '}'+
    '#dateTime:not(#f) {'+
    '  border-radius: 4px !important;'+
    '  color: #FFF !important;'+
    '  font: 16px monospace !important;'+
    '  margin-left: '+ elementSpacing +' !important;'+
    '  min-width: 100px !important;'+
    '  padding: 5px 8px 6px 8px !important;'+
    '  position: relative !important;'+
    '  top: -9px !important;'+
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
    '  max-height: 160px !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div {'+
    '  margin-top: 30px !important;'+
    '  max-height: 165px !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img, #hplogo {'+
    '  background: url('+ imageGoogle +') no-repeat !important;'+
    '  height: 86px !important;'+
    '  padding-left: 250px !important;'+
    '  pointer-events: none !important;'+
    '  width: 0 !important;'+
    '}'+
    '.RNNXgb {'+
    '  background: linear-gradient(#222, #444) !important;'+
    '  border-color: #CCC !important;'+
    '  box-shadow: 1px 0 8px #000 inset !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf {'+
    '  padding: 0 20px !important;'+
    '}'+
    '.gBtn, #dateTime, #gSearch, #Mses6b, #headerButton, #submit, center > input, #gb > div > div.gb_0a.gb_E.gb_k.gb_1a.gb_la .gb_Pe {'+
    '  background-color: #303030 !important;'+
    '  border: 1px solid #CCC !important;'+
    '  box-shadow: 1px 0 4px #000 inset !important;'+
    '  color: #AAA !important;'+
    '  cursor: pointer !important;'+
    '  width: auto !important;'+
    '}'+
    '.gBtn:hover, #dateTime:hover, #gSearch:hover:hover, #Mses6b:hover, #headerButton:hover, #submit:hover, center > input:hover, #gb > div > div.gb_0a.gb_E.gb_k.gb_1a.gb_la .gb_Pe:hover {'+
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
    '#gSearch, #Mses6b, #headerButton {'+
    '  border-radius: 4px !important;'+
    '  max-height: 36px !important;'+
    '  padding: 9px 16px !important;'+
    '  text-decoration: none !important;'+
    '}'+
    '#gSearch, #Mses6b {'+
    '  margin-right: '+ elementSpacing +' !important;'+
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
    '  height: calc(-155px + 100vh) !important;'+
    '}'+
    '.aajZCb {'+
    '  background: #333 !important;'+
    '}'+
    '.aajZCb li span {'+
    '  color: #FFF !important;'+
    '}'+
    '#dEjpnf a.EzVRq, #dEjpnf button.EzVRq {'+
    '  color: #CCC !important;'+
    '  text-decoration: none !important;'+
    '}'+
    '#dEjpnf a.EzVRq:hover, #dEjpnf button.EzVRq:hover {'+
    '  background-color: #333 !important;'+
    '  color: #FFF !important;'+
    '}'+
    '#buttonsContainer {'+
    '  background-color: #1C1E1F !important;'+
    '  border: 1px solid #999 !important;'+
    '  border-radius: 4px !important;'+
    '  min-width: 153px !important;'+
    '  padding: 4px 2px 6px 2px !important;'+
    '  position: absolute !important;'+
    '  right: 0 !important;'+
    '  text-align: left !important;'+
    '  z-index: 2147483647 !important;'+
    '}'+
    '#buttonCheckAll {'+
    '  margin-left: 4px !important;'+
    '  margin-right: 8px !important;'+
    '}'+
    '#buttonCheckAll, #buttonClearAll, #buttonReload, #buttonClose {'+
    '  padding: 4px !important;'+
    '}'+
    '#buttonReload, #buttonClose {'+
    '  margin: 8px 4px 0 4px !important;'+
    '}'+
    '.aCkbx {'+
    '  cursor: pointer !important;'+
    '  filter: invert(1) !important;'+
    '  height: 22px !important;'+
    '  margin:  0 4px !important;'+
    '  position: relative !important;'+
    '  top: 6px !important;'+
    '  width: 22px !important;'+
    '}'+
    '.aCkbx:first-of-type {'+
    '  margin-bottom: 12px !important;'+
    '  margin-top: -4px !important;'+
    '}'+
    '.aBtn {'+
    '  appearance: none !important;'+
    '  border: none !important;'+
    '  color: #AAA !important;'+
    '  cursor: pointer !important;'+
    '  margin-left: -5px !important;'+
    '}'+
    '.aBtn:first-of-type {'+
    '  padding: 4px 4px 4px 6px!important;'+
    '}'+
    '.aBtn:not(:first-of-type) {'+
    '  padding: 4px 23px 4px 6px !important;'+
    '}'+
    '.aCkbx:hover + .aBtn, .aBtn:hover {'+
    '  background-color: #444 !important;'+
    '  color: #FFF !important;'+
    '}'+
  '');

})();
