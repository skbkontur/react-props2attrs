import React from 'react';

export class Component_0 extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Component_1 />
        <Component_2
          string="str"
          number={123}
          array={['a', 'b']}
          object={{ a: 'b' }}
          func={() => {}}
          boolean={false}
          empty_string=""
          null={null}
          undefined={undefined}
        />
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
  string: string;
  number: number;
  array: string[];
  object: object;
  func: Function;
  boolean: boolean;
  empty_string: string;
  null: null;
  undefined: undefined;
}

export class Component_2 extends React.Component<Props_2, {}> {
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
