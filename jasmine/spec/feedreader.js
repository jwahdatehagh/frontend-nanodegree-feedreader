/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all have a valid URL', function() {
            var invalidUrls = [];
            var regex = /^(http(s)?:\/\/[a-zA-Z0-9\-_]+\.[a-zA-Z]+(.)+)+/g;
            allFeeds.forEach(function(feed) {
                if (!feed.url || !feed.url.match(regex)) {
                    invalidUrls.push(feed.url || 'no url provided');
                }
            });
            expect(invalidUrls.length).toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all have a valid name', function() {
            var invalidNames = [];
            allFeeds.forEach(function(feed) {
                if (!feed.name) {
                    invalidNames.push(feed.name || 'no name provided');
                }
            });
            expect(invalidNames.length).toBe(0);
        });

    });


    /* Menu test suite */
    describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('can be opened and closed', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* Initial Entries test suite */
    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('are present', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

    });


    /* New Feed Selection test suite */
    describe('New Feed Selection', function() {

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('results in new feeds being loaded', function(done) {
            var firstResult = $($('.feed .entry')[0]).text();

            var feedsLoaded = function() {
                // check the text of the new feed
                var newFirstResult = $($('.feed .entry')[0]).text();
                expect(newFirstResult).not.toBe(firstResult);
                done();
            };

            // load a new feed and execute our callback as soon as that's done
            loadFeed(1, feedsLoaded);
        });

    });
}());
