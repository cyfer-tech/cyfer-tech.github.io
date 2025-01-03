
    
    // node_modules/@mufw/maya/utils/constants.ts
var customEventKeys = ["onmount", "onunmount"];
var htmlEventKeys = [
  "onerror",
  "onload",
  "onresize",
  "onblur",
  "onchange",
  "oncontextmenu",
  "onfocus",
  "oninput",
  "oninvalid",
  "onreset",
  "onselect",
  "onsubmit",
  "onkeydown",
  "onkeypress",
  "onkeyup",
  "onclick",
  "ondblclick",
  "ondrag",
  "ondragend",
  "ondragenter",
  "ondragleave",
  "ondragover",
  "ondragstart",
  "ondrop",
  "onmousedown",
  "onmousemove",
  "onmouseout",
  "onmouseover",
  "onmouseup",
  "onscroll",
  "onabort",
  "oncanplay",
  "oncanplaythrough",
  "ondurationchange",
  "onemptied",
  "onended",
  "onerror",
  "onloadeddata",
  "onloadedmetadata",
  "onloadstart",
  "onpause",
  "onplay",
  "onplaying",
  "onprogress",
  "onratechange",
  "onseeked",
  "onseeking",
  "onstalled",
  "onsuspend",
  "ontimeupdate",
  "onvolumechange",
  "onwaiting"
];
var eventKeys = [...htmlEventKeys, ...customEventKeys];
var htmlTagNames = [
  "a",
  "abbr",
  "acronym",
  "address",
  "applet",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "basefont",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "center",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "font",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "meta",
  "meter",
  "nav",
  "noframes",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strike",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "tt",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
];
// node_modules/@mufw/maya/utils/id-generator.ts
var idGenerator = () => {
  let nodeId = 0;
  return {
    getNewId: () => ++nodeId,
    resetIdCounter: () => nodeId = 0
  };
};
var idGen = idGenerator();
// node_modules/@cyftech/immutjs/src/misc.ts
var sortObjectByKeys = (obj) => {
  const sortedEntries = Object.entries(obj).sort((a, b) => a[0].localeCompare(b[0]));
  sortedEntries.forEach(([key, value], index) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      sortedEntries[index] = [key, sortObjectByKeys(value)];
    }
  });
  return Object.fromEntries(sortedEntries);
};
var isPlainObject = (value) => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  return Object.prototype.toString.call(value) === "[object Object]";
};
var immut = (value) => {
  if (Array.isArray(value)) {
    const copiedArr = [...value];
    const newArr = [];
    copiedArr.forEach((item) => {
      newArr.push(immut(item));
    });
    return newArr;
  }
  if (isPlainObject(value)) {
    const copiedObj = { ...value };
    const newObj = {};
    Object.keys(copiedObj).forEach((key) => {
      newObj[key] = immut(copiedObj[key]);
    });
    return Object.freeze(newObj);
  }
  return value;
};
var newVal = (oldVal) => {
  if (Array.isArray(oldVal)) {
    const copiedArr = [...oldVal];
    const newArr = [];
    copiedArr.forEach((item) => {
      newArr.push(newVal(item));
    });
    return newArr;
  }
  if (isPlainObject(oldVal)) {
    const copiedObj = { ...oldVal };
    const newObj = {};
    Object.keys(copiedObj).forEach((key) => {
      newObj[key] = newVal(copiedObj[key]);
    });
    return newObj;
  }
  const value = oldVal;
  return value;
};
var indexedArray = (list, uniqueKey = "index") => list.map((item, i) => ({
  [uniqueKey]: i,
  value: item
}));

