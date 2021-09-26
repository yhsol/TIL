describe("province", function () {
  it("shortfall", function () {
    const asia = new Province(sampleProvinceData()); // set fixture
    assert.equal(asia.shortfall, 5); // check
  });
});
