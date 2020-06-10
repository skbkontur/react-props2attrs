import '../index.ts';
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
const getValueByAttr = async (name) => (await getAllValueByAttr(name)).shift();

it('should found by `data-comp-name`', async () => {
  render(<Component_0 />);

  expect(await getAllValueByAttr('data-comp-name')).toContain('Component_1');
});

it('should found by `data-testid` or `data-tid`', async () => {
  render(<Component_0 />);

  const testId = 'Component_2_1_1';

  expect(await getAllValueByAttr('data-tid')).toContain(testId);
  expect(await screen.getByTestId(testId)).toBeDefined();
});
