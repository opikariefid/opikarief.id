var randomRelatedIndex, showRelatedPost;
(function(n, m, k) {
    var d = {
        widgetTitle: "<h4>Artikel lainnya:</h4>",
        widgetStyle: 1,
        homePage: "http://opikarief.blogspot.com",
        numPosts: 7,
        summaryLength: 370,
        titleLength: "auto",
        thumbnailSize: 72,
        noImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAA3NCSVQICAjb4U/gAAAADElEQVQImWOor68HAAL+AX7vOF2TAAAAAElFTkSuQmCC",
        containerId: "related-post",
        newTabLink: false,
        moreText: "Baca Selengkapnya",
        callBack: function() {}
    };
    for (var f in relatedPostConfig) {
        d[f] = (relatedPostConfig[f] == "undefined") ? d[f] : relatedPostConfig[f]
    }
    var j = function(a) {
            var b = m.createElement("script");
            b.type = "text/javascript";
            b.src = a;
            k.appendChild(b)
        },
        o = function(b, a) {
            return Math.floor(Math.random() * (a - b + 1)) + b
        },
        l = function(a) {
            var p = a.length,
                c, b;
            if (p === 0) {
                return false
            }
            while (--p) {
                c = Math.floor(Math.random() * (p + 1));
                b = a[p];
                a[p] = a[c];
                a[c] = b
            }
            return a
        },
        e = (typeof labelArray == "object" && labelArray.length > 0) ? "/-/" + l(labelArray)[0] : "",
        h = function(b) {
            var c = b.feed.openSearch$totalResults.$t - d.numPosts,
                a = o(1, (c > 0 ? c : 1));
            j(d.homePage.replace(/\/$/, "") + "/feeds/posts/summary" + e + "?alt=json-in-script&orderby=updated&start-index=" + a + "&max-results=" + d.numPosts + "&callback=showRelatedPost")
        },
        g = function(z) {
            var s = document.getElementById(d.containerId),
                x = l(z.feed.entry),
                A = d.widgetStyle,
                c = d.widgetTitle + '<div class="related-post-style-' + A + '">',
                b = d.newTabLink ? ' target="_blank"' : "",
                y = '<span style="display:block;clear:both;"></span>',
                v, t, w, r, u;
            if (!s) {
                return
            }
            for (var q = 0; q < d.numPosts; q++) {
                if (q == x.length) {
                    break
                }
                t = x[q].title.$t;
                w = (d.titleLength !== "auto" && d.titleLength < t.length) ? t.substring(0, d.titleLength) + "&hellip;" : t;
                r = ("media$thumbnail" in x[q] && d.thumbnailSize !== false) ? x[q].media$thumbnail.url.replace(/\/s[0-9]+(\-c)?/, "/s" + d.thumbnailSize + "-c") : d.noImage;
                u = ("summary" in x[q] && d.summaryLength > 0) ? x[q].summary.$t.replace(/<br ?\/?>/g, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "").substring(0, d.summaryLength) + "&hellip;" : "";
                for (var p = 0, a = x[q].link.length; p < a; p++) {
                    v = (x[q].link[p].rel == "alternate") ? x[q].link[p].href : "#"
                }
                if (A == 2) {
                    c += '<a class="title" title="' + t + ' href="' + v + '"' + b + '>' + w + '</a><div><img alt="' + t + '" class="image" src="' + r + '" style="width:' + d.thumbnailSize + ';height:' + d.thumbnailSize + '" title="' + t + '"><div class="desc">' + u + '</div>' + y + '</div><div class="jumplink"><a href="' + v + ' class="more" ' + b + '>' + d.moreText + '</a></div>'
                } else {
                    if (A == 3 || A == 4) {
                        c += '<li class="related-post-item" tabindex="0"><a class="related-post-item-title" href="' + v + '"' + b + '><img alt="' + t + '" class="related-post-item-thumbnail" src="' + r + '" style="width:' + d.thumbnailSize + ';height:' + d.thumbnailSize + '" title="' + t + '"></a><div class="related-post-item-tooltip"><a class="related-post-item-title" title="' + t + '" href="' + v + '"' + b + ">" + w + "</a></div>" + y + "</li>"
                    } else {
                        if (A == 5) {
                            c += '<li class="related-post-item" tabindex="0"><a class="related-post-item-wrapper" href="' + v + '" title="' + t + '"' + b + '><img alt="' + t + '" class="related-post-item-thumbnail" src="' + r + '" style="width:' + d.thumbnailSize + ';height:' + d.thumbnailSize + '" title="' + t + '"><span class="related-post-item-tooltip">' + w + "</span></a>" + y + "</li>"
                        } else {
                            if (A == 6) {
                                c += '<li><a class="related-post-item-title" title="' + t + '" href="' + v + '"' + b + ">" + w + '</a><div class="related-post-item-tooltip"><img alt="' + t + '" class="related-post-item-thumbnail" src="' + r + '" style="width:' + d.thumbnailSize + ';height:' + d.thumbnailSize + '" title="' + t + '"><span class="related-post-item-summary"><span class="related-post-item-summary-text">' + u + "</span></span>" + y + "</div></li>"
                            } else {
                                c += '<li><a title="' + t + '" href="' + v + '"' + b + ">" + w + "</a></li>"
                            }
                        }
                    }
                }
            }
            s.innerHTML = c += "</div>" + y;
            d.callBack()
        };
    randomRelatedIndex = h;
    showRelatedPost = g;
    j(d.homePage.replace(/\/$/, "") + "/feeds/posts/summary" + e + "?alt=json-in-script&orderby=updated&max-results=0&callback=randomRelatedIndex")
})(window, document, document.getElementsByTagName("head")[0]);