// node_modules/@cyftech/immutjs/src/equal.ts
var areObjectsEqual = (obj1, obj2) => {
  const sortedObj1 = sortObjectByKeys(obj1);
  const sortedObj2 = sortObjectByKeys(obj2);
  const keys1 = Object.keys(sortedObj1);
  const keys2 = Object.keys(sortedObj2);
  if (keys1.length !== keys2.length)
    return false;
  for (const key of keys1) {
    if (!keys2.includes(key) || !areValuesEqual(sortedObj1[key], sortedObj2[key])) {
      return false;
    }
  }
  return true;
};
var areArraysEqual = (array1, array2) => {
  if (array1.length !== array2.length)
    return false;
  if (array1.length === 0)
    return true;
  for (let i = 0;i < array1.length; i++) {
    if (!areValuesEqual(array1[i], array2[i]))
      return false;
  }
  return true;
};
var areValuesEqual = (value1, value2) => {
  if (typeof value1 !== typeof value2)
    return false;
  if (Array.isArray(value1)) {
    return areArraysEqual(value1, value2);
  }
  if (value1 === null || value2 === null) {
    return value1 === value2;
  }
  if (typeof value1 === "object" && !(value1 instanceof Set)) {
    return areObjectsEqual(value1, value2);
  }
  if (typeof value1 === "bigint" || typeof value1 === "number" || typeof value1 === "string" || typeof value1 === "boolean") {
    return value1 === value2;
  }
  return value1 === value2;
};

// node_modules/@cyftech/immutjs/src/diff.ts
var getArrayMutations = (oldDsitinctItemsArray, newDsitinctItemsArray, idKey) => {
  const indexKey = "index";
  const oldIndexedArr = indexedArray(newVal(oldDsitinctItemsArray), indexKey);
  const newIndexedArr = indexedArray(newVal(newDsitinctItemsArray), indexKey);
  return newIndexedArr.map((newIndexedItem) => {
    let type = "add";
    let oldIndex = -1;
    const value = newIndexedItem.value;
    oldIndexedArr.some((oldIndexedItem, i) => {
      type = areValuesEqual(oldIndexedItem.value, newIndexedItem.value) ? oldIndexedItem[indexKey] === newIndexedItem[indexKey] ? "idle" : "shuffle" : idKey && oldIndexedItem.value[idKey] !== undefined && oldIndexedItem.value[idKey] === newIndexedItem.value[idKey] ? "update" : "add";
      if (type !== "add") {
        oldIndex = oldIndexedItem[indexKey];
        oldIndexedArr.splice(i, 1);
        return true;
      }
      return false;
    });
    return {
      type,
      oldIndex,
      value
    };
  });
};
// node_modules/@cyftech/signal/src/core.ts
var subscriber = null;
var signal = (value) => {
  let _value = immut(value);
  const subscriptions = new Set;
  return {
    type: "source-signal",
    get value() {
      if (subscriber)
        subscriptions.add(subscriber);
      return newVal(_value);
    },
    set value(newValue) {
      if (newValue === _value)
        return;
      _value = immut(newValue);
      subscriptions.forEach((callback) => callback && callback());
    }
  };
};
var effect = (fn) => {
  subscriber = fn;
  fn();
  subscriber = null;
};
var derived = (valueGetterFn) => {
  let oldValue;
  const derivedSource = signal(oldValue);
  effect(() => {
    oldValue = valueGetterFn(oldValue);
    derivedSource.value = oldValue;
  });
  const derivedSignal = {
    type: "derived-signal",
    get prevValue() {
      return oldValue;
    },
    get value() {
      return derivedSource.value;
    }
  };
  return derivedSignal;
};
var valueIsSignal = (value) => ["source-signal", "derived-signal"].includes(value?.type);
// node_modules/@cyftech/signal/src/utils/transforms/misc.ts
var val = (value) => valueIsSignal(value) ? value.value : value;
// node_modules/@cyftech/signal/src/utils/transforms/string.ts
var dstring = (strings, ...tlExpressions) => derived(() => {
  return strings.reduce((acc, fragment, i) => {
    let expValue;
    const expression = tlExpressions[i];
    if (typeof expression === "function") {
      expValue = expression() ?? "";
    } else if (valueIsSignal(expression)) {
      expValue = expression.value ?? "";
    } else {
      expValue = expression ?? "";
    }
    return `${acc}${fragment}${expValue.toString()}`;
  }, "");
});
// node_modules/@mufw/maya/utils/phase-helpers.ts
var _currentPhase = signal("build");
var currentPhaseIs = (phase) => _currentPhase.value === phase;
var startPhase = (phase) => {
  _currentPhase.value = phase;
};
// node_modules/@mufw/maya/utils/type-checkers.ts
var valueIsArray = (value) => Array.isArray(value);
var valueIsHtmlNode = (value) => !isNaN(value?.nodeId) && value?.nodeId > 0;
var valueIsChild = (value) => valueIsHtmlNode(value) || typeof value === "string";
var valueIsSignalChild = (value) => valueIsSignal(value) && valueIsChild(value.value);
var valueIsNonSignalChild = (value) => !valueIsSignalChild(value) && valueIsChild(value);
var valueIsMaybeSignalChild = (value) => valueIsChild(value) || valueIsSignalChild(value);
var valueIsChildrenSignal = (value) => valueIsSignal(value) && (valueIsChild(value.value) || valueIsArray(value.value) && value.value.every((child) => valueIsChild(child)));
var valueIsChildren = (value) => valueIsNonSignalChild(value) || valueIsArray(value) && value.every((item) => valueIsMaybeSignalChild(item));
var valueIsChildrenProp = (value) => valueIsChildrenSignal(value) || valueIsChildren(value);
// node_modules/@mufw/maya/core/dom/unmount-observer.ts
var _observingDocument = false;
var addedNodesRecord = {};
var removedNodesRecord = {};
var MutationObserver = globalThis.MutationObserver;
var unmountObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((n) => {
        if (valueIsHtmlNode(n)) {
          const node = n;
          const nodeId = node.nodeId;
          if (removedNodesRecord[nodeId])
            delete removedNodesRecord[nodeId];
          else
            addedNodesRecord[nodeId] = node.tagName;
        }
      });
      mutation.removedNodes.forEach((n) => {
        if (valueIsHtmlNode(n)) {
          const node = n;
          const nodeId = node.nodeId;
          const unmountListener = node.unmountListener;
          if (unmountListener)
            removedNodesRecord[nodeId] = {
              node,
              unmountListener
            };
        }
      });
    }
  });
  Object.entries(removedNodesRecord).forEach(([_, listenerData]) => {
    const { node, unmountListener } = listenerData;
    execSubtreeUnmountListeners(node, unmountListener);
  });
});
var execSubtreeUnmountListeners = (node, elUnmountListener) => {
  if (!valueIsHtmlNode(node))
    return;
  const elChildren = node.children;
  for (let i = 0;i < elChildren.length; i++) {
    const elChild = elChildren[i];
    execSubtreeUnmountListeners(elChild, elChild.unmountListener);
  }
  elUnmountListener && elUnmountListener();
  if (removedNodesRecord[node.nodeId])
    delete removedNodesRecord[node.nodeId];
};
var startUnmountObserver = () => {
  if (!_observingDocument && !currentPhaseIs("build")) {
    unmountObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
    _observingDocument = true;
  }
};

