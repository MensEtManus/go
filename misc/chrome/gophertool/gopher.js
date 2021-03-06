// Copyright 2011 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var numericRE = /^\d+$/;
var commitRE = /^(?:\d+:)?([0-9a-f]{6,20})$/; // e.g "8486:ab29d2698a47" or "ab29d2698a47"
var pkgRE = /^[a-z0-9_\/]+$/;

function urlForInput(t) {
    if (!t) {
        return null;
    }

    if (numericRE.test(t)) {
        if (t < 150000) {
            // We could use the golang.org/cl/ handler here, but
            // avoid some redirect latency and go right there, since
            // one is easy. (no server-side mapping)
            return "https://github.com/golang/go/issues/" + t;
        }
        return "https://golang.org/cl/" + t;
    }

    var match = commitRE.exec(t);
    if (match) {
        return "https://golang.org/change/" + match[1];
    }

    if (pkgRE.test(t)) {
        // TODO: make this smarter, using a list of packages + substring matches.
        // Get the list from godoc itself in JSON format?
        return "http://golang.org/pkg/" + t;
    }

    return null;
}
