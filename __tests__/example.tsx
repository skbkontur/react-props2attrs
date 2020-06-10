import React from 'react';

export class Component_0 extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Component_1 />
        <Component_2 type_number={123} type_array={['a', 'b']} type_func={console.log} />
        <Component_3 data-tid="Component_2_1_1" />
      </div>
    );
  }
}

class Component_1 extends React.Component<{}, {}> {
  public render() {
    return (
      <span>
        <span className="class_name_1">Component_1</span>
      </span>
    );
  }
}

interface Props_2 {
  type_number: number;
  type_array: string[];
  type_func: Function;
}
class Component_2 extends React.Component<Props_2, {}> {
  public render() {
    return <Component_2_1 />;
  }
}

function Component_2_1() {
  return <Component_2_1_1 />;
}

const Component_2_1_1 = () => {
  return <span>Component_2_1_1</span>;
};

class Component_3 extends React.Component<{}, {}> {
  public render() {
    return <span style={{ paddingLeft: 20, color: 'red' }}>Component_3</span>;
  }
}
