# react-use-state-async

>

[![NPM](https://img.shields.io/npm/v/react-use-state-async.svg)](https://www.npmjs.com/package/react-use-state-async) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# use-state-async

A custom hook trigger call async function each dependencies changes. Support holding and updating for fetch data.

## Install

With npm

```bash
npm install --save react-use-state-async
```

With yarn

```bash
yarn add react-use-state-async
```

## Usage

```tsx
import * as React from "react";
import useStateAsync from "react-use-state-async";

export default function App() {
  const [url, setUrl] = React.useState("");
  const { isLoading, data, error, setData, fetch } = useStateAsync(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("api data");
      }, 1000);
    });
  }, [url]);

  return (
    <div>
      <button onClick={() => setUrl("https://urlapi.com")}>Change url</button>
      <button onClick={() => fetch()}>Refetch api</button>
      <button onClick={() => setData("new data")}>Update data</button>
      {isLoading ? <p>Loading</p> : <p>Loaded</p>}
      {data && <p>{data}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
```

## Props

```
useStateAsync(
  callback: () => any | async () => Promise<any>,
  dependencies: Array<any>
)
```

## Exposed

| parameter | type     | description                                 |
| --------- | -------- | ------------------------------------------- |
| isLoading | boolean  | \`true` if the callback function is running |
| data      | any      | the data is returned in callback function   |
| error     | any      | the error is thrown in callback function    |
| setData   | function | update \`data` state                        |
| fetch     | function | trigger call callback function              |

## License

MIT © [](https://github.com/)