// node_modules/@mufw/maya/core/dom/create-element.ts
var attributeIsUndefinedEvent = (propKey, propValue) => eventKeys.includes(propKey) && propValue === undefined;
var attributeIsHtmlEvent = (propKey, propValue) => htmlEventKeys.includes(propKey) && typeof propValue === "function";
var attributeIsCustomEvent = (propKey, propValue) => customEventKeys.includes(propKey) && typeof propValue === "function";
var attributeIsEvent = (propKey, propValue) => attributeIsUndefinedEvent(propKey, propValue) || attributeIsHtmlEvent(propKey, propValue) || attributeIsCustomEvent(propKey, propValue);
var handleEventProps = (htmlNode, events) => {
  Object.entries(events).forEach(([eventName, listenerFn]) => {
    if (attributeIsUndefinedEvent(eventName, listenerFn)) {
    } else if (attributeIsHtmlEvent(eventName, listenerFn)) {
      const eventKey = eventName.slice(2);
      htmlNode.addEventListener(eventKey, (e) => {
        if (eventKey === "keypress") {
          e.preventDefault();
        }
        listenerFn(e);
      });
    } else if (attributeIsCustomEvent(eventName, listenerFn)) {
      if (eventName === "onmount" && !currentPhaseIs("build")) {
        const onMount = listenerFn;
        setTimeout(() => onMount(), 0);
      }
      if (eventName === "onunmount") {
        startUnmountObserver();
        htmlNode.unmountListener = listenerFn;
      }
    } else {
      console.error(`Invalid event key: ${eventName} for node with tagName: ${htmlNode.tagName}`);
    }
  });
};
var handleAttributeProps = (htmlNode, attributes) => {
  const attribSignals = {};
  const getAttrValue = (attributeValue) => {
    const attrValue = valueIsSignal(attributeValue) ? attributeValue.value : attributeValue;
    return attrValue ?? "";
  };
  const setAttribute = (htmlNode2, attrKey, attributeValue) => {
    const attrValue = getAttrValue(attributeValue);
    if (typeof attrValue === "boolean") {
      if (attrValue)
        htmlNode2.setAttribute(attrKey, "");
      else
        htmlNode2.removeAttribute(attrKey);
    } else if (attrKey === "value") {
      htmlNode2.value = attrValue;
    } else if (attrKey === "classname") {
      htmlNode2.setAttribute("class", attrValue);
    } else {
      htmlNode2.setAttribute(attrKey, attrValue);
    }
  };
  Object.entries(attributes).forEach((attrib) => {
    const [attrKey, attrVal] = attrib;
    const maybeSignalAttrVal = attrVal;
    if (valueIsSignal(maybeSignalAttrVal)) {
      attribSignals[attrKey] = maybeSignalAttrVal;
      return;
    }
    setAttribute(htmlNode, attrKey, maybeSignalAttrVal);
  });
  const attrSignalsEffect = () => {
    Object.entries(attribSignals).forEach(([attrKey, attrValue]) => {
      setAttribute(htmlNode, attrKey, attrValue);
    });
  };
  effect(attrSignalsEffect);
};
var getNodeFromChild = (child) => {
  if (valueIsSignalChild(child)) {
    const nonSignalChild = child.value;
    return getNodeFromChild(nonSignalChild);
  }
  if (valueIsHtmlNode(child)) {
    return child;
  }
  if (typeof child !== "string") {
    throw new Error(`Invalid child. Type of child: ${typeof child}`);
  }
  return document.createTextNode(child);
};
var handleChildrenProp = (parentNode, childrenProp) => {
  if (!childrenProp)
    return;
  if (valueIsChildrenSignal(childrenProp)) {
    effect(() => {
      const childrenSignal = childrenProp;
      const childrenSignalValue = childrenSignal.value;
      const children = valueIsArray(childrenSignalValue) ? childrenSignalValue : [childrenSignalValue];
      children.forEach((child, index) => {
        const prevChildNode = parentNode.childNodes[index];
        const newChildNode = getNodeFromChild(child);
        if (prevChildNode && newChildNode) {
          parentNode.replaceChild(newChildNode, prevChildNode);
        } else if (newChildNode) {
          parentNode.appendChild(newChildNode);
        } else {
          console.error(`No child found for node with tagName: ${parentNode.tagName}`);
        }
      });
      const newChildrenCount = children.length;
      while (newChildrenCount < parentNode.childNodes.length) {
        const childNode = parentNode.childNodes[newChildrenCount];
        if (childNode)
          parentNode.removeChild(childNode);
      }
    });
  }
  if (valueIsChildren(childrenProp)) {
    const children = childrenProp;
    const signalledChildren = [];
    const sureArrayChildren = valueIsArray(children) ? children : [children];
    sureArrayChildren.forEach((maybeSignalChild, index) => {
      if (valueIsSignalChild(maybeSignalChild)) {
        signalledChildren.push({
          index,
          childSignal: maybeSignalChild
        });
      }
      if (currentPhaseIs("mount"))
        return;
      const childNode = getNodeFromChild(maybeSignalChild);
      parentNode.appendChild(childNode);
    });
    if (signalledChildren.length) {
      signalledChildren.forEach(({ index, childSignal }) => {
        effect(() => {
          if (!childSignal.value)
            return;
          if (currentPhaseIs("mount"))
            return;
          const newChildNode = getNodeFromChild(childSignal.value);
          const prevChildNode = parentNode.childNodes[index];
          if (prevChildNode && newChildNode) {
            parentNode.replaceChild(newChildNode, prevChildNode);
          } else if (!prevChildNode && newChildNode) {
            parentNode.appendChild(newChildNode);
          } else {
            console.error(`No child found for node with tagName: ${parentNode.tagName}`);
          }
        });
      });
    }
  }
};
var getNodesEventsAndAttributes = (props, tagName) => {
  let childrenProp = undefined;
  const events = {};
  const attributes = {};
  Object.entries(props).forEach(([propKey, propValue]) => {
    if (propKey === "children") {
      if (valueIsChildrenProp(propValue))
        childrenProp = propValue;
      else
        throw new Error(`Invalid children prop for node with tagName: ${tagName}\n\n ${JSON.stringify(propValue)}`);
    } else if (attributeIsEvent(propKey, propValue)) {
      events[propKey] = propValue;
    } else {
      attributes[propKey] = propValue;
    }
  });
  return { childrenProp, events, attributes };
};
var createHtmlNode = (tagName, props) => {
  const nodeId = idGen.getNewId();
  const htmlNode = currentPhaseIs("mount") ? document.querySelector(`[data-node-id="${nodeId}"]`) : document.createElement(tagName);
  htmlNode.nodeId = nodeId;
  htmlNode.unmountListener = undefined;
  const htmlNodeProps = valueIsChildrenProp(props) ? { children: props } : props;
  if (!currentPhaseIs("run")) {
    htmlNodeProps["data-node-id"] = htmlNode.nodeId.toString();
  }
  const { childrenProp, events, attributes } = getNodesEventsAndAttributes(htmlNodeProps, htmlNode.tagName);
  handleEventProps(htmlNode, events);
  handleAttributeProps(htmlNode, attributes);
  handleChildrenProp(htmlNode, childrenProp);
  if (currentPhaseIs("mount")) {
    htmlNode.removeAttribute("data-node-id");
    if (tagName === "html") {
      startPhase("run");
    }
  }
  return htmlNode;
};
// node_modules/@mufw/maya/core/nodes/custom-nodes/for.ts
var getSignalledObject = (item, i, map) => {
  const indexSignal = signal(i);
  const itemSignal = signal(item);
  return {
    indexSignal,
    itemSignal,
    mappedChild: map(itemSignal, indexSignal)
  };
};
var getChildrenAfterInjection = (children, n, nthChild) => {
  if (n !== undefined && n >= 0 && nthChild) {
    const injectingIndex = n > children.length ? children.length : n;
    children.splice(injectingIndex, 0, nthChild());
  }
  return children;
};
var customeNodeFor = ({
  items,
  itemIdKey,
  map,
  mutableMap,
  n,
  nthChild
}) => {
  if (nthChild && n === undefined || n !== undefined && !nthChild) {
    throw new Error("Either both 'n' and 'nthChild' be passed or none of them.");
  }
  const list = valueIsSignal(items) ? items : signal(items);
  if (map) {
    if (itemIdKey || mutableMap) {
      throw new Error("if 'map' is provided, 'itemIdKey' and 'mutableMap' is uncessary.");
    }
    return derived(() => getChildrenAfterInjection(list.value.map(map), n, nthChild));
  }
  const itemsValue = list.value;
  if (!mutableMap)
    throw new Error("mutableMap is missing");
  if (itemsValue.length && typeof itemsValue[0] !== "object")
    throw new Error("for mutable map, item in the list must be an object");
  let oldList = null;
  const newList = derived((oldVal) => {
    oldList = oldVal || oldList;
    return list.value;
  });
  const signalledItemsMap = derived((oldMap) => {
    if (!oldMap || !oldList) {
      const initialItems = newList.value;
      return initialItems.map((item, i) => getSignalledObject(item, i, mutableMap));
    }
    const muts = getArrayMutations(oldList, newList.value, itemIdKey);
    return muts.map((mut, i) => {
      const oldObject = oldMap[mut.oldIndex];
      console.assert(mut.type === "add" && mut.oldIndex === -1 && !oldObject || mut.oldIndex > -1 && !!oldObject, "In case of mutation type 'add' oldIndex should be '-1', or else oldIndex should always be a non-negative integer.");
      if (oldObject) {
        if (mut.type === "shuffle") {
          oldObject.indexSignal.value = i;
        }
        if (mut.type === "update") {
          oldObject.indexSignal.value = i;
          oldObject.itemSignal.value = mut.value;
        }
        return oldObject;
      }
      return getSignalledObject(mut.value, i, mutableMap);
    });
  });
  const nodesSignal = derived(() => getChildrenAfterInjection(signalledItemsMap.value.map((ob) => ob.mappedChild), n, nthChild));
  return nodesSignal;
};
// node_modules/@mufw/maya/core/nodes/custom-nodes/if.ts
var customeNodeIf = ({
  condition,
  whenTruthy,
  whenFalsy
}) => {
  if (!whenTruthy && !whenFalsy)
    throw `Both 'whenTruthy' and 'whenFalsy' are missing. At least one of them should be provided.`;
  const conditionIsTruthy = derived(() => !!val(condition));
  return derived(() => conditionIsTruthy.value ? whenTruthy ? whenTruthy() : m2.Span({ style: "display: none;" }) : whenFalsy ? whenFalsy() : m2.Span({ style: "display: none;" }));
};
// node_modules/@mufw/maya/core/nodes/custom-nodes/switch.ts
var customeNodeSwitch = ({
  subject,
  defaultCase,
  cases
}) => {
  const switchCase = derived(() => valueIsSignal(subject) ? subject.value : subject);
  return derived(() => {
    const caseKey = switchCase.value;
    return cases[caseKey] ? cases[caseKey]() : defaultCase ? defaultCase() : m2.Span({ style: "display: none;" });
  });
};
// node_modules/@mufw/maya/core/nodes/m.ts
var htmlNodesMap = htmlTagNames.reduce((map, htmlTagName) => {
  const nodeTagName = htmlTagName.split("").map((char, index) => !index ? char.toUpperCase() : char).join("");
  map[nodeTagName] = (props) => createHtmlNode(htmlTagName, props);
  return map;
}, {});
var m2 = {
  ...htmlNodesMap,
  For: customeNodeFor,
  If: customeNodeIf,
  Switch: customeNodeSwitch
};
// dev/@elements/brand-logo.ts
var BrandLogo = ({
  logoSrc,
  logoHref,
  logoSize,
  labelComponent
}) => {
  const size = dstring`${() => val(logoSize) || 32}`;
  return m2.A({
    class: "space-mono link black flex items-center justify-start",
    href: logoHref,
    children: [
      m2.Img({
        src: logoSrc,
        height: size,
        width: size
      }),
      m2.If({
        condition: labelComponent,
        whenTruthy: () => labelComponent
      })
    ]
  });
};
// dev/@elements/divider.ts
var Divider = ({ className }) => m2.Div({
  class: dstring`bl b--moon-gray min-vh-20 ${className}`
});
// dev/@elements/view-frame.ts
var ViewFrame = ({
  classNames,
  contentClassNames,
  children
}) => {
  return m2.Div({
    id: "view-frame",
    class: dstring`w-100 bg-pale ${classNames}`,
    children: [
      m2.Div({
        class: dstring`mw8 center ${contentClassNames}`,
        children
      })
    ]
  });
};

