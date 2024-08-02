import { formatCurrency } from "../../scripts/utils/money.js";

describe("Test Suite: formatCurrency", () => {
  it("Converts cents into dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });

  it("Works with zero", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  it("Rounds up to the nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });

  it("Rounds down to the nearest cent", () => {
    expect(formatCurrency(2000.4)).toEqual("20.00");
  });

  it("Works with negative numbers", () => {
    expect(formatCurrency(-5001)).toEqual("-50.01");
  });
});
