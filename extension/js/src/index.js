'use strict';
// // shim es5
// require('es5-shim/es5-shim');
var $ = require('jquery');
var orgData = {};
window.$ = $;
window.jQuery = $;

var stub = require('stub');

var tooltip = require('opentip-jquery');
tooltip.styles.involveMe = {
    fixed: true,
    showOn: 'creation',
    className: 'involve-me-tooltip',
    hideTrigger: 'target',
    background: '#ffffff',
    borderColor: 'rgba(82, 239, 150, .4)',
    shadowColor: 'rgba(82, 239, 150, .5)',
    shadowBlur: 8
};

var templates = require('templates');

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


    // we're going to have some kind of list here which is populated already
    // set up a match expression
    var orgs = wordBoundaryMatch([
            // list would go here
            'salvation army',
            'the red cross',
            'doctors without borders',
            'Bill (?:&(?:amp;)?|and) Melinda Gates Foundation',
            'World Vision',
            'Social Venture Partners'
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
            console.log(match);
            var lower = match.toLowerCase();
            if (!soFar[lower]) {
                soFar[lower] = 0;
            }

            soFar[lower] += 1;

            return soFar;
        }, {});

    getMatchData(Object.keys(counts).join(','), function (err, data) {
        
        if (err || !Object.keys(data).length) {
            return console.log('no info available!');
        }

        // account for ampersands
        var matches = Object.keys(data).map(function (k) {
            return k.replace(/&(?!:amp;)/i, '&(?:amp;)?');
        });

        var replacement = wordBoundaryMatch(matches);

        // replace the matches with our tags
        $tags.each(function () {
            var $el = $(this);
            var wrapped = $el.html().replace(replacement, '<span class="involve-me-highlight">$1</span>');

            if (wrapped !== $el.html()) {
                console.log(wrapped);
            }

            $el.html(wrapped);
        });

        setupListeners();
    });
}());

function getMatchData(matches, cb) {
    $.ajax({
        type: 'GET',
        url: 'https://3c5b4fa9.ngrok.io/api/v1/matchquery/',
        data: {
            matches: matches
        },
        success: function (data) {
            data = stub;
            var parsed = parseData(data);
            cb(null, parsed);
        },
        error: function (err) {
            cb(err);
        }
    });
   
}

function parseData(data) {
    // we'll put match words in here
    var hash = {};
    data.forEach(function (item) {
        var match = item.match.match.toLowerCase();
        var data = item.action;
        if (!match || !data) {
            return console.log('invalid data!');
        }
        var org = data.organization;
        if (!org) {
            return console.log('no organization available');
        }

        var rating = {
            description: org.rating > 3 ? 'trustworthy' : 'questionable',
            value: org.rating,
            dots: []
        };

        for (var i = 0; i < org.rating; i++) {
            rating.push({
                state: i > org.rating ? 'off' : 'on'
            });
        }

        hash[match] = {
            name: org.name,
            orgUrl: org.url,
            location: org.location,
            description: data.text || org.text,
            showMore: data.learn_more,
            donate: data.donate_url,
            volunteer: data.volunteer_url,
            rating: rating
        };
    });

    orgData = hash;
    return hash;
}

function setupListeners() {
    // we're going to use this later to hide tooltips on other hovers and mouseout
    var active = null;
    var hovered = false;
    var queuedRemove = null;
    $('body').on('mouseenter', '.involve-me-highlight', function (e) {
        var $el = $(e.currentTarget);
        
        // set state
        console.log('entered target!');
        hovered = true;
        
        // make sure to start over if necessary
        if (active) {
            active.hide();
        }

        if (queuedRemove) {
            clearTimeout(queuedRemove);
        }
        
        var data = orgData[$el.text().toLowerCase()];
        if (!data) {
            return console.log('looks like we don\'t have org data here!');
        }

        var html = templates.modal(data);
        active = $el.opentip(html, { 
            style: 'involveMe'
        });

    }).on('mouseleave', '.involve-me-highlight', function (e) {
        console.log('left target!');
        hovered = false;
        tryDelayedRemoval();
    }).on('mouseenter', '.style-involve-me-tooltip', function (e) {
        console.log('entered tooltip!');
        hovered = true;
    }).on('mouseleave', '.style-involve-me-tooltip', function (e) {
        console.log('left tooltip!');
        hovered = false;
        tryDelayedRemoval();
    });

    function tryDelayedRemoval() {
        if (queuedRemove) {
            clearTimeout(queuedRemove);
        }

        return;
        // wait half a second before trying to hide the modal
        queuedRemove = setTimeout(function () {
            queuedRemove = null;
            if (hovered) {
                // modal is still being interacted with
                return;
            }

            active.hide();
            active = null;
        }, 1000); // wait a second before hiding
    }
}


