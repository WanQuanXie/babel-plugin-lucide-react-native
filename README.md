# babel-plugin-lucide-react-native

[![cov](https://github.com/WanQuanXie/babel-plugin-lucide-react-native/badges/coverage.svg)](https://github.com/WanQuanXie/babel-plugin-lucide-react-native/actions)

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

when `useES` is set to `true`, it will use `lucide-react-native/dist/esm/` instead of `lucide-react-native/dist/cjs/`. Default is `false`.
