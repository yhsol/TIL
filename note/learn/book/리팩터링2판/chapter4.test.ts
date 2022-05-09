import { assert, expect } from "chai";
import { Province, sampleProvinceData } from "../chapter4";

describe("province", () => {
  let asia: Province;

  // set fixture
  beforeEach(() => {
    asia = new Province(sampleProvinceData());
  });

  it("shortfall", () => {
    assert.equal(asia.shortfall, 5); // check
  });

  it("profit", () => {
    expect(asia.profit).equal(230);
  });

  it("change production", () => {
    asia.producers[0].setProduction = 20;
    expect(asia.shortfall).equal(-6);
    expect(asia.profit).equal(292);
  });

  it("zero demand", () => {
    asia.demand = 0;
    expect(asia.shortfall).equal(-25);
    expect(asia.profit).equal(0);
  });

  it("negative demand", () => {
    asia.demand = -1;
    expect(asia.shortfall).equal(-26);
    expect(asia.profit).equal(-10);
  });
});

describe("no producers", () => {
  let noProducers;
  beforeEach(() => {
    const data = {
      name: "No producers",
      producers: [],
      demand: 30,
      price: 20,
    };
    noProducers = new Province(data);
  });
  it("shortfall", () => {
    expect(noProducers.shortfall).equal(30);
  });
  it("profit", () => {
    expect(noProducers.profit).equal(0);
  });
});

describe("string for producers", () => {
  it("", () => {
    const data = {
      name: "String producers",
      producers: "",
      demand: 30,
      price: 20,
    };
    const prov = new Province(data);
    expect(prov.shortfall).equal(0);
  });
});
