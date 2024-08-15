import path from "node:path";
import { pluginTester } from "babel-plugin-tester";
import plugin from "../index";
import { LUCIDE_REACT_NATIVE } from "../const";

pluginTester({
  plugin,
  pluginName: LUCIDE_REACT_NATIVE,
  fixtures: path.join(__dirname, "fixtures"),
});
