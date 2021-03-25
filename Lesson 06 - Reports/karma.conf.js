module.exports = (config) => {
    config.set({
        color: true,
        singleRun: true, // for CI system to run once and move on
        frameworks: ['jasmine', 'jasmine-matchers'],
        preprocessors: {
            // tells the coverage report where to report on
            'assets/scripts/*.js': ['coverage'],
            'tests/specs/*.js': ['coverage']
        },
        files: [ // order of files matters, same order is used to load them
            'tests/helpers/custom-matchers.js',
            'assets/scripts/*.js',
            'tests/specs/*.spec.js'
        ],
        plugins: [
            'karma-jasmine', 
            'karma-jasmine-matchers', 
            'karma-chrome-launcher',
            'karma-coverage'
        ],
        reporters: ['dots', 'coverage'], // 'coverage' value is added to as to enable the coverage reporter
        browsers: ['ChromeHeadless'], // for the headless browser, uses the puppeteer dependency
        coverageReporter: {
            // tells the coverage reporter where and how to generate the reports
            dir: 'tests/coverage/',
            reporters: [
                { type: 'html', subdir: 'html' }
            ]
        }
    })
};