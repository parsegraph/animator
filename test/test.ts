var assert = require("assert");
import Animator from "../src/index";

describe("Animator", function () {
  it("works", () => {
    const a = new Animator(1000);
    assert.ok(a);
    assert.equal(a.animating(), false);
    a.restart();
    assert.equal(a.animating(), true);
  });
});
