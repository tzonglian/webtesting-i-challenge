//const enhancer = require("./enhancer.js");
const en = require("./enhancer.js");

// test away!

let item1, item2, faileditem1, faileditem2, faileditem3;
beforeEach(() => {
  item1 = { name: "shield", durability: 20, enhancement: 20 };
  item2 = { name: "armor", durability: 50, enhancement: 15 };
  faileditem1 = { name: "greaves", durability: 10, enhancement: 0 };
  faileditem2 = { name: "spear", durability: 10, enhancement: 20 };
  faileditem3 = { name: "javelin", durability: 10, enhancement: 16 };
});

// Sanity Checks - Passed
describe("sanity checks", () => {
  test("basic tests", () => {
    expect([]).toBeTruthy();
    expect({}).toEqual({});
  });
});

// Repairs - WORKS
describe("repair module", () => {
  it("exists", () => {
    expect(en.itemMaker("sword", 80, 10)).toBeInstanceOf(Object);
  });
  it("returns an object with name, durability, and enhancement", () => {
    expect(en.itemMaker("sword", 80, 10)).toHaveProperty("name");
    expect(en.itemMaker("sword", 80, 10)).toHaveProperty("durability");
    expect(en.itemMaker("sword", 80, 10)).toHaveProperty("enhancement");
    expect(en.itemMaker("sword", 80, 10)).toMatchObject({
      name: "sword",
      durability: 80,
      enhancement: 10,
    });
  });
  test("snapshot", () => {
    // expect(en.itemMaker("sword", 10)).toMatchSnapshot(); // should fail
    expect(en.itemMaker("sword", 80, 10)).toMatchSnapshot(); // should work
  });
  it("successfully calls repairs function and durability set to 100", () => {
    expect(en.repair(item1)).toMatchObject({ ...item1, durability: 100 });
  });
});

// Success - WORKS
describe("success module", () => {
  it("exists", () => {
    expect(en.success(item1)).toBeInstanceOf(Object);
  });
  it("successfully calls success function and enhancement +1", () => {
    expect(en.success(item1)).toMatchObject({ ...item1, enhancement: 20 });
    expect(en.success(item2)).toMatchObject({ ...item2, enhancement: 16 });
  });
  test("snapshot", () => {
    // expect(en.itemMaker("sword", 10)).toMatchSnapshot(); // should fail
    expect(en.success(item1)).toMatchSnapshot(); // should work
  });
});

describe("fail module", () => {
  it("exists", () => {
    expect(en.fail(item1)).toBeInstanceOf(Object);
  });
  it("calls fail function and decrease durability by 5", () => {
    expect(en.fail(faileditem1)).toMatchObject({
      ...faileditem1,
      durability: 5,
    });
  });
  it("calls fail function and decrease durability by 10, minus 1 enhance", () => {
    expect(en.fail(faileditem2)).toMatchObject({
      ...faileditem2,
      durability: 0,
      enhancement: 19,
    });
  });
  it("calls fail function and decrease durability by 10", () => {
    expect(en.fail(faileditem3)).toMatchObject({
      ...faileditem3,
      durability: 0,
      enhancement: 16,
    });
  });
});
