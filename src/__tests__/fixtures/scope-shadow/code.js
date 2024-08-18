import { BookHeart, Star as StarAlias } from "lucide-react-native";

function foo(BookHeart, StarAlias) {
  return (
    <View>
      <BookHeart />
      {React.createElement(BookHeart, { type: "baz" })}
      <SomeComponent icon={BookHeart} />
      <StarAlias />
      {React.createElement(StarAlias, { type: "baz" })}
      <SomeComponent icon={StarAlias} />
    </View>
  );
}

function bar() {
  return (
    <View>
      <BookHeart />
      {React.createElement(BookHeart, { type: "baz" })}
      <SomeComponent icon={BookHeart} />
      <StarAlias />
      {React.createElement(StarAlias, { type: "baz" })}
      <SomeComponent icon={StarAlias} />
    </View>
  );
}
