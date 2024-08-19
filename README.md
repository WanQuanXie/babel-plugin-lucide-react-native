[![GitHub License](https://img.shields.io/github/license/WanQuanXie/babel-plugin-lucide-react-native?style=flat-square&logo=github)](https://github.com/WanQuanXie/babel-plugin-lucide-react-native?tab=MIT-1-ov-file)
[![Codecov (with branch)](https://img.shields.io/codecov/c/github/WanQuanXie/babel-plugin-lucide-react-native/main?token=4X2JMZOUIS&style=flat-square&logo=codecov)](https://codecov.io/github/WanQuanXie/babel-plugin-lucide-react-native)
[![NPM Version](https://img.shields.io/npm/v/babel-plugin-lucide-react-native?style=flat-square&logo=npm&logoColor=%23CB3837)](https://www.npmjs.com/package/babel-plugin-lucide-react-native)

# babel-plugin-lucide-react-native

English | [中文](./docs/README_zh-CN.md)

> 🎉 **v1.0.0** The plugin released first stable version! This version covered most usage scenes. [See full usage cases](./src/__tests__/fixtures/) <br/>
> 🐛 **Bugs:** Please file an issue for bugs, missing documentation, or unexpected behavior. <br/>
> 💡 **Feature Requests:** Please file an issue to suggest new features. <br/>
> ⭐ **Star Welcome！If this plugin helped you, please give me a star❤️**


## 📖 Documentation

This plugin is a transform to remove unused lucide icon dependencies in React Native, without forcing the user to cherry pick methods manually. This lets you use lucide-react-native naturally (aka as documented) without worrying about bundling parts you're not using.

#### Example

Converts

```js
import { BookHeart, Search } from "lucide-react-native";

function App() {
  return (
    <View>
      <BookHeart />
      <Search />
    </View>
  );
}
```

Roughly to

```js
import BookHeart from "lucide-react-native/dist/esm/icons/book-heart";
import Search from "lucide-react-native/dist/esm/icons/search";

function App() {
  return (
    <View>
      <BookHeart />
      <Search />
    </View>
  );
}
```

#### Limitations

- You must be using ES6 imports (both specifiers and default work) to load lucide-react-native.

#### FAQ

> I receive `TypeError: The plugin "lucide-react-native" didn’t export a Plugin instance`<br>
> or, can I use this plugin with Babel v5?

Ensure your Babel version is 7.0.0 or higher. This plugin is only compatible with Babel 7.

#### Usage

###### Via `babel.config.js` (Recommended)

```json
{
  "plugins": ["lucide-react-native"]
}
```

or

```json
{
  "plugins": [
    [
      "lucide-react-native",
      {
        "useES": true
      }
    ]
  ]
}
```

when `useES` is set to `true`, it will use `lucide-react-native/dist/esm/` instead of `lucide-react-native/dist/cjs/`. **Default:** `false`.

---

### Inspiration

This is inspired by [babel-plugin-ramda](https://github.com/megawac/babel-plugin-ramda)
