/**
 * A suite in jasmine is a group of specs that we define to
 * test a given block of JavaScript code.
 * 
 * To disable a suite, we use the xdescribe() function which inturn 
 * disables all the specs under it.
*/
describe('calculator.js', () => {
    /**
     * It is good practice to nest suites for easier readability. This make it clear
     * which group of specs test what in a source file
    */
    describe('Calculator', () => {
        let calculator;
        let calculator_two;

        beforeEach(() => {
            // we can use this method to define all variables that are common in our specs in the suite
            calculator = new Calculator();
            calculator_two = new Calculator();
        });

        afterEach(() => {
            // runs after each spec is run in the suite
        })

        it('should initialize the total', () => {
            expect(calculator.total).toBe(0);
        });

        it('should have a constructor', () => {
            /**
             * Here we use the toEqual() matcher to compare the
             * objects passed for deeper equality comparison since
             * objects are reference types and will fail if compared
             * using the toBe() matcher
            */
            expect(calculator).toEqual(calculator_two);
        });

        it('can be instantiated', () => {
            /**
             * Registers custom matchers of our custom script loaded
             * in the spec-runner html file
            */
            jasmine.addMatchers(customMatchers);

            
            /**
             * This matcher expects the actual value to be truthy.
             * Truthy values are values that translate to a boolean 
             * result of true. The opposite happens for a falsy value 
             * where we use the toBeFalsy() matcher
            */
            expect(calculator).toBeTruthy();

            /**
             * Below is a custom matcher. It checks wether the value is an
             * instance of the calculator class
            */
            expect(calculator).toBeCalculator();
        });

        it('instatiates a unique object', () => {
            /**
             * Here we use the 'not' reference to negate a matcher. This inverts the behaviour
             * of the matcher when comparing the actual value to the expected value. 'not' can
             * be used together with any matcher.
            */
            expect(calculator).not.toBe(calculator_two);
        });

        it('has common operations', () => {
            /**
             * Here we use the 'toBeUndefined' matcher to determine whether the value in our
             * expectation equates to undefined
            */
            expect(calculator.add).not.toBeUndefined();
            expect(calculator.subtract).not.toBeUndefined();
            expect(calculator.multiply).not.toBeUndefined();

            /**
             * Here we use the 'toBeDefined' matcher which tests the opposite of the 
             * 'toBeUndefined' matcher. It is equivalent to '.not.toBeUndefined'
            */
            expect(calculator.divide).toBeDefined();

            /**
             * Here the 'toContain' matcher is used to test whether the value passed contains
             * a specified substring. This matcher can also be used to test whether an element
             * exists in an object or array.
            */
            expect(calculator.constructor.name).toContain('Calc');
        });

        it('can overwrite total', () => {
            // let overwite total to null
            calculator.total = null;

            /**
             * This matcher tests whether the actual value is null
            */
            expect(calculator.total).toBeNull();
        });

        describe('add()', () => {
            /**
             * Specs are a set of expectations that test a block
             * of code. Each spec has a title and callback function that
             * houses the expectations.
            */
            it('should add numbers to total', () => {
                /**
                 * An expectation is an assertion that tests a statement 
                 * returning a boolean value of the result.
                */
                calculator.total = 40;
                calculator.add(5);

                /**
                 * Below we have a function toBe() which is called a matcher.
                 * 
                 * A matcher is a function that implements a boolean comparison 
                 * between the actual value and the expected value. It is responsible 
                 * for reporting to jasmine if the expectation is true or false.
                */
                expect(calculator.total).toBe(45);
            });

            it('returns a positive or negative total', () => {
                calculator.total = 50;
    
                expect(calculator.add(20)).toBe(70);
    
                /**
                 * Here the matcher 'toMatch' is used to test whether the expected value matches a regular expression.
                 * The below regex checks for positive and negative digits
                */
                expect(calculator.total).toMatch(/-?\d+/);
                // This is a simpler regular expression matching the type
                expect(typeof calculator.total).toMatch('number');
    
                // this is a third party matcher from the jasmine-matchers.js file
                expect(calculator.total).toBeNumber();
    
                /**
                 * jasmine.anything() is used by any matcher that uses equality such as toEqual, toContain and more.
                 * It tests any value as long as it is not null or undefined
                */
                expect(calculator.total).toEqual(jasmine.anything());
            });
        });

        describe('subtract()', () => {
            /**
             * When we want to disable a spec, we use the xit() function.
             * This temporarily disables a spec and marks it as pending
             * which makes it not to be executed.
            */
            it('should subtract numbers from total', () => {
                // Expectations go here
                calculator.total = 40;
                calculator.subtract(5);

                expect(calculator.total).toBe(35);
            });
        });

        describe('multiply()', () => {
            it('should multipy total by number', () => {
                // Expectations go here
                calculator.total = 40;
                calculator.multiply(2);
    
                expect(calculator.total).toBe(80);
            });

            it('does not handle NaN', () => {
                calculator.total = 20;
                calculator.multiply('a');
    
                /**
                 * Here the matcher 'toBeNaN' is used to test whether the value passed is not
                 * a number.
                */
                expect(calculator.total).toBeNaN();
            });
        });

        describe('divide()', () => {
            it('should divide total by number', () => {
                // Expectations go here
                calculator.total = 40;
                calculator.divide(10);
    
                expect(calculator.total).toBe(4);
            });

            it('handles divide by zero', () => {
                /**
                 * Here the matcher 'toThrow' is used to test that the callback passed throws an exception.
                */
                expect(() => calculator.divide(0)).toThrow();
    
                /**
                 * This matcher tests what kind of exception is thrown by passing the expected exception class
                */
                expect(() => calculator.divide(0)).toThrowError(Error);
    
                /**
                 * Here, we also test the message of the exception thrown matches with our expected value
                */
                expect(() => calculator.divide(0)).toThrowError(Error, 'Cannot divide by zero');
            });
        });

        describe('[get] version', () => {
            /**
             * The async callback lets jasmine know this is an asynchronous spec and this allows us to use the
             * 'await' keyword which will wait for the version Promise to resolve
            */
            it('fetches version from external source', async () => {
                /**
                 * We can also install a spy on the fetch method used for the asynchronous request
                 * Here, we return a value that is a resolved promise with a response that contains the
                 * version value
                */
                spyOn(window, 'fetch').and.returnValue(Promise.resolve(
                    new Response('{"version": "0.1"}')
                ));

                /**
                 * Here, because our suite is now an async function we can use the 'await' keyword
                 * and ommit the 'then' callback
                 * 
                 * Note: always call the done callback whenever it is passed to the spac as an argument
                */
                const version = await calculator.version;

                expect(version).toBe('0.1');
            });
        });
    });
});