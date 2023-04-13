function solution(entryPoint) {
  const operations = [
    { name: "copy", action: copy },
    { name: "remove", action: remove },
    { name: "removeChildren", action: removeChildren },
    { name: "switch", action: swap },
  ];

  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];
    const elements = entryPoint.querySelectorAll(`[${operation.name}]`);

    for (let j = 0; j < elements.length; j++) {
      const element = elements[j];
      const attr = element.getAttribute(operation.name);
      const args = attr
        .split(":")
        .slice(1)
        .map((x) => parseInt(x));

      operation.action(element, ...args);
      element.removeAttribute(operation.name);
    }
  }

  function copy(element, n) {
    for (let i = 0; i < n; i++) {
      const clone = element.cloneNode(true);
      element.parentNode.insertBefore(clone, element.nextSibling);
    }
  }

  function remove(element, n) {
    let next = element.nextSibling;
    while (next && n--) {
      const toRemove = next;
      next = next.nextSibling;
      toRemove.parentNode.removeChild(toRemove);
    }
  }

  function removeChildren(element, n) {
    const children = element.children;
    for (let i = 0; i < n && i < children.length; i++) {
      element.removeChild(children[i]);
    }
  }

  function swap(element, n) {
    const siblings = Array.from(element.parentNode.children);
    const index = siblings.indexOf(element);
    const otherIndex = index + n;
    if (otherIndex < 0 || otherIndex >= siblings.length) {
      return;
    }
    const other = siblings[otherIndex];
    if (index < otherIndex) {
      element.parentNode.insertBefore(other, element);
      element.parentNode.insertBefore(element, other.nextSibling);
    } else {
      element.parentNode.insertBefore(element, other);
      element.parentNode.insertBefore(other, element.nextSibling);
    }
  }
}
