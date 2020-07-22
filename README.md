# react-props2attrs

Транслирует пропы реакт-компонентов в атрибуты ассоциированных html-элементов.
Работает для `WorkTag` типов: `ClassComponent`, `FunctionComponent` и `HostComponent`(`div`, `span`, `table` etc.).

Основан на пакете [@skbkontur/react-sorge](https://github.com/skbkontur/react-sorge). Поэтому подключение должно происходить до первого подключения пакета `react-dom` в приложении:

```typescript jsx
// entry.js

import 'react-props2attrs';
import ReactDOM from 'react-dom';
...
```

Особенным образом транслируется имя компонента в атрибут `data-comp-name`.
В этом атрибуте собираются имена всех react компонентов, для которых он стал ближайшим при поиске потомков.

Примеры трансляции специальных пропов:

| prop name  | prop value                        |     | attr value                       | attr name                    |
| ---------- | --------------------------------- | --- | -------------------------------- | ---------------------------- |
| `children` | ~~не поддерживается~~             | ➜   | ~~не поддерживается~~            |                              |
| `style`    | { paddingLeft: 20, color: 'red' } | ➜   | {"paddingLeft":20,"color":"red"} | `data-prop-style`            |
| `class`    | colored                           | ➜   | colored                          | `data-prop-classname`        |
| `data-tid` | MyControl                         | ➜   | MyControl                        | `data-tid` and `data-testid` |

Примеры трансляции обычных пропов:

| prop name (type) | prop value |     | attr value | attr name                |
| ---------------- | ---------- | --- | ---------- | ------------------------ |
| `string`         | str        | ➜   | str        | `data-prop-string`       |
| `number`         | 123        | ➜   | 123        | `data-prop-number`       |
| `array`          | ['a', 'b'] | ➜   | ["a","b"]  | `data-prop-array`        |
| `object`         | { a: 'b' } | ➜   | {"a":"b"}  | `data-prop-object`       |
| `func`           | () => {}   | ➜   | true       | `data-prop-func`         |
| `boolean`        | false      | ➜   | false      | `data-prop-boolean`      |
| `empty_string`   |            | ➜   | undefined  | `data-prop-empty_string` |
| `null`           | null       | ➜   | undefined  | `data-prop-null`         |
| `undefined`      | undefined  | ➜   | undefined  | `data-prop-undefined`    |
