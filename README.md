# react-props2attrs

Транслирует пропы реакт-компонентов в атрибуты ассоциированных html-элементов.

Ассоциированный элемент, в который транслируются пропы - это первый `HTMLElement`, найденный внутри компонента. Пакет работает только с 3-мя (из ~24) типами `WorkTag`: `ClassComponent`, `FunctionComponent` и `HostComponent`(`div`, `span`, `table` etc.). Остальные типы игнорируются.

## Установка

Установка с `npm`:

```bash
npm i @skbkontur/react-props2attrs
```

Установка с `yarn`:

```bash
yarn add @skbkontur/react-props2attrs
```

## Подключение

Основан на пакете [@skbkontur/react-sorge](https://github.com/skbkontur/react-sorge). Поэтому подключение должно происходить до первого подключения пакета `react-dom` в приложении:

```typescript
// entry.js

import '@skbkontur/react-props2attrs';
import ReactDOM from 'react-dom';
...
```

## Фильтр

Для управление пропами, которые необходимо транслировать, используйте хелпер `setFilter(filter: FilterType)`.

```typescript1
type FilterType = (fiber: Fiber) => string[] | null;
```

Установленный фильтр должен возвращать либо массив имён пропов, либо `null`, для игнорирования фильтра.  
Имя компонента игнорирует фильтр.

```typescript
import { setFilter } from '@skbkontur/react-props2attrs';

setFilter((fiber) => {
  // Пропускаем только контролы из пакета @skbkontur/react-ui
  if (typeof fiber.type?.__KONTUR_REACT_UI__ === 'string') {
    return null;
  }
  return [];
});
```

## Примеры трансляции разных типов

Для наглядности представим, что в приложении есть такие компоненты:

```tsx
const Foo = () => <span>Foo</span>;
const Bar = () => <Foo hello="world" />;

<Bar data-tid="Bar" />;
```

Тогда их ассоциированные html-элементы будут выглядеть так:

```tsx
<span data-comp-name="Bar Foo" data-prop-hello="world" data-testid="Bar" data-tid="Bar">
  Foo
</span>
```

> **Обратите внимание на проп `data-tid`**. Он транслирован в атрибут без приставки `prop-`. Также его значение продублировано в атрибут `data-testid`. Это дефолтное название атрибута для метода `getByTestId()` в библиотеке [Testing Library](https://www.npmjs.com/package/@testing-library/react).

Примеры трансляции всех специальных пропов:

| prop name        | prop value                        |     | attr value                       | attr name                    |
| ---------------- | --------------------------------- | --- | -------------------------------- | ---------------------------- |
| `children`       | ~~не поддерживается~~             | ➜   | ~~не поддерживается~~            |                              |
| `style`          | { paddingLeft: 20, color: 'red' } | ➜   | {"paddingLeft":20,"color":"red"} | `data-prop-style`            |
| `class`          | colored                           | ➜   | colored                          | `data-prop-classname`        |
| `key`            | value                             | ➜   | value                            | `data-key`                   |
| `data-tid`       | MyControl                         | ➜   | MyControl                        | `data-tid` and `data-testid` |
| \*Имя компонента | ButtonCover                       | ➜   | \*ButtonCover Button             | `data-comp-name`             |

\* — _Особенным образом транслируется имя компонента в атрибут `data-comp-name`.<br/>В этом атрибуте собираются имена всех react компонентов, с которыми был ассоциирован элемент. Имя компонента транслируется всегда, независимо от настроек фильтра._

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
