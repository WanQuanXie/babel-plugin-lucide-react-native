import _StarAlias from "lucide-react-native/dist/cjs/icons/star";
import _BookHeart from "lucide-react-native/dist/cjs/icons/book-heart";
function foo(BookHeart, StarAlias) {
  return (
    <View>
      <BookHeart />
      {React.createElement(BookHeart, {
        type: "baz",
      })}
      <SomeComponent icon={BookHeart} />
      <StarAlias />
      {React.createElement(StarAlias, {
        type: "baz",
      })}
      <SomeComponent icon={StarAlias} />
    </View>
  );
}
function bar() {
  return (
    <View>
      <_BookHeart />
      {React.createElement(_BookHeart, {
        type: "baz",
      })}
      <SomeComponent icon={_BookHeart} />
      <_StarAlias />
      {React.createElement(_StarAlias, {
        type: "baz",
      })}
      <SomeComponent icon={_StarAlias} />
    </View>
  );
}