// dev/@elements/link.ts
var Link = ({
  classNames,
  colorCss,
  target,
  isSelected,
  href,
  label
}) => m2.A({
  class: dstring`link underline ${() => val(colorCss) || "red"} ${() => val(isSelected) ? `bg-${val(colorCss) || "red"}` : ""} ${classNames}`,
  target,
  href,
  children: label
});

// dev/@elements/titled-list.ts
var TitledList = ({
  classNames,
  titleClassNames,
  itemClassNames,
  header,
  justifyRight,
  links,
  linkColorCss,
  bottomComponent
}) => m2.Div({
  class: dstring`${() => val(justifyRight) ? "tr" : ""} ${classNames}`,
  children: [
    m2.P({
      class: dstring`space-mono mt0 f3 lh-solid ${titleClassNames}`,
      children: header
    }),
    m2.Div(m2.For({
      items: links,
      map: (link2) => m2.Div({
        class: itemClassNames,
        children: [
          Link({
            colorCss: linkColorCss,
            href: link2.href,
            label: link2.label
          })
        ]
      })
    })),
    m2.If({
      condition: bottomComponent,
      whenTruthy: () => bottomComponent
    })
  ]
});

// dev/@elements/footer.ts
var Footer = ({
  relativePathToRoot,
  colorCss
}) => ViewFrame({
  classNames: "bg-pale-dark",
  contentClassNames: "flex items-start justify-between ph3 pv4",
  children: [
    m2.Div({
      class: "flex flex-column items-stretch justify-between",
      children: [
        m2.Div({
          children: [
            m2.A({
              class: "flex items-center justify-start no-underline",
              href: "/",
              children: [
                m2.Img({
                  src: dstring`${relativePathToRoot}assets/images/cyfer-logo.png`,
                  height: "32",
                  width: "32"
                })
              ]
            }),
            m2.P({
              class: "m0 f7",
              children: "\xA9 2024 Cyfer Tech."
            }),
            m2.P({
              class: "nt2 f7",
              children: "All rights reserved."
            })
          ]
        }),
        m2.Span({
          class: "mt4 pt3 mb0",
          children: [
            m2.Span({
              children: "This site is created using "
            }),
            Link({
              colorCss,
              classNames: "underline",
              href: "maya",
              label: "Maya"
            }),
            m2.Span({
              children: "."
            })
          ]
        })
      ]
    }),
    m2.Div({
      class: "flex items-start justify-between",
      children: [
        TitledList({
          justifyRight: true,
          linkColorCss: colorCss,
          classNames: "pr3",
          itemClassNames: "mb3",
          header: "Company",
          links: [
            {
              label: "About us",
              href: "#about-us"
            },
            {
              label: "Blogs",
              href: "#blogs"
            },
            {
              label: "Team",
              href: "#about-us"
            },
            {
              label: "Career",
              href: "/careers"
            }
          ]
        }),
        Divider({ className: "mh4 ph2" }),
        TitledList({
          justifyRight: true,
          linkColorCss: colorCss,
          classNames: "pr3",
          itemClassNames: "mb3",
          header: "Products",
          links: [
            {
              label: "Maya",
              href: "/maya"
            },
            {
              label: "KarmaJs",
              href: "/karma"
            },
            {
              label: "Yajman",
              href: "/yajman"
            },
            {
              label: "Batua",
              href: "/batua"
            }
          ]
        }),
        Divider({ className: "mh4 ph2" }),
        m2.Div({
          children: [
            TitledList({
              justifyRight: true,
              itemClassNames: "mb3",
              linkColorCss: colorCss,
              header: "Relations",
              links: [
                {
                  label: "Sponsor Us",
                  href: "/sponsor-us"
                },
                {
                  label: "FAQs",
                  href: "/faqs"
                },
                {
                  label: "Feedback",
                  href: "/feedback"
                }
              ],
              bottomComponent: m2.Span({
                class: "flex items-center justify-end",
                children: [
                  m2.A({
                    target: "_blank",
                    href: "https://github.com/thecyfertech",
                    children: [
                      m2.Img({
                        class: "ba b--none br-100",
                        src: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
                        height: "32",
                        width: "32"
                      })
                    ]
                  }),
                  m2.A({
                    class: "ml3",
                    target: "_blank",
                    href: "https://twitter.com/thecyfertech",
                    children: [
                      m2.Img({
                        class: "ba b--none br-100",
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAAAAABXZoBIAAAA/0lEQVR4AbXPIazCMACE4d+L2qoZFEGSIGcRc/gJJB5XMzGJmK9EN0HMi+qaibkKVF1txdQe4g0YzPK5yyWXHL9TaPNQ89LojH87N1rbJcXkMF4Fk31UMrf34hm14KUeoQxGArALHTMuQD2cAWQfJXOpgTbksGr9ng8qluShJTPhyCdx63POg7rEim95ZyR68I1ggQpnCEGwyPicw6hZtPEGmnhkycqOio1zm6XuFtyw5XDXfGvuau0dXHzJp8pfBPuhIXO9ZK5ILUCdSvLYMpc6ASBtl3EaC97I4KaFaOCaBE9Zn5jUsVqR2vcTJZO1DdbGoZryVp94Ka/mQfE7f2T3df0WBhLDAAAAAElFTkSuQmCC",
                        height: "24",
                        width: "24"
                      })
                    ]
                  })
                ]
              })
            })
          ]
        })
      ]
    })
  ]
});
// dev/@elements/header.ts
var Header = ({
  logoSize,
  logoSrc,
  logoHref,
  logoLabelComponent,
  links,
  rightmostComponent
}) => m2.Div({
  class: "pa3 bg-pale sticky top-0 flex items-center justify-between",
  children: [
    BrandLogo({
      logoSize,
      logoSrc,
      logoHref,
      labelComponent: logoLabelComponent
    }),
    m2.Div({
      class: "flex items-center justify-end",
      children: m2.For({
        items: links,
        n: rightmostComponent ? Infinity : -1,
        nthChild: () => rightmostComponent,
        map: (link4) => Link({
          isSelected: link4.isSelected,
          classNames: "ml3 pv1 ph2",
          colorCss: link4.colorCss,
          href: link4.href,
          label: link4.label
        })
      })
    })
  ]
});
// dev/@components/cyfer-header.ts
var CyferHeader = () => {
  const endpoint = document.location.hash;
  console.log(endpoint);
  return Header({
    logoHref: "/",
    logoSrc: "assets/images/cyfer-logo.png",
    logoSize: 56,
    logoLabelComponent: m2.A({
      class: "ml2 link black no-underline",
      href: "/",
      children: [
        m2.Div({
          class: `f4`,
          children: "CYFER"
        }),
        m2.Div({
          class: `f4`,
          children: "TECH"
        })
      ]
    }),
    links: [
      {
        isSelected: endpoint === "#products",
        href: "/#products",
        label: "Products"
      },
      {
        isSelected: endpoint === "#blogs",
        href: "/#blogs",
        label: "Blogs"
      },
      {
        isSelected: endpoint === "#about-us",
        href: "/#about-us",
        label: "About Us"
      }
    ],
    rightmostComponent: m2.A({
      class: "ml4",
      href: "https://github.com/thecyfertech",
      children: [
        m2.Img({
          class: "ba b--none br-100",
          src: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
          height: "40",
          width: "40"
        })
      ]
    })
  });
};
// dev/blogs/page.ts
var page_default = () => {
  return m2.Html({
    lang: "en",
    children: [
      m2.Head({
        children: [
          m2.Title({
            children: "Blogs"
          }),
          m2.Link({
            rel: "stylesheet",
            href: "https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css"
          }),
          m2.Link({
            rel: "stylesheet",
            href: "../assets/styles.css"
          })
        ]
      }),
      m2.Body({
        children: [
          m2.Script({
            src: "main.js",
            defer: true
          }),
          m2.Div({
            class: "bg-pale",
            children: [
              ViewFrame({
                classNames: "items-center justify-center",
                children: [
                  CyferHeader(),
                  m2.Div({
                    class: "mv6 pv4 w-50 center",
                    children: [
                      m2.P({
                        class: "tc i space-mono f1",
                        children: `"don't be evil"`
                      }),
                      m2.P({
                        class: "tc nt3 f3 lh-copy",
                        children: `- an echo from the past`
                      })
                    ]
                  }),
                  m2.Div({
                    children: [
                      m2.P({
                        id: "products",
                        class: "f2 space-mono lh-copy",
                        children: "# products"
                      }),
                      m2.P({
                        id: "blogs",
                        class: "f2 space-mono lh-copy",
                        children: "# blogs"
                      }),
                      m2.Div({
                        children: [
                          m2.P({
                            id: "about-us",
                            class: "f2 space-mono lh-copy",
                            children: "# about us"
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              Footer({
                relativePathToRoot: "../"
              })
            ]
          })
        ]
      })
    ]
  });
};

    
const mountAndRun = () => {
  setTimeout(() => {
    startPhase("mount");
    idGen.resetIdCounter();
    page_default();
    startPhase("run")
  });
};

mountAndRun();
    window.onfocus = () => location.reload();
  