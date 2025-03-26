import milesFormatter from "./milesFormatter";

describe("Miles are formatted correctly", () => {
  test("One digit number", () => {
    expect(milesFormatter(1)).toBe("1");
  });

  test("Two digit number", () => {
    expect(milesFormatter(11)).toBe("11");
  });

  test("Three digit number", () => {
    expect(milesFormatter(111)).toBe("111");
  });

  test("Four digit number", () => {
    expect(milesFormatter(1111)).toBe("1,111");
  });

  test("Five digit number", () => {
    expect(milesFormatter(11111)).toBe("11,111");
  });

  test("Six digit number", () => {
    expect(milesFormatter(111111)).toBe("111,111");
  });

  test("Seven digit number", () => {
    expect(milesFormatter(1111111)).toBe("1,111,111");
  });

  test("Converts string to number", () => {
    expect(milesFormatter("100000")).toBe("100,000");
  });
});
