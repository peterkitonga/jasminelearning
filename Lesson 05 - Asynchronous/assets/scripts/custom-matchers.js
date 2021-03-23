const customMatchers = {
    toBeCalculator() {
        return {
            /**
             * The param actual is atumatically assigned
             * the expected value by jasmine
             * 
             * @param actual
            */
            compare(actual) {
                const result = {
                    pass: actual instanceof Calculator, // checks value if instance of calculator class
                    message: ''
                };

                if (result.pass) {
                    // Used when the matcher is negated i.e when using the 'not' matcher
                    result.message = `Expected ${actual} not to be instance of Calculator`
                } else {
                    result.message = `Expected ${actual} to be instance of Calculator`
                }

                return result
            }
        }
    }
}