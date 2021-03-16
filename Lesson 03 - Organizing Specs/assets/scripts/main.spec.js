describe('main.js', () => {
    describe('calculate()', () => {
        xit('validates expression', () => {
            
        })

        xit('calls add', () => {

        })

        xit('calls subtract', () => {

        })

        xit('calls multiply', () => {

        })

        xit('calls divide', () => {

        })

        xit('validates operation', () => {

        })

        xit('calls updateResult', () => {

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
})