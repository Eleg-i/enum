# 枚举类型的拓展类

这是一个适用于 js 或 ts 的枚举类型的拓展类，可以让你方便地创建和使用枚举类型的实例。

## 安装

你可以使用npm或yarn来安装这个包：

```bash
npm install @cailiao/enum
# or
yarn add @cailiao/enum
```

## 使用

你可以使用import或require来引入这个包：

```js
import Enum from "@cailiao/enum";
// or
const Enum = require("@cailiao/enum");
```

然后，你可以使用new关键字来创建一个枚举类型的实例：

```js
// 传入一个对象作为枚举范围
const color = new Enum({ red: "red", green: "green", blue: "blue" });
// 传入一个数组作为枚举范围
const direction = new Enum(["up", "down", "left", "right"]);
// 传入一个ts的enum类型作为枚举范围
enum Gender {
  Male,
  Female,
}
const gender = new Enum(Gender);
```

你也可以传入一个可选的第二个参数，作为实例的默认值，默认值必须被包含在枚举范围之内：

```js
// 传入一个默认值
const color = new Enum({ red: "red", green: "green", blue: "blue" }, "red");
console.log(color.value); // red
```

## 属性和方法

每个枚举类型的实例都有以下属性和方法：

### value

这是一个特征属性，表示实例的当前值。你可以给这个属性赋予枚举范围以内的任意值。如果赋予枚举范围之外的值，会抛出一个TypeError。

```js
const color = new Enum({ red: "red", green: "green", blue: "blue" });
color.value = "green"; // ok
color.value = "yellow"; // TypeError: Invalid value for enum type
```

### __enum__

这是一个隐藏属性，存储了传入构造函数的第一个参数的原始值，以便在需要时访问。

```js
const color = new Enum({ red: "red", green: "green", blue: "blue" });
console.log(color.__enum__); // { red: 'red', green: 'green', blue: 'blue' }
```

### 枚举范围内的属性

你可以直接在实例上以访问属性的方式访问传入构造函数的第一个参数中的属性，但是注意一个参数中的属性应避免包含value这个键，否则将无法从实例上直接访问本来的枚举值，会被特征属性value覆盖，但这个键的值仍会包含在枚举范围之内，并可以通过__enum__这个属性访问到。

```js
const color = new Enum({ red: "red", green: "green", blue: "blue" });
console.log(color.red); // red
console.log(color.green); // green
console.log(color.blue); // blue

const status = new Enum({ value: 0, pending: 1, done: 2 });
console.log(status.value); // 0 (特征属性value)
console.log(status.pending); // 1
console.log(status.done); // 2
console.log(status.__enum__.value); // 0 (原始枚举值)
```
