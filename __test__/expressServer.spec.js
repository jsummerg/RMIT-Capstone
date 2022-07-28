import { listening } from "../src/server/index"


describe("Testing the listening functionality from server(index.js)", () => {
    // Testing listening 
    test("Testing the port listening() function", () => {
           expect(listening).toBeUndefined();
})
});