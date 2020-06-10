# react-props2attrs

Транслирует пропы реакт-компонентов в атрибуты ассоциированных html-элементов.
Работает для `ClassComponent`, `FunctionComponent` и `HostComponent`(`div`, `span`, `table` etc.).

Подключение:

```jsx harmony static
import 'react-props2attrs';
```

Например, в приложение есть такие компоненты:

```jsx harmony static
const Component_0 = () => {
  return (
    <div>
      <span>Component_0</span>
    </div>
  );
};
Component_0.displayName = 'Component_0'; // при использовании минификатора

const Component_1 = () => {
  return <span className="class_name_1">Component_1</span>;
};
Component_1.displayName = 'Component_1'; // при использовании минификатора

<>
  <Component_0 />
  <Component_1 type_number={123} type_array={['a', 'b']} type_func={console.log} />
</>;
```

Тогда их ассоциированные html-элементы будут выглядеть так:

```jsx harmony static
<div data-comp-name="Component_0">
    <span>Component_0</span>
</div>
<span
    data-comp-name="Component_1"
    data-prop-type_number="123"
    data-prop-type_array="["a","b"]"
    data-prop-type_func="true"
>
    Component_1
</span>
```
