# babel-plugin-lucide-react-native

[![GitHub License](https://img.shields.io/github/license/WanQuanXie/babel-plugin-lucide-react-native?style=flat-square&logo=github)](https://github.com/WanQuanXie/babel-plugin-lucide-react-native?tab=MIT-1-ov-file)
[![Codecov (with branch)](https://img.shields.io/codecov/c/github/WanQuanXie/babel-plugin-lucide-react-native/main?token=4X2JMZOUIS&style=flat-square&logo=codecov)](https://codecov.io/github/WanQuanXie/babel-plugin-lucide-react-native)
[![NPM Version](https://img.shields.io/npm/v/babel-plugin-lucide-react-native?style=flat-square&logo=npm&logoColor=%23CB3837)](https://www.npmjs.com/package/babel-plugin-lucide-react-native)

[English](../README.md) | 中文

> 🎉 **v1.0.0** 插件第一个稳定版本终于发布了! 这个版本包含了大部分常见的使用场景。 [完整场景用例](./src/__tests__/fixtures/) <br/>
> 🐛 **Bugs:** 如果在使用过程中遇到了文档未说明的、未知的异常，给我提一个 bugs issue，我会保持跟进。 <br/>
> 💡 **Feature Requests** 如果有新的使用场景需要支持，请提一个 feature issue。 <br/>
> ⭐ **Star Welcome！如果喜欢这个插件，还请不吝 star，以资鼓励，感谢感谢~❤️**


## 📖 文档

这个插件是一个转换工具，用于移除 React Native 中未使用的 Lucide 图标依赖，而无需用户手动进行方法的精选。这使您可以自然地使用 lucide-react-native（即按照文档所述的方式），而不必担心会打包那些您没有使用的部分。

#### 示例

转译前

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

转译后

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

#### 限制

- 你必须使用 ES6 导入（支持命名导入和默认导入）来加载 lucide-react-native。

#### FAQ

> 我被提示 `TypeError: The plugin "lucide-react-native" didn’t export a Plugin instance`<br>
> 或者, 我是否可以使用 Babel v5 版本?

请确保你的 Babel 版本是 7.0.0 或更高。这个插件只兼容 Babel 7。

#### 使用

###### 通过 `babel.config.js` (推荐)

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

当 `useES` 设置为 `true` 时，它将使用 `lucide-react-native/dist/esm/` 而不是 `lucide-react-native/dist/cjs/`。**默认值：** `false`。

---

### Inspiration

This is inspired by [babel-plugin-ramda](https://github.com/megawac/babel-plugin-ramda)
