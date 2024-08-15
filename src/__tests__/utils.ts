import * as Utils from "../utils";

type UtilsModel = typeof Utils;

type PatternMatch<KT extends keyof UtilsModel> = {
  [K in KT]: (model: UtilsModel[K]) => void;
};

const allPatternMatch: PatternMatch<keyof UtilsModel> = {
  partition: (partition) => {
    describe("partition", () => {
      it("should partition an array of numbers based on a predicate", () => {
        const arr = [1, 2, 3, 4, 5, 6];
        const isEven = (num: number) => num % 2 === 0;
        const result = partition(arr, isEven);
        expect(result).toEqual([
          [2, 4, 6],
          [1, 3, 5],
        ]);
      });

      it("should partition an array of strings based on a predicate", () => {
        const arr = ["apple", "banana", "cherry"];
        const startsWithB = (str: string) => str.startsWith("b");
        const result = partition(arr, startsWithB);
        expect(result).toEqual([["banana"], ["apple", "cherry"]]);
      });

      it("should return two empty arrays when input array is empty", () => {
        const arr: any[] = [];
        const fn = (item: any) => true;
        const result = partition(arr, fn);
        expect(result).toEqual([[], []]);
      });

      it("should place all elements in the pass array if all match the predicate", () => {
        const arr = [2, 4, 6];
        const isEven = (num: number) => num % 2 === 0;
        const result = partition(arr, isEven);
        expect(result).toEqual([[2, 4, 6], []]);
      });

      it("should place all elements in the fail array if none match the predicate", () => {
        const arr = [1, 3, 5];
        const isEven = (num: number) => num % 2 === 0;
        const result = partition(arr, isEven);
        expect(result).toEqual([[], [1, 3, 5]]);
      });

      it("should handle arrays with mixed data types", () => {
        const arr = [1, "2", true, null, undefined, {}, []];
        const isNumber = (item: any) => typeof item === "number";
        const result = partition(arr, isNumber);
        expect(result).toEqual([[1], ["2", true, null, undefined, {}, []]]);
      });

      it("should handle predicates that always return true", () => {
        const arr = [1, 2, 3];
        const alwaysTrue = (item: any) => true;
        const result = partition(arr, alwaysTrue);
        expect(result).toEqual([[1, 2, 3], []]);
      });

      it("should handle predicates that always return false", () => {
        const arr = [1, 2, 3];
        const alwaysFalse = (item: any) => false;
        const result = partition(arr, alwaysFalse);
        expect(result).toEqual([[], [1, 2, 3]]);
      });

      it("should handle edge cases with null and undefined values in the array", () => {
        const arr = [null, undefined];
        const isNull = (item: any) => item === null;
        const result = partition(arr, isNull);
        expect(result).toEqual([[null], [undefined]]);
      });
    });
  },
  camel2Dash: (camel2Dash) => {
    describe("camel2Dash", () => {
      it("should convert camelCase to dash-case", () => {
        expect(camel2Dash("camelCaseString")).toBe("camel-case-string");
        expect(camel2Dash("CamelCaseString")).toBe("camel-case-string");
      });

      it("should handle strings with numbers", () => {
        expect(camel2Dash("stringWith2Numbers123")).toBe(
          "string-with-2-numbers-123"
        );
      });

      it("should handle strings that are already dash-case", () => {
        expect(camel2Dash("dash-case-string")).toBe("dash-case-string");
      });

      it("should handle empty strings", () => {
        expect(camel2Dash("")).toBe("");
      });
    });
  },
};

describe("utils.ts tests", () => {
  Object.entries(allPatternMatch).forEach(([key, it]) => it(Utils[key]));
});
