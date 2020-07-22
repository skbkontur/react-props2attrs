import '../index';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Component_0 } from './example';

const getAllValueByAttr = async (name): Promise<string[]> => {
  const contains = [];
  await screen.getAllByText((_, el) => {
    if (el.hasAttribute(name)) {
      contains.push(el.getAttribute(name));
    }
    return true;
  });
  return contains;
};
const getValueByDataCompName = async (name) =>
  (await getAllValueByAttr('data-comp-name')).filter((p) => 0 <= p.search(name));
const getValueByAttr = async (name) => (await getAllValueByAttr(name)).shift();

beforeEach(() => render(<Component_0 />));

it('should found by attr `data-comp-name` with value `Component_2` and `Component_2_1`', async () => {
  expect(await getValueByDataCompName('Component_2')).toBeDefined();
  expect(await getValueByDataCompName('Component_2_1')).toBeDefined();
});

it('should found by `data-testid` and `data-tid`', async () => {
  const testId = 'Component_2_1_1';

  expect(await getAllValueByAttr('data-tid')).toContain(testId);
  expect(await screen.getByTestId(testId)).toBeDefined();
});

it('should found by `data-prop-style`', async () => {
  expect(await getValueByAttr('data-prop-style')).toEqual('{"paddingLeft":20,"color":"red"}');
});

it.each([
  ['data-prop-string', 'str'],
  ['data-prop-number', '123'],
  ['data-prop-array', '["a","b"]'],
  ['data-prop-object', '{"a":"b"}'],
  ['data-prop-func', 'true'],
  ['data-prop-boolean', 'false'],
  ['data-prop-empty_string', undefined],
  ['data-prop-null', undefined],
  ['data-prop-undefined', undefined],
])('should found by attr `%s` with value `%s`', async (propName, propValue) => {
  expect(await getValueByAttr(propName)).toEqual(propValue);
});
