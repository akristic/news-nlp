import { handleSubmit } from "./formHandler"
import { checkForInputType } from "./nameChecker"


describe("Testing input text check", () => {
  test("Testing by sending simple text", async () => {
    expect(checkForInputType("test text")).toStrictEqual({text: "test text"})
  })
  test('Testing by checking https://www.google.com', async () => {
    expect(checkForInputType("https://www.google.com")).toStrictEqual({url: "https://www.google.com"})
  })
  test('Testing trim in text', async () => {
    expect(checkForInputType(" Hello World!    ")).toStrictEqual({text: "Hello World!"})
  })
  test('Testing by checking empty string', async () => {
    expect(checkForInputType(" ")).toStrictEqual({error: "Empty String Error"})
  })
})
describe("Testing the submit function", () => {
    test("Testing the submit function", () => {
      expect(handleSubmit).toBeDefined()
  })
})
