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
        timerLong = 10000,
        timerShort = 1000,
        themerInterval = 60000,
        elementSpacing = '8px',
        am = 'AM',
        pm = 'PM',
        dateTimeFormatCount = 9,
        bullet = '•',
        comma = ',',
        hyphen = '-',
        slash = '/',
        space = ' ',
        star = '★',
        customFormat = 'Add a custom format in script line ',
        hideShow = bullet + ' Left-click to Hide/Show Date/Time',
        addRemove = bullet + ' Left-click to Add/Remove :seconds\n' + bullet + ' Shift + Left-click to Add/Remove AM/PM\n' + bullet + ' Ctrl + Left-click to change Date format',
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
        themerBackgroundImage = "https://raw.githubusercontent.com/srazzano/Images/master/image",
        defaultBackgroundImage = "https://raw.githubusercontent.com/srazzano/Images/master/image1.jpg",
        googleImage = 'https://raw.githubusercontent.com/srazzano/Images/master/googleImage5.png',
        imgCalendar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABT0lEQVR42mNkAAKp9Iv/GYgELMxMYJqZmZHh/mQdRkZSNMPAfwZGMM0IYpFjADJANyCMkIaHocYgahVOA57O0Fv17x8Dw7//IH8ygB37H6qCEcj5s5c1DK8BD6fqrTp+5w9DRP81hsNNOgxyIkwMJ+/+ZQjrvcoANJywAQ+m6K16/O4fg5IYE4N0xiWGvXU6DM5NV8CSRBkA8sLbL/8Z9EouM2yq0GYwVmBmuPrkL4NbC5EueDRNb9XDNwgXPJ6ux3D9KQkG3Jqou+rcg7/gMPAwUmWYncrJcPPZXwaXZiINeDJdbxUjJJ0w/PzDwMDOwsDw+y+Ez8pMRCzcmqyyCpLaGKDpDRWwH+IP+/+TGayGkf0vA6Ncs+3/X39/E52QLh3+uwqZj24AQQA0AM4W23uakVGx1eH/998/SDYApJkB5k2JBguiMxTIAJhmEAAA4quznkbNVyMAAAAASUVORK5CYII=',
        imgChrome = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABlklEQVR42rWRPUiCYRDH/8/7RYqWOFRCS1/UbFC2GBWRU4RUBkVDQ7S1hVptlklBWIsgNDVEKtQmRkTY0OIbYW01BxZhgRmp2aNWYj2GBP3hOO6O+90dR8DQyrIzy8rbF2zke46UAySeE4jH4zTKokajgUqpYgNY08bGLfD79/D6msrHoijCbB5BwOcDE2CzW/EXOVdW/wlwPWBops5NzfSRClKbazk8u/kVQBv1hOflbCbDnEhroDU9Bck/ALTZkX7LLAocX8n2DgpZ/AKMHu/rH5IJWSGIqKJGCKkEovf1Dst5wLouih2PjDpJQhV9mcQLSHYYoOg3IZ1O4zFyDHJ7BJ4nEDjkvSQJCKjNhQ1c9Rdov8vAdXAFjShB693FfKgBsafCqNpqYNMcgzpqgShxIBzdkJorPFQE5LS1HUVblxEbjWtfzZ/KQTzdDlSnTvPNhOPgDJlKAUpOxIluHLORHubRvslzaO+Xim8MDpYCcrponcF0uJMNmLqENmb9HTDRZMTD5RTzBG+fG6qXw5+ASn5WTu9OGbH/eUCknAAAAABJRU5ErkJggg==',
        imgClock = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAHJElEQVR42s2ZB1AUZxTH/wd3cCBgpAoiTURNNIKEqDNRMSQqxjKAJCoay4xRI1FHY6ImE3svsUvKaGLLJDYsY0nEhgENoqhYwEOpJ1UHDmkHXN633pK9xt0pYfxmvnm73367+7v3vve+t+9EeMm2bhwCSHxKfSj1ztTbUBepL6uoP6f+kPop6nvm7UPmy7xHZM5kgrInsZb6ZLqxsoOd9OogH9eh9tZiSCwsNOYqGxuhqK3Hn9nFpwoqa/oQsR0N76L+FcEqWhSQwCQkfqMeGe7rKgpwtOOAVKIXt4tUKr33Ca8z4MynlTj9uJhNPkJ9DIEqXxmQ4GJI7GVgXTt4waKu/MUFemHh8xok1rqjqFCGupoKqGiMeyjBW0kd4Obuj35WT9C+jRRQa5hgS+6WVrioQccT5P6XBiS4QzRh4OeBPo5SKwmnCUWtEkdKpCgtzISrX190ChnDyTZveGjcW11RiOJHyZD9cwBFWUlwdu+CSOdq2FtLOM3W1CmxIy37KVFeIMhRZgMS3A07iWX9tEDfIHqguKGhEZfzSpFeoULwyOXwDoyAiDehluTMq2X27LSjuB6/EG3ph8R4KGFpacH94Li0xymVygYxQfYyGZDBOUkl5ZN6eIeyX1uoqML++wXoOWQhug2YbhBqRFQ0Uq8mQS6Xc+M8pFDev7wTaadWIKZbB7S3t+Ugd9/JuVhWo2yrD1KkB+4Qac6LNBfCzjPKFDgrr8aQ2QmwbdteLxwvh0eO4gALCgqaxvRBMvOf/j4Mgz1s0MXJnhtXazJX29wiLbgYGtgyN8TfkWkus7QCCWUWGP71NYNQQg3ygEyDhuCES+DEmt4Ic2pEgLMD8yxsvJbB1uRMoeOIBHAslNTOCPQR2UjEeFJZjYOPFYj4Lt0kOG1AY3C8jF/WA9G+9py5meNsT8tmF635ECQEPEShJOpNl7ZgDrEpNQsj5qcYNavweFhElAagMTjWqsjcJ0mTs4M7cY5zr6ScxcrDvKlFaji2EMq/DPHnzn/Nt4RHzyiDDqEPjrWwwUNw7/YtDrBRHRObg+NlRmIc5LePYqJnA3e+PkXGLjCnUfCAO0l7096itcDi3O7MZ4hcdNdkOP5FH4aH4+6t/wBNgePlsRU9MTmgHeykVrwW4whwOg9YOyvYz0psaYk9eRbw7z/DaJzThqtVPkdE5GikpaZygA0NDU1zLbOygIAAKJVKg5B5t4/h0ZU4TPBqRD3duzn1UR0BWotYVkKvSuY8lyZuTH2ET1bmmgXH5OPcbMTGztQBZHDuoaF4cvEilL6+zWry6GJ/zAn2456/IUXGPLovA1xO5v2GmZd57rk6b7w/5Q+z4FhLTErC6Oho7pgH5OHkFy6g3s/PqJkTfxmHQdJczqPVZl7BAG9M7u4V1M7WGlfzy6Dqv0SveZuDY/JwfDxmxcY2ASIz0yw41piZrZKXo4+nE55V1WJXeu5NBqig9WfH0qetd0sRPvschRZ3s+BY0wAkc/Jw1R07cmNisdhobKxRFOH8jqH4orsLl57ROqxkgI18eNlA62/Mqjyz4LLzcpCfL0fqjVSsW7UaXWj8AXW25qo8PWGsae/Zx5Z2wdx3/LhzFm4YoIoA+QGMXVNgluY8BRCbZkzDrO1x6ErHGc1AyWQynTH+efFLOkPIowMYs1ZuMhyTOfm5nAYXkYMwzW0myNkEybfA4GAo6+vBW9PGtg1+37dHL9wLDQboAGqYeOzqfJPhmjRy5hRCp0xt0tzmbdvg5uZG2vWAq5OLURMLn3d8WVcdE2s4yUdzzjc5iSlwfCg5sHwxYr5djHkL5mPKpMmQSCQG7zH0vOqKIlz6YZiOk2iEGVHoMvgERZoFx7w1XvYAM6ZMx5XkvzmtMUBz4JgsSD8B6bWVOmFGI1AnKH0Q9tlBs+BYnOO3MdbYPszCijlwrCXtnYDBNnk6gVpnq2OebA6cKdo2NofJkyu66W517KJGskCpVucBsfCh3aQ14Zh5c5J/wkRvlWayoAbUTLcePkPUonutBsfamfUhlG45Gky3tBJWMToERaFrv2mtAidL/hnF6ccxyetFkquTsKohdVL+kQtSYOPQnlv0Xt7e/wscCy3ntgxoPuVXA+r9aIpe+kDDQ1sSjsmzG97Fx74Oxj+a1JC6n51PLRGx8DoH2dJwCVsH4gNnlWmfnUJT6/twHzTrL9jYu7WYWS/9OAxDPGzN+3AXQOotfbw9eD4C3pv6yg5xP2H9y5c+hJCseDS1l38IVI3gi0d3KlQIGrYEnj1GmAXH4tydM0vhQPv8ePq8fKXikdDc+spvh4ulKCvKhLNPH/j0iibZG9Z2rjpmLMu5hpybhzjp6NoZo9xqW678JoBstoB5qcYNJYVZqKtREJy6gCliBUx7OLv5IdSmWKOA2SBxQIY8Dy1SwBRAvr4lYC3Q17OIbgC2Vf6G+BdSB2wnAlUJKQAAAABJRU5ErkJggg==',
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
        imgYouTubeTV = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbElEQVR42mNkAIL/DAyrgFQoA2lgNSMDQxgjmZoRhvwHO4B8gNuA/0DhwEAGhg0bKDAABEAGZGUxMDx/TqYBcJWMFLggM5OB4cULeocBkYDydAB2LSUpEZ8KmPcYwQiHFwaPAaTGBsxQig0AAAp6OVWm895eAAAAAElFTkSuQmCC',
        urlCalendar = 'https://calendar.google.com/calendar/u/0/r',
        urlChrome = 'https://chrome.google.com/webstore/category/extensions',
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

  var div0 = $c('div', {id: 'headerButtonsDiv'}),
      div1 = $q('body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd'),
      div2 = $q('body > div.L3eUgb > div.o3j99.n1xJcf.Ne6nSd > div.LX3sZb'),
      div3 = $q('body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf > div'),
      searchButton = $q('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b'),
      settingsButton = $q('#Mses6b'),
      where = GM_getValue('aNewTab') ? '_blank' : '_self',
      btnCalendar = $c('button', {id: 'gCalendar', className: 'gBtn', textContent: 'Calendar', title: urlCalendar, style: 'background: url('+ imgCalendar +') no-repeat 4px center, linear-gradient(135deg, #070707, #333)', onclick: function() {window.open(urlCalendar, where)}}),
      btnChrome = $c('button', {id: 'gChrome', className: 'gBtn', textContent: 'Chrome Store', title: urlChrome, style: 'background: url('+ imgChrome +') no-repeat 4px center, linear-gradient(135deg, #070707, #333)', onclick: function() {window.open(urlChrome, where)}}),
      btnEarth = $c('button', {id: 'gEarth', className: 'gBtn', textContent: 'Earth', title: urlEarth, style: 'background: url('+ imgEarth +') no-repeat 4px center, linear-gradient(135deg, #070707, #333)', onclick: function() {window.open(urlEarth, where)}}),
      btnMail = $c('button', {id: 'gMail', className: 'gBtn', textContent: 'GMail', title: urlMail, style: 'background: url('+ imgMail +') no-repeat 4px center, linear-gradient(135deg, #070707, #333)', onclick: function() {window.open(urlMail, where)}}),
      btnMaps = $c('button', {id: 'gMaps', className: 'gBtn', textContent: 'GMaps', title: urlMaps, style: 'background: url('+ imgMaps +') no-repeat 4px center, linear-gradient(135deg, #070707, #333)', onclick: function() {window.open(urlMaps, where)}}),
      btnMSEdge = $c('button', {id: 'gMSEdge', className: 'gBtn', textContent: 'MS Store', title: urlMSEdge, style: 'background: url('+ imgMSEdge +') no-repeat 4px center, linear-gradient(135deg, #070707, #333)', onclick: function() {window.open(urlMSEdge, where)}}),
      btnNews = $c('button', {id: 'gNews', className: 'gBtn', textContent: 'News', title: urlNews, style: 'background: url('+ imgNews +') no-repeat 4px center, linear-gradient(135deg, #070707, #333)', onclick: function() {window.open(urlNews, where)}}),
      btnPhotos = $c('button', {id: 'gPhotos', className: 'gBtn', textContent: 'Photos', title: urlPhotos, style: 'background: url('+ imgPhotos +') no-repeat 4px center, linear-gradient(135deg, #070707, #333)', onclick: function() {window.open(urlPhotos, where)}}),
      btnPlay = $c('button', {id: 'gPlay', className: 'gBtn', textContent: 'Play Store', title: urlPlay, style: 'background: url('+ imgPlay +') no-repeat 4px center, linear-gradient(135deg, #070707, #333)', onclick: function() {window.open(urlPlay, where)}}),
      btnPodcasts = $c('button', {id: 'gPodcasts', className: 'gBtn', textContent: 'Podcasts', title: urlPodcasts, style: 'background: url('+ imgPodcasts +') no-repeat 4px center, linear-gradient(135deg, #070707, #333)', onclick: function() {window.open(urlPodcasts, where)}}),
      btnTranslate = $c('button', {id: 'gTranslate', className: 'gBtn', textContent: 'Translate', title: urlTranslate, style: 'background: url('+ imgTranslate +') no-repeat 4px center, linear-gradient(135deg, #070707, #333)', onclick: function() {window.open(urlTranslate, where)}}),
      btnYouTube = $c('button', {id: 'gYouTube', className: 'gBtn', textContent: 'YouTube', title: urlYouTube, style: 'background: url('+ imgYouTube +') no-repeat 4px center, linear-gradient(135deg, #070707, #333)', onclick: function() {window.open(urlYouTube, where)}}),
      btnYouTubeTV = $c('button', {id: 'gYouTubeTV', className: 'gBtn', textContent: 'YouTube TV', title: urlYouTubeTV, style: 'background: url('+ imgYouTubeTV +') no-repeat 4px center, linear-gradient(135deg, #070707, #333)', onclick: function() {window.open(urlYouTubeTV, where)}}),
      headerButton = $c('button', {id: 'headerButton', className: 'gBtn', textContent: 'Header Buttons', onclick: function(e) {onButton(e)}}),
      buttonsContainer1 = $c('div', {id: 'buttonsContainer1', hidden: true}),
      buttonsContainer2 = $c('div', {id: 'buttonsContainer2', hidden: true}),
      cbNewTab = $c('input', {id: 'aNewTab', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aNewTab"), onclick: function(e) {onCheckbox(e)}}),
      labNewTab = $c('button', {for: 'aNewTab', className: 'aBtn', textContent: 'Open In New Tabs', onclick: function(e) {onButton(e)}}),
      brNewTab = $c('br'),
      buttonCheckAll = $c('button', {id: 'buttonCheckAll', className: 'gBtn', textContent: 'Check All', onclick: function(e) {onButton(e)}}),
      buttonClearAll = $c('button', {id: 'buttonClearAll', className: 'gBtn', textContent: 'Clear All', onclick: function(e) {onButton(e)}}),
      brButton = $c('br'),
      cbCalendar = $c('input', {id: 'aCalendar', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aCalendar"), onclick: function(e) {onCheckbox(e)}}),
      labCalendar = $c('button', {for: 'aCalendar', className: 'aBtn', textContent: 'Calendar', style: 'background: url('+ imgCalendar +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brCalendar = $c('br'),
      cbChrome = $c('input', {id: 'aChrome', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aChrome"), onclick: function(e) {onCheckbox(e)}}),
      labChrome = $c('button', {for: 'aChrome', className: 'aBtn', textContent: 'Chrome Store', style: 'background: url('+ imgChrome +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brChrome = $c('br'),
      cbEarth = $c('input', {id: 'aEarth', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aEarth"), onclick: function(e) {onCheckbox(e)}}),
      labEarth = $c('button', {for: 'aEarth', className: 'aBtn', textContent: 'Earth', style: 'background: url('+ imgEarth +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brEarth = $c('br'),
      cbMail = $c('input', {id: 'aMail', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aMail"), onclick: function(e) {onCheckbox(e)}}),
      labMail = $c('button', {for: 'aMail', className: 'aBtn', textContent: 'GMail', style: 'background: url('+ imgMail +') no-repeat right', onclick: function(e) {onButton(e)}}),
      brMail = $c('br'),
      cbMaps = $c('input', {id: 'aMaps', className: 'aCkbx', type: 'checkbox', checked: GM_getValue("aMaps"), onclick: function(e) {onCheckbox(e)}}),
      labMaps = $c('button', {for: 'aMaps', className: 'aBtn', textContent: 'GMaps', style: 'background: url('+ imgMaps +') no-repeat right', onclick: function(e) {onButton(e)}}),
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
      buttonClose = $c('button', {id: 'buttonClose', className: 'gBtn', textContent: 'Close', onclick: function() {$q("#buttonsContainer1").hidden = true; $q("#buttonsContainer2").hidden = true}}),
      dateTimeContainer = $c('div', {id: 'dateTimeContainer'}),
      btnClock = $c('button', {id: 'gClock', style: 'background-image: url('+ imgClock +')', title: hideShow, onmousedown: function(e) {toggleDateTime(e)}}),
      dateTime = $c('span', {id: 'dateTime', className: 'gBtn', onmousedown: function(e) {toggleSecondsAmPmFormat(e)}}),
      changeInterval,
      initInterval,
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
      case 8: return customFormat + 211;
      case 9: return customFormat + 212;
  } }

  function changeBg() {
    let bod = $q('body'),
        ch = window.screen.height + 'px',
        cw = window.screen.width + 'px';
    if (GM_getValue('themeChanger')) {
      let now = new Date(),
          hour = now.getHours();
      if (hour > 12) hour = hour - 12;
      else if (hour === 0) hour = 12;
      else hour = hour;
      GM_setValue('themeNumber', hour);
      bod.style.background = "url("+ themerBackgroundImage + hour +".jpg)";
      bod.style.backgroundSize = cw +"  "+ ch;
      changeInterval = setInterval(() => changeBg(), themerInterval);
    } else {
      bod.style.background = "url("+ defaultBackgroundImage +")";
      bod.style.backgroundSize = cw +"  "+ ch;
      clearInterval(changeInterval);
  } }

  function themeChanger() {
    let bool = GM_getValue('themeChanger') !== true ? true : false,
        now = new Date(),
        inp = $q('#themeNum'),
        btn = $q('#buttonThemer');
    GM_setValue('themeChanger', bool);
    if (bool) {
      let hour = now.getHours();
      if (hour > 12) hour = hour - 12;
      else hour = hour;
      GM_setValue('themeNumber', hour);
      btn.textContext = 'Change theme hourly:  On';
      inp.value = hour;
    } else {
      GM_setValue('themeNumber', 1);
      btn.textContext = 'Change theme hourly:  Off';
      inp.value = 1;
    }
    document.location.reload();
  }

  function defaultDateTime() {
    dateTime.hidden = false;
    dateTime.textContent = aDateTime(GM_getValue('dateFormat'));
    dateTime.title = addRemove + ' (' + GM_getValue('dateFormat') + ')';
    setTimer();
  }

  function onButton(e) {
    if (e.target.id === 'Mses6b' || e.target.id === 'gSearch') {
      if (!buttonsContainer1.hidden) {
        buttonsContainer1.hidden = true;
        buttonsContainer2.hidden = true;
      }
      return;
    }
    if (e.target.id === 'headerButton') {
      buttonsContainer1.hidden = !buttonsContainer1.hidden;
      buttonsContainer2.hidden = !buttonsContainer2.hidden;
      if (!buttonsContainer1.hidden) {
        buttonsContainer1.style.right = buttonsContainer2.clientWidth + 'px';
        buttonsContainer1.style.bottom = headerButton.offsetHeight + 'px';
        buttonsContainer2.style.bottom = headerButton.offsetHeight + 'px';
      }
      return;
    }
    if (e.target.id === 'aNewTab') {
      e.target.checked = !e.target.checked;
      GM_setValue('aNewTab', e.target.checked);
      return;
    }
    let cb = $q('#buttonsContainer1 > .aCkbx', true),
        cb2 = $q('#buttonsContainer2 > .aCkbx', true),
        x, y;
    if (e.target.hasAttribute('id')) {
      switch (e.target.id) {
        case 'buttonCheckAll':
          for (let i = 0; i < cb.length; i++) {
            x = cb[i];
            if (x.id === 'aNewTab') continue;
            x.checked = true;
            GM_setValue(x.id, true);
          }
          for (let j = 0; j < cb2.length; j++) {
            y = cb2[j];
            y.checked = true;
            GM_setValue(y.id, true);
          }
          break;
        case 'buttonClearAll':
          for (let i = 0; i < cb.length; i++) {
            x = cb[i];
            if (x.id === 'aNewTab') continue;
            x.checked = false;
            GM_setValue(x.id, false);
          }
          for (let j = 0; j < cb2.length; j++) {
            y = cb2[j];
            y.checked = false;
            GM_setValue(y.id, false);
          }
          break;
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
    removeEventListener('resize', function() {onResize()});
    removeEventListener('unload', function() {onClose()});
    clearInterval(timer);
  }

  function onReload() {
    buttonsContainer1.hidden = true;
    buttonsContainer2.hidden = true;
    document.location.reload(true);
  }

  function onResize() {
    changeBg();
  }

  function setTimer() {
    clearInterval(timer);
    if (!GM_getValue('defaultDateTimeView')) return;
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
      else {dateTime.textContent = aDateTime(GM_getValue('dateFormat')); setTimer()}
  } }

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
      int < dateTimeFormatCount + 1 ? GM_setValue('dateFormat', int) : GM_setValue('dateFormat', 1);
      dateTime.title = addRemove + ' (' + GM_getValue('dateFormat') + ')';
    }
    dateTime.textContent = aDateTime(GM_getValue('dateFormat'));
  }

  if (!GM_getValue('defaultDateTimeView')) GM_setValue('defaultDateTimeView', false);
  if (!GM_getValue('defaultSecondsView')) GM_setValue('defaultSecondsView', false);
  if (!GM_getValue('defaultAMPM')) GM_setValue('defaultAMPM', false);
  if (!GM_getValue('dateFormat')) GM_setValue('dateFormat', 1);
  if (!GM_getValue('themeChanger')) GM_setValue('themeChanger', false);
  if (!GM_getValue('themeNumber')) GM_setValue('themeNumber', 1);

  buttonsContainer1.appendChild(cbNewTab); buttonsContainer1.appendChild(labNewTab); buttonsContainer1.appendChild(brNewTab);
  buttonsContainer1.appendChild(buttonCheckAll); buttonsContainer1.appendChild(buttonClearAll); buttonsContainer1.appendChild(brButton);
  buttonsContainer1.appendChild(cbCalendar); buttonsContainer1.appendChild(labCalendar); buttonsContainer1.appendChild(brCalendar);
  buttonsContainer1.appendChild(cbChrome); buttonsContainer1.appendChild(labChrome); buttonsContainer1.appendChild(brChrome);
  buttonsContainer1.appendChild(cbEarth); buttonsContainer1.appendChild(labEarth); buttonsContainer1.appendChild(brEarth);
  buttonsContainer1.appendChild(cbMail); buttonsContainer1.appendChild(labMail); buttonsContainer1.appendChild(brMail);
  buttonsContainer1.appendChild(cbMaps); buttonsContainer1.appendChild(labMaps); buttonsContainer1.appendChild(brMaps);
  buttonsContainer1.appendChild(cbMSEdge); buttonsContainer1.appendChild(labMSEdge); buttonsContainer1.appendChild(brMSEdge);
  buttonsContainer1.appendChild(cbNews); buttonsContainer1.appendChild(labNews); buttonsContainer1.appendChild(brNews);

  buttonsContainer2.appendChild(cbPhotos); buttonsContainer2.appendChild(labPhotos); buttonsContainer2.appendChild(brPhotos);
  buttonsContainer2.appendChild(cbPlay); buttonsContainer2.appendChild(labPlay); buttonsContainer2.appendChild(brPlay);
  buttonsContainer2.appendChild(cbPodcasts); buttonsContainer2.appendChild(labPodcasts); buttonsContainer2.appendChild(brPodcasts);
  buttonsContainer2.appendChild(cbTranslate); buttonsContainer2.appendChild(labTranslate); buttonsContainer2.appendChild(brTranslate);
  buttonsContainer2.appendChild(cbYouTube); buttonsContainer2.appendChild(labYouTube); buttonsContainer2.appendChild(brYouTube);
  buttonsContainer2.appendChild(cbYouTubeTV); buttonsContainer2.appendChild(labYouTubeTV); buttonsContainer2.appendChild(brYouTubeTV);
  buttonsContainer2.appendChild(buttonReload); buttonsContainer2.appendChild(buttonClose);

  headerButton.appendChild(buttonsContainer1);
  headerButton.appendChild(buttonsContainer2);
  searchButton.onmouseup = function(e) {onButton(e)};
  settingsButton.onmousedown = function(e) {onButton(e)};
  searchButton.id = 'gSearch';

  if (GM_getValue('aCalendar')) div0.appendChild(btnCalendar);
  if (GM_getValue('aChrome')) div0.appendChild(btnChrome);
  if (GM_getValue('aEarth')) div0.appendChild(btnEarth);
  if (GM_getValue('aMail')) div0.appendChild(btnMail);
  if (GM_getValue('aMaps')) div0.appendChild(btnMaps);
  if (GM_getValue('aMSEdge')) div0.appendChild(btnMSEdge);
  if (GM_getValue('aNews')) div0.appendChild(btnNews);
  if (GM_getValue('aPhotos')) div0.appendChild(btnPhotos);
  if (GM_getValue('aPlay')) div0.appendChild(btnPlay);
  if (GM_getValue('aPodcasts')) div0.appendChild(btnPodcasts);
  if (GM_getValue('aTranslate')) div0.appendChild(btnTranslate);
  if (GM_getValue('aYouTube')) div0.appendChild(btnYouTube);
  if (GM_getValue('aYouTubeTV')) div0.appendChild(btnYouTubeTV);

  if (GM_getValue('aClock')) {
    dateTimeContainer.appendChild(btnClock);
    dateTimeContainer.appendChild(dateTime);
    div1.appendChild(dateTimeContainer);
  }

  div3.insertBefore(searchButton, div3.firstChild);
  div3.appendChild(headerButton);
  div3.appendChild(buttonsContainer1);
  div3.appendChild(buttonsContainer2);

  addEventListener('resize', function() {onResize()});
  addEventListener('unload', function() {onClose()});

  initInterval = setInterval(() => {
    let cb = $q('#buttonsContainer1 > .aCkbx', true),
        cb2 = $q('#buttonsContainer2 > .aCkbx', true),
        signIn = $q('a.gb_3.gb_4.gb_3d.gb_3c'),
        img = $c('img', {id: 'googImg'}),
        div = $q('body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ'),
        btns = $q('body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf > div'),
        form = $q('body > div.L3eUgb form'),
        pop = $q('#dEjpnf'),
        li = $c('li', {role: "none"}),
        btn = $c('button', {id: 'buttonThemer', onclick: function() {themeChanger()}}),
        tn = $c('input', {id: 'themeNum', type: 'number', style: 'display: none;', onchange: function() {document.location.reload();}});
    try {
      for (let i = 0; i < cb.length; i++) if (!GM_getValue(cb[i].id)) GM_setValue(cb[i].id, false);
      for (let j = 0; j < cb2.length; j++) if (!GM_getValue(cb[j].id)) GM_setValue(cb[j].id, false);
      if (signIn) signIn.click();
      if (GM_getValue('defaultDateTimeView')) defaultDateTime();
      else {dateTime.hidden = true; clearInterval(timer)}
      div.insertBefore(div0, div.firstChild);
      div.insertBefore(img, div.firstChild.nextSibling);
      div.insertBefore(form, div.lastChild);
      div.appendChild(btns);
      if (GM_getValue('themeChanger')) btn.textContent = 'Change theme hourly:  On';
      else btn.textContent = 'Change theme hourly:  Off';
      li.appendChild(btn);
      li.appendChild(tn)
      pop.appendChild(li);
      tn.value = GM_getValue('themeNumber');
      onResize();
      if (dateTimeContainer) clearInterval(initInterval);
    } catch(ex) {}
  }, openInterval);

  GM_addStyle(''+
    '#buttonThemer {'+
    '  color: #999 !important;'+
    '  cursor: pointer !important;'+
    '  margin-left: 15px !important;'+
    '}'+
    '#YUIDDb > div:hover,'+
    '#buttonThemer:hover {'+
    '  color: #FFF !important;'+
    '}'+
    '#headerButtonsDiv > .gBtn {'+
    '  border-radius: 4px !important;'+
    '  margin-right: '+ elementSpacing +' !important;'+
    '  padding: 0 4px !important;'+
    '  text-indent: 22px !important;'+
    '}'+
    'body > div.L3eUgb form {'+
    '  margin-top: 14px !important;'+
    '  width: 584px !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div.ayzqOc {'+
    '  display: inline-flex !important;'+
    '  position: absolute !important;'+
    '  top: 337px !important;'+
    '}'+
    'div.ayzqOc > input, div.ayzqOc > button, div#buttonsContainer1 > button.gBtn, div#buttonsContainer2 > button.gBtn {'+
    ' background: linear-gradient(135deg, #070707, #333) !important;'+
    '}'+
    '#dEjpnf {'+
    '  padding-bottom: 10px !important;'+
    '  text-align: left !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img.lnXdpd {'+
    '  display: none !important;'+
    '}'+
    '#hplogo, #hpcta, #hpcanvas, #hplogocta, div.ddlsv-cta_, a.MV3Tnb, #gb > div > div:nth-child(1) > div, #gbqfbb, body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.ssOUyb, body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.AghGtd, body > div.L3eUgb > div.o3j99.c93Gbe > div > div.KxwPGc.iTjxkf > a, body > div.L3eUgb > div.o3j99.qarstb > div, body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div > div.SuUcIb, body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div > div:nth-child(2), #yDmH0d, #gb > div > div.gb_0a.gb_E.gb_k.gb_1a.gb_la > div.gb_Qf.gb_sb {'+
    '  display: none !important;'+
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
    '  padding: 0px !important;'+
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
    '#dateTimeContainer {'+
    '  margin: -16px 0 0 0 !important;'+
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
    '  filter: grayscale(1) brightness(.65) !important;'+
    '  position: relative !important;'+
    '  top: 6px !important;'+
    '  width: 40px !important;'+
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
    '#gClock:hover + #dateTime {'+
    '  background: #900 !important;'+
    '  border-color: #C00 !important;'+
    '  color: #FFF !important;'+
    '}'+
    '#gb {'+
    '  height: 8px !important;'+
    '  width: 100% !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div {'+
    '  margin-top: -50px !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.LLD4me.LS8OJ > div > a {'+
    '  display: none !important;'+
    '}'+
    '#googImg {'+
    '  background: url('+ googleImage +') no-repeat !important;'+
    '  margin-bottom: 20px !important;'+
    '  min-height: 140px !important;'+
    '  padding-left: 436px !important;'+
    '  pointer-events: none !important;'+
    '  position: relative !important;'+
    '  top: 20px !important;'+
    '  width: 0 !important;'+
    '}'+
    '.RNNXgb, #dateTime {'+
    '  background: linear-gradient(135deg, #070707, #333) !important;'+
    '  border-color: #CCC !important;'+
    '  box-shadow: 1px 0 4px #000 inset !important;'+
    '}'+
    '.RNNXgb:hover, .RNNXgb:focus-within {'+
    '  border-color: #777 !important;'+
    '}'+
    'body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf {'+
    '  padding: 0 20px !important;'+
    '}'+
    '.gBtn, #gSearch, #Mses6b, #headerButton, #submit, center > input {'+
    '  border: 1px solid #CCC !important;'+
    '  box-shadow: 1px 0 4px #000 inset !important;'+
    '  color: #AAA !important;'+
    '  cursor: pointer !important;'+
    '  width: auto !important;'+
    '  min-height: 32px  !important;'+
    '}'+
    '.gBtn:hover, #dateTimeContainer > #dateTime:hover, #gSearch:hover:hover, #Mses6b:hover, #headerButton:hover, #submit:hover, center > input:hover, #gb > div > div.gb_0a.gb_E.gb_k.gb_1a.gb_la .gb_Pe:hover {'+
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
    '#dEjpnf a.EzVRq, #dEjpnf button.EzVRq {'+
    '  color: #CCC !important;'+
    '  padding: 8px !important;'+
    '  text-decoration: none !important;'+
    '}'+
    '#dEjpnf a.EzVRq:hover, #dEjpnf button.EzVRq:hover {'+
    '  background-color: #333 !important;'+
    '  color: #FFF !important;'+
    '}'+
    '#buttonsContainer1, #buttonsContainer2 {'+
    '  background-color: #1C1E1F !important;'+
    '  border: 1px solid #625B51 !important;'+
    '  min-width: 153px !important;'+
    '  padding: 4px 2px 6px 2px !important;'+
    '  position: absolute !important;'+
    '  text-align: left !important;'+
    '  z-index: 2147483647 !important;'+
    '}'+
    '#buttonsContainer1 {'+
    '  border-radius: 4px 0 0 4px !important;'+
    '}'+
    '#buttonsContainer2 {'+
    '  border-left: none !important;'+
    '  border-radius: 0 4px 4px 0 !important;'+
    '  right: 0 !important;'+
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
    '  filter: grayscale(1) invert(1) !important;'+
    '  height: 22px !important;'+
    '  margin:  0 4px !important;'+
    '  position: relative !important;'+
    '  top: 6px !important;'+
    '  width: 22px !important;'+
    '}'+
    '#buttonsContainer1 > .aCkbx:first-of-type {'+
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
    '#buttonsContainer1 > .aBtn:first-of-type {'+
    '  padding: 4px 4px 4px 6px !important;'+
    '}'+
    '.aBtn {'+
    '  padding: 4px 23px 4px 6px !important;'+
    '}'+
    '.aCkbx:hover + .aBtn, .aBtn:hover {'+
    '  background-color: #444 !important;'+
    '  color: #FFF !important;'+
    '}'+
    '#gb > div > div:last-of-type {'+
    '  top: -8px !important;'+
    '}'+
    '#gb > div > div.gb_0a.gb_E.gb_k.gb_1a.gb_la {'+
    '  margin-top: -10px !important;'+
    '}'+
  '');

})();
