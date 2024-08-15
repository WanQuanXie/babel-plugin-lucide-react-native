import fs from "node:fs";
import * as Modules from "../modules";
import { LUCIDE_REACT_NATIVE } from "../const";
import { generateUnknownIconError, camel2Dash } from "../utils";

type ModulesType = typeof Modules;

type PatternMatch<KT extends keyof ModulesType> = {
  [K in KT]: (model: ModulesType[K]) => void;
};

jest.mock("node:process", () => ({
  cwd: jest.fn(),
}));
jest.mock("node:fs", () => ({
  realpathSync: jest.fn(() => "/mock/app"),
  readdirSync: jest.fn(),
}));

const allPatternMatch: PatternMatch<keyof ModulesType> = {
  resolveModule: (resolveModule) => {
    describe("resolveModule", () => {
      const existIonName = "IconName";
      const existIconFileName = camel2Dash(existIonName);

      const anotherIconName = "AnotherIcon";
      const anotherIconFileName = camel2Dash(anotherIconName);

      const mockIconFileNames = [existIconFileName, anotherIconFileName];

      beforeAll(() => {
        (fs.readdirSync as jest.Mock).mockReturnValue(
          mockIconFileNames.map((name) => `${name}.js`)
        );
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      const useESScenes = [true, false];

      describe("should resolve module path correctly if icon exist", () => {
        const iconFileRelativePath = `${LUCIDE_REACT_NATIVE}/dist`;

        useESScenes.forEach((useES) => {
          it(`when useES is ${useES}`, () => {
            const useES = true;
            const result = resolveModule(useES, existIonName);

            expect(result).toBe(
              `${iconFileRelativePath}/esm/icons/${existIconFileName}`
            );
          });
        });
      });

      describe("should throw an error if icon does not exist", () => {
        const nonExistIconName = "NonExistIcon";

        useESScenes.forEach((useES) => {
          it(`when useES is ${useES}`, () => {
            const useES = true;
            expect(() => resolveModule(useES, nonExistIconName)).toThrow(
              generateUnknownIconError(nonExistIconName)
            );
          });
        });
      });
    });
  },
};

describe("modules.ts tests", () => {
  Object.entries(allPatternMatch).forEach(([key, it]) => it(Modules[key]));
});
