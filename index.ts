import { Sorge, Fiber } from '@skbkontur/react-sorge';
import { findAssociatedNode, getDisplayName, getWorkTagMap } from '@skbkontur/react-sorge/lib';

Sorge.mount.on(props2attrs);
Sorge.update.on(props2attrs);

const WorkTagMap = getWorkTagMap();

function props2attrs(fiber: Fiber): boolean {
  if (isComponent(fiber)) {
    const node = findAssociatedNode(fiber);
    if (node instanceof HTMLElement) {
      setAttributesFromProps(fiber, node);
      return true;
    }
  }
  return false;
}

function isComponent(fiber: Fiber): boolean {
  switch (fiber.tag) {
    case WorkTagMap.ClassComponent:
    case WorkTagMap.FunctionComponent:
    case WorkTagMap.HostComponent:
      return true;
  }
  return false;
}

function setAttributesFromProps(fiber: Fiber, node: HTMLElement): void {
  const name = appendToAttr(node.getAttribute('data-comp-name'), getComponentName(fiber));
  if (name) {
    node.setAttribute('data-comp-name', name);
  }
  Object.entries({ ...attributesToObject(node.attributes), ...fiber.memoizedProps }).forEach(
    ([propName, propValue]) => {
      if (propName === 'children' || propName === 'data-comp-name') {
        return;
      }
      if (propName === 'style' && fiber.tag !== WorkTagMap.HostComponent) {
        return;
      }
      if (propName === 'class') {
        propName = 'classname';
      }
      const propValueSafe = stringifySafe(propValue);
      if (typeof propValue === 'function') {
        node.setAttribute(`data-prop-${propName}`, stringifySafe(true));
        return;
      }
      if (propName === 'data-tid') {
        node.setAttribute('data-testid', propValueSafe);
        node.setAttribute(propName, propValueSafe);
        return;
      }
      if (propName === 'data-testid' || propName === 'data-key') {
        node.setAttribute(propName, propValueSafe);
        return;
      }
      if (propValueSafe !== '') {
        if (propName.startsWith('data-prop-')) {
          node.setAttribute(propName, propValueSafe);
        } else {
          node.setAttribute(`data-prop-${propName}`, propValueSafe);
        }
      }
    },
  );
}

function getComponentName(fiber: Fiber): string | null {
  if (typeof fiber.type === 'function') {
    return getDisplayName(fiber);
  }
  return null;
}

function appendToAttr(set: string | null, attr: string | null): string {
  if (set === null) {
    return attr || '';
  }
  const attrs = set.trim().split(' ');
  if (attr !== null && !attrs.includes(attr)) {
    attrs.push(attr);
  }
  return attrs.join(' ');
}

function stringifySafe(value: any) {
  if (typeof value === 'string') {
    return value;
  }
  if (value === undefined || value === null) {
    return '';
  }
  try {
    return JSON.stringify(value);
  } catch (e) {
    try {
      if (Array.isArray(value) && value.length > 0 && Array.isArray(value[0])) {
        return JSON.stringify(value.map((x) => x[0]));
      }
    } catch (e) {
      return '';
    }
    return '';
  }
}

function attributesToObject(attrs: NamedNodeMap): { [name: string]: string } {
  const contain: { [name: string]: string } = {};
  for (const { name, value } of attrs as any) {
    contain[name] = value;
  }
  return contain;
}
