var assert = require("assert");
import todo from "../dist/animator";

describe("Package", function () {
  it("works", ()=>{
    assert.equal(todo(), 42);
  });
});
