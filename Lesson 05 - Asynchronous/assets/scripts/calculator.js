class Calculator {
    constructor() {
        this.total = 0;
    }

    add(number) {
        return this.total += number;
    }

    subtract(number) {
        return this.total -= number;
    }

    multiply(number) {
        return this.total *= number;
    }

    divide(number) {
        if(number === 0) { 
            throw new Error('Cannot divide by zero'); 
        }
        
        return this.total /= number;
    }

    get version() {
        return fetch('https://gist.githubusercontent.com/juanlizarazo/4b2d229ba483ca13b1a6d7bf3079dc8b/raw/228ac05e04118037be02c38d9b86945c1356a2e2/version.json').then(response => {
            return response.json()
        }).then(data => {
            return data.version
        })
    }
}

// Another way to add a getter to the class
// Object.defineProperty(Calculator.prototype, 'version', {
//     get() {
//         return '0.1'
//     },
//     enumerable: true,
//     configurable: true
// })