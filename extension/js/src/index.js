'use strict';

require('es5-shim/es5-shim');
var $ = require('jquery');
var _ = require('underscore');

window.$ = $;
// closure to allow early returns :(
(function () {

    var whitelist = new RegExp([
        'https?\\:\\/\\/',
        '(?:www\\.)?',
        '(?:' + [
            '\\w*times\\w*',
            '\\w*post\\w*',
            '\\w*journal\\w*',
            '\\w*news\\w*',
            '\\w*spectator\\w*',
            'mic',
            'buzzfeed',
            'cnn'
        ].join('|') + ')',
        '\\.com',
        '\\/.+',
        '\\/.+'
    ].join(''), 'i');


    if (!window.location.href.match(whitelist)) {
        return console.log('Location does not match. Exiting invole.me early.');
    }

    console.log('running involve.me!');

    // grab article segments
    var $tags = $('article p');
    // assemble a list of text
    var segments = [];
    $tags.each(function () {
        segments.push($(this).text());
    });

    // set up a match expression
    var orgs = wordBoundaryMatch([
            // list would go here
            'salvation army',
            'the red cross',
            'doctors without borders'
        ]);

    function wordBoundaryMatch(list) {
        return new RegExp([
            '\\b(',
            list.join('|'),
            ')\\b',
            '(?![^<]+>)' // exclude attributes
        ].join(''), 'gi');
    }

    // find all matches, uniquely
    var counts = segments.join(' ')
        .match(orgs)
        .reduce(function (soFar, match) {
            var lower = match.toLowerCase();
            if (!soFar[lower]) {
                soFar[lower] = 0;
            }

            soFar[lower] += 1;

            return soFar;
        }, {});

    var matches = Object.keys(counts);
    console.log(counts);
    var replacement = wordBoundaryMatch(matches);
    $tags.each(function () {
        var $el = $(this);
        var wrapped = $el.html().replace(replacement, '<span class="involve-me-highlight">$1</span>');

        $el.html(wrapped);
    });

}());
