/**
 * A suite in jasmine is a group of specs that we define to
 * test a given block of JavaScript code.
 * 
 * To disable a suite, we use the xdescribe() function which inturn 
 * disables all the specs under it.
*/
describe('calculator.js', () => {
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
        const calculator = new Calculator();
        calculator.total = 40;
        calculator.add(5);

        expect(calculator.total).toBe(45);
    });

    /**
     * When we want to disable a spec, we use the xit() function.
     * This temporarily disables a spec and marks it as pending
     * which makes it not to be executed.
    */
    xit('should subtract numbers from total', () => {
        // Expectations go here
        const calculator = new Calculator();
        calculator.total = 40;
        calculator.subtract(5);

        expect(calculator.total).toBe(35);
    });

    it('should multipy total by number', () => {
        // Expectations go here
        const calculator = new Calculator();
        calculator.total = 40;
        calculator.multiply(2);

        expect(calculator.total).toBe(80);
    });

    it('should divide total by number', () => {
        // Expectations go here
        const calculator = new Calculator();
        calculator.total = 40;
        calculator.divide(10);

        expect(calculator.total).toBe(4);
    });
});