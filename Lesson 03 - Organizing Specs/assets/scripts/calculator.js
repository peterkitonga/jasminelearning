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
}