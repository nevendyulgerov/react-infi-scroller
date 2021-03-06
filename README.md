# React Infi Scroller

[![npm](https://img.shields.io/npm/v/react-infi-scroller.svg?style=flat-square)](https://www.npmjs.com/package/react-infi-scroller)
[![npm](https://img.shields.io/npm/l/react-infi-scroller.svg?style=flat-square)](https://github.com/nevendyulgerov/react-infi-scroller/blob/master/LICENSE)

<p>React-based infinite scroll component that just works. It supports <code>window</code> and scrollable nodes, without inline style for height.</p>

## Installation

To install the component, run:

`npm install react-infi-scroller`

## How to use

To import the component in your project:

```javascript
import InfiScroller from 'react-infi-scroller';
```

Use `InfiScroller` on the window object:

```javascript
import React, { useState } from 'react';
import InfiScroller from 'react-infi-scroller';

const MyComponent = () => {
  const generateItems = (items = [], length = 30) => {
    const nextItems = [...items];
    for (let i = 0; i < length; i += 1) {
      nextItems.push(items.length + i);
    }
    return nextItems;
  };
  const [items, setItems] = useState(generateItems());
  const [hasMore, setHasMore] = useState(true);

  return (
    <InfiScroller
      hasMore={hasMore}
      onLoadMore={() => {
        const nextItems = generateItems(items);
        setItems(nextItems);
        setHasMore(nextItems.length < 300);
      }}
    >
      <ul>
        {items.map((item) => (
          <li
            key={item}
            style={{ height: 100 }}
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </InfiScroller>
  );
};
```

Use `InfiScroller` on a custom scroll target (like a modal):

```javascript
import React, { useState, useRef } from 'react';
import InfiScroller from 'react-infi-scroller';

const MyComponent = () => {
  const generateItems = (items = [], length = 30) => {
    const nextItems = [...items];
    for (let i = 0; i < length; i += 1) {
      nextItems.push(items.length + i);
    }
    return nextItems;
  };
  const [items, setItems] = useState(generateItems());
  const [hasMore, setHasMore] = useState(true);
  const refComponent = useRef(null);

  return (
    <div ref={refComponent}>
      <InfiScroller
        scrollTarget={refComponent.current}
        hasMore={hasMore}
        onLoadMore={() => {
          const nextItems = generateItems(items);
          setItems(nextItems);
          setHasMore(nextItems.length < 300);
        }}
      >
        <ul>
          {items.map((item) => (
            <li
              key={item}
              style={{ height: 100 }}
            >
              {`Item ${item}`}
            </li>
          ))}
        </ul>
      </InfiScroller>
    </div>
  );
};
```

Use multiple `InfiScroller` components with custom scroll targets:

```javascript
import React, { useState, useRef } from 'react';
import InfiScroller from 'react-infi-scroller';

const MyComponent = () => {
  const generateItems = (items = [], length = 30) => {
    const nextItems = [...items];
    for (let i = 0; i < length; i += 1) {
      nextItems.push(items.length + i);
    }
    return nextItems;
  };
  const [items, setItems] = useState(generateItems());
  const [hasMore, setHasMore] = useState(true);
  const [otherItems, setOtherItems] = useState(generateItems());
  const [hasMoreOther, setHasMoreOther] = useState(true);
  const refItemsWrapper = useRef(null);
  const refOtherItemsWrapper = useRef(null);
  
  /* Styles for the scroll targets used below
  <style>
    .items-scroller {
      height: 300px;
      overflow: auto;
      background-color: white;
    }

    .other-items-scroller {
      height: 500px;
      margin-top: 40px;
      overflow: auto;
      background-color: white;
    }
  </style>
  */

  return (
    <div>
      <div
        ref={refItemsWrapper}
        className="items-scroller"
      >
          <InfiScroller
            scrollTarget={refItemsWrapper.current}
            hasMore={hasMore}
            onLoadMore={() => {
              const nextItems = generateItems(items);
              setItems(nextItems);
              setHasMore(nextItems.length < 300);
            }}
          >
            <ul>
              {items.map((item) => (
                <li
                  key={item}
                  style={{ height: 100 }}
                >
                  {`Item ${item}`}
                </li>
              ))}
            </ul>
          </InfiScroller>
      </div>

      <div
        ref={refOtherItemsWrapper}
        className="other-items-scroller"
      >
          <InfiScroller
            scrollTarget={refOtherItemsWrapper.current}
            hasMore={hasMoreOther}
            onLoadMore={() => {
              const nextOtherItems = generateItems(otherItems);
              setOtherItems(nextOtherItems);
              setHasMoreOther(nextOtherItems.length < 120);
            }}
          >
            <ul>
              {otherItems.map((otherItem) => (
                <li
                  key={otherItem}
                  style={{ height: 100 }}
                >
                  {`Other Item ${otherItem}`}
                </li>
              ))}
            </ul>
          </InfiScroller>
      </div>
    </div>
  );
};
```

Use `InfiScroller` with a spinner/loader:

```javascript
import React, { useState } from 'react';
import InfiScroller from 'react-infi-scroller';

const MyComponent = () => {
  const generateItems = (items = [], length = 30) => {
    const nextItems = [...items];
    for (let i = 0; i < length; i += 1) {
      nextItems.push(items.length + i);
    }
    return nextItems;
  };
  const [items, setItems] = useState(generateItems());
  const [hasMore, setHasMore] = useState(true);

  return (
    <InfiScroller
      hasMore={hasMore}
      onLoadMore={() => {
        const nextItems = generateItems(items);
        setItems(nextItems);
        setHasMore(nextItems.length < 300);
      }}
    >
      <ul>
        {items.map((item) => (
          <li
            key={item}
            style={{ height: 100 }}
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>

      {hasMore && (
        <span>Loading...</span>
      )}
    </InfiScroller>
  );
};
```

## Props

<table>
<colgroup>
<col span="1"/>
<col span="1"/>
<col span="1"/>
<col span="1"/>
</colgroup>
<thead>
<tr>
<th style="text-align:left;">Name</th>
<th style="text-align:left;">Type</th>
<th style="text-align:left;">Default</th>
<th style="text-align:left;">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left;"><code>children</code></td>
<td style="text-align:left;"><code>Node | NodeList</code></td>
<td style="text-align:left;"></td>
<td style="text-align:left;">The content in the infinite scroller. Contains the list of items you want to trigger infinite scrolling for.</td>
</tr>
<tr>
<td style="text-align:left;"><code>scrollTarget</code></td>
<td style="text-align:left;"><code>Node</code></td>
<td style="text-align:left;"><code>null</code></td>
<td style="text-align:left;">The scroll target. Can be set to a custom scrollable node or omitted/null. When omitted/null the window object is used as scroll target.</td>
</tr>
<tr>
<td style="text-align:left;"><code>debounceDelay</code></td>
<td style="text-align:left;"><code>Number</code></td>
<td style="text-align:left;"><code>300</code></td>
<td style="text-align:left;">Debounce delay (in milliseconds) to optimize high-frequency scroll events. A recommended delay of <code>300</code> milliseconds is set by default.</td>
</tr>
<tr>
<td style="text-align:left;"><code>gutter</code></td>
<td style="text-align:left;"><code>Number</code></td>
<td style="text-align:left;"><code>10</code></td>
<td style="text-align:left;">Additional space (in pixels) used in the default <code>shouldLoadMore</code> calculation. Increasing it will cause the <code>onLoadMore</code> callback to be called before the scrollbar has reached the bottom of the <code>scrollTarget</code>. The larger the number, the earlier the <code>onLoadMore</code> callback will be called. A recommended minimum gutter of <code>10</code> pixels is set by default.</td>
</tr>
<tr>
<td style="text-align:left;"><code>immediate</code></td>
<td style="text-align:left;"><code>Boolean</code></td>
<td style="text-align:left;"><code>false</code></td>
<td style="text-align:left;">Whether to trigger an initial check, before any scroll event, if <code>onLoadMore</code> callback should be called. Set it to <code>true</code>when you want <code>onLoadMore</code> to be called immediately after the <code>scrollTarget</code> is mounted. This can be useful in case the scrollbar has been preset to the bottom of the <code>scrollTarget</code> or the content of the <code>scrollTarget</code> is less than its height and no scroll exist for it yet.</td>
</tr>
<tr>
<td style="text-align:left;"><code>active</code></td>
<td style="text-align:left;"><code>Boolean</code></td>
<td style="text-align:left;"><code>true</code></td>
<td style="text-align:left;">Turn on/off the infinite scroller. Keeps the component's children visible. Attaches event listeners when set to <code>true</code>. Detaches event listeners when set to <code>false</code>. Useful when the infinite scroller is placed inside a modal and you want it disabled until the modal is activated.</td>
</tr>
<tr>
<td style="text-align:left;"><code>hasMore</code></td>
<td style="text-align:left;"><code>Boolean</code></td>
<td style="text-align:left;"><code>false</code></td>
<td style="text-align:left;">Whether there are more items to load. This flag is used to determine if <code>onLoadMore</code> should be called. The entire check looks like this <code>hasMore && shouldLoadMore(...)</code>.</td>
</tr>
<tr>
<td style="text-align:left;"><code>shouldLoadMore</code></td>
<td style="text-align:left;"><pre>(
 scrollTargetHeight: number,
 scrollYOffset: number,
 gutter: number,
 scrollHeight: number
) => boolean</pre></td>
<td style="text-align:left;"><pre>(
 scrollTargetHeight,
 scrollYOffset,
 gutter,
 scrollHeight
) => (
  scrollTargetHeight
  + scrollYOffset
  + gutter
  >= scrollHeight
)</pre></td>
<td style="text-align:left;">Determine if more items should be loaded. By default a <code>scrollTargetHeight + scrollYOffset + gutter >= scrollHeight</code> formula is used. Provide a different function to customize this behavior. Note that <code>shouldLoadMore</code> will be called only if <code>hasMore</code> is <code>true</code>.</td>
</tr>
<tr>
<td style="text-align:left;"><code>onLoadMore</code></td>
<td style="text-align:left;"><code>() => void</code></td>
<td style="text-align:left;"></td>
<td style="text-align:left;">Called when <code>hasMore && shouldLoadMore(...)</code> is <code>true</code>. You should load and render more items in the infinite scroller when <code>onLoadMore</code> is called.</td>
</tr>
</tbody>
</table>
