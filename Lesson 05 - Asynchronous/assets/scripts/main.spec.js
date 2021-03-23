describe('main.js', () => {
    describe('calculate()', () => {
        it('validates expression when first number is invalid', () => {
            /**
             * The spyOn() method is a global jasmine method that accepts two arguments: the object to spy on
             * and the method name to replace with a spy
             * 
             * Here, we spy on the updateResult method which is available globally in the window object.
             * The '.and.stub()' simply tells the spy to do nothing when invoked
             * 
            */
            spyOn(window, 'updateResult').and.stub()

            calculate('a+3')

            /**
             * This simply checks that our spy has been called atleast once in the
             * calculate method call
            */
            expect(window.updateResult).toHaveBeenCalled()
        })

        it('validates expression when second number is invalid', () => {
            spyOn(window, 'updateResult') // and.stub() can be omitted because it is the default behaviour

            calculate('3+a')

            /**
             * This simply checks that our spy has been called atleast once in the
             * calculate method call
            */
            expect(window.updateResult).toHaveBeenCalled()

            /**
             * This matcher simply checks how many times our spy has been invoked. The argument passed to the
             * matcher is the expected number of times
            */
            expect(window.updateResult).toHaveBeenCalledTimes(1)
        })

        it('validates expression when operation is invalid', () => {
            spyOn(window, 'updateResult') // and.stub() can be omitted because it is the default behaviour

            calculate('3_3')

            /**
             * This simply checks that our spy has been called atleast once in the
             * calculate method call
            */
            expect(window.updateResult).toHaveBeenCalled()

            /**
             * This matcher simply checks if the spy has received an argument of the expected value
             * passed
            */
            expect(window.updateResult).toHaveBeenCalledWith('Operation not recognized')
        })

        it('calls add', () => {
            /**
             * spyOn method returns a spy instance which we can pass directly to our 
             * expectation where we will use desired matchers
            */
            const spy = spyOn(Calculator.prototype, 'add')

            calculate('3+4')

            // here we are checking how many times the 'add' prototype of the calculator class is invoked
            expect(spy).toHaveBeenCalledTimes(2)

            // here we check that the first and second number in the expression are passed to the spy instance
            expect(spy).toHaveBeenCalledWith(3)
            expect(spy).toHaveBeenCalledWith(4)
        })

        it('calls subtract', () => {
            /**
             * spyOn method returns a spy instance which we can pass directly to our 
             * expectation where we will use desired matchers
            */
            const spy = spyOn(Calculator.prototype, 'subtract')

            calculate('5-4')

            // here we are checking how many times the 'subtract' prototype of the calculator class is invoked
            expect(spy).toHaveBeenCalledTimes(1)

            // here we check that the second number in the expression is passed to the spy instance
            expect(spy).toHaveBeenCalledWith(4)
        })

        it('calls multiply', () => {
            /**
             * spyOn method returns a spy instance which we can pass directly to our 
             * expectation where we will use desired matchers
            */
            const spy = spyOn(Calculator.prototype, 'multiply')

            calculate('3*8')

            // here we are checking how many times the 'multiply' prototype of the calculator class is invoked
            expect(spy).toHaveBeenCalledTimes(1)

            // here we check that the second number in the expression is passed to the spy instance
            expect(spy).toHaveBeenCalledWith(8)

            // here we use the not negator to check if the expected value is not passed to the invoked spy
            expect(spy).not.toHaveBeenCalledWith(3)
        })

        it('calls divide', () => {
            /**
             * spyOn method returns a spy instance which we can pass directly to our 
             * expectation where we will use desired matchers
            */
            const spy = spyOn(Calculator.prototype, 'divide')

            calculate('8/4')

            // here we are checking how many times the 'divide' prototype of the calculator class is invoked
            expect(spy).toHaveBeenCalledTimes(1)

            // here we check that the second number in the expression is passed to the spy instance
            expect(spy).toHaveBeenCalledWith(4)

            // here we use the not negator to check if the expected value is not passed to the invoked spy
            expect(spy).not.toHaveBeenCalledWith(8)
        })

        it('calls updateResult (example using .and.callThrough())', () => {
            const spy = spyOn(window, 'updateResult')

            /**
             * Here, we install a spy on the multiply prototype and use
             * callThrough to invoke the real implementation of the prototype
             * 
             * This will allow the real multiplication to be run that way we can
             * test whether the final result was passed to the last updateResult
             * function call
            */
            spyOn(Calculator.prototype, 'multiply').and.callThrough()
            
            calculate('5*5')

            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledWith(25)
        })

        it('calls updateResult (example using .and.callFake())', () => {
            const spy = spyOn(window, 'updateResult')

            /**
             * Here, we install a spy and use callFake to call a specific custom 
             * implementation when the  spy is invoked
             * 
             * This will be used in very rare cases and in ways looks like we are 
             * testing the spy implementation itself
            */
            spyOn(Calculator.prototype, 'multiply').and.callFake((number) => {
                // here, the number argument is the second in the expression
                return number * 2
            })
            
            calculate('5*4')

            expect(spy).toHaveBeenCalled()
            // tests that 4 * 2 is 8
            expect(spy).toHaveBeenCalledWith(8)
        })

        it('calls updateResult (example using .and.returnValue())', () => {
            const spy = spyOn(window, 'updateResult')

            /**
             * Here, we install a spy and use returnValue to pass a final value that the spy returns
             * 
             * This strategy works the same way as the callFake, only it returns a value
            */
            spyOn(Calculator.prototype, 'multiply').and.returnValue('whatever [multiply] returns')
            
            calculate('5*4')

            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledWith('whatever [multiply] returns')
        })

        it('calls updateResult (example using .and.returnValues())', () => {
            const spy = spyOn(window, 'updateResult')

            /**
             * Here, returnValues is invoked in the order of the arguments passed
            */
            spyOn(Calculator.prototype, 'add').and.returnValues(5, 'whatever [add] returns')
            
            calculate('5+4')

            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledWith('whatever [add] returns')
        })

        it('does not handle errors', () => {
            /**
             * This simply tells the spy to throw an error when invoked.
            */
            spyOn(Calculator.prototype, 'multiply').and.throwError('some error')

            /**
             * Since the spy is throwing an error we can use the toThrowError matcher
             * to check the exception thrown matches
            */
            expect(() => calculate('5*10')).toThrowError('some error')
        })
    })

    describe('updateResult()', () => {
        let element;

        beforeAll(() => {
            // executed once before specs are run
            element = document.createElement('div')
            element.setAttribute('id', 'calculator-result-span')
            document.body.appendChild(element)
        })

        afterAll(() => {
            // in this case we use after all to clean up the DOM after the spec has run and passed
            const element_remove = document.getElementById('calculator-result-span')

            document.body.removeChild(element_remove)
        })

        it('adds result to DOM element', () => {
            updateResult('5')

            expect(element.innerText).toBe('Result: 5')
        }) 
    })

    describe('showVersion()', () => {
        it('calls calculator.version getter', () => {
            /**
             * Here we can use install a spy on the DOM instead of using a setup and teardown approach
            */
            spyOn(document, 'getElementById').and.returnValue({
                id: 'calculator-version',
                innerText: null,
            })

            /**
             * This installs a spy on the getter 'version' since spyOn cannot work with getters.
             * This method is similar ro spyOn, only it has a third argument which is the access type.
             * This access type can be either 'get' or 'set', default value is 'get'
             * 
             * It can also be used on setters as well.
             * 
            */
            const spy_on_getter = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(
                /**
                 * Since we are now getting the version as a promise,
                 * we need to return a value as a resolved promise for the
                 * spy installed on the getter to work
                */
                Promise.resolve()
            )

            showVersion()

            expect(spy_on_getter).toHaveBeenCalled()
            expect(spy_on_getter).toHaveBeenCalledTimes(1)
        })
    })
})