import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)]
    );
  });
});

describe("Drug", () => {
  // Testing correct selection of update rate
  it("should return the default update rate before expiration", () => {
    expect(new Drug("test", 2, 3).getCurrentUpdateRate()).toEqual(-1);
  });
  it("should return the default update rate after expiration", () => {
    expect(new Drug("test", -42, 3).getCurrentUpdateRate()).toEqual(-2);
  });
  it("should return the constant update rate for the Magic Pill", () => {
    expect(new Drug("Magic Pill", -42, 3).getCurrentUpdateRate()).toEqual(0);
  });
  it("should return the intermediate update rate for Fervex", () => {
    expect(new Drug("Fervex", 3, 3).getCurrentUpdateRate()).toEqual(3);
  });
});
