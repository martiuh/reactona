const rewire = require("rewire")
const clientStore = rewire("./clientStore")
const composeEnhancers = clientStore.__get__("composeEnhancers")
// @ponicode
describe("composeEnhancers", () => {
    test("0", () => {
        let callFunction = () => {
            composeEnhancers(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            composeEnhancers(-100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            composeEnhancers(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            composeEnhancers(-5.48)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            composeEnhancers(100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            composeEnhancers(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
