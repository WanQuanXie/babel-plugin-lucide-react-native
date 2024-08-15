import path from "node:path";
import fs from "node:fs";
import assert from "node:assert";
import { transformFileSync } from "@babel/core";
import plugin from "../index";

describe("lucide-react-native modularized builds", () => {
  const fixturesDir = path.join(__dirname, "fixtures");
  const errorFixturesDir = path.join(__dirname, "error-fixtures");

  fs.readdirSync(fixturesDir).map((caseName) => {
    const fixtureDir = path.join(fixturesDir, caseName);
    const actualFile = path.join(fixtureDir, "actual.js");
    const expectedFile = path.join(fixtureDir, "expected.js");

    describe(`should work with ${caseName.split("-").join(" ")}`, () => {
      // Programmatically test with the useES option both on and off
      it("cjs", () => {
        const actual = transformFileSync(actualFile, {
          compact: true,
          plugins: [plugin],
        })?.code?.trim();
        const expected = transformFileSync(expectedFile, {
          compact: true,
        })?.code?.trim();
        expect(actual).toBe(expected);
      });

      it("esm", () => {
        const actual = transformFileSync(actualFile, {
          compact: true,
          plugins: [[plugin, { useES: true }]],
        })?.code;

        // The only difference is that cjs should be replaced with esm. This way, no changes to
        // the tests are needed to cover testing of useES.
        const expected = transformFileSync(expectedFile, {
          compact: true,
        })?.code?.replace(/cjs/g, "esm");
        expect(actual).toBe(expected);
      });
    });
  });

  fs.readdirSync(errorFixturesDir).map((caseName) => {
    const fixtureDir = path.join(fixturesDir, caseName);
    const actualFile = path.join(fixtureDir, "actual.js");

    it(`should throw an error with ${caseName.split("-").join(" ")}`, () => {
      assert.throws(function () {
        const actual = transformFileSync(actualFile, {
          plugins: [plugin],
        })?.code;
      });
    });
  });
});
