# react-use-state-async

A custom hook trigger call async function each dependencies changes. Support holding and updating for fetch data.

### [Demo](https://codesandbox.io/s/react-use-state-async-4eug6)

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

const getSomethingApi = (id) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (id % 2 === 0) res({ id, fakeData: true });
      rej("cannot get data");
    }, 2000);
  });
};

export default function App() {
  const [id, setId] = React.useState(0);
  const { isLoading, setData, fetch, data, error } = useStateAsync(async () => {
    // do async action
    try {
      const res = await getSomethingApi(id);
      return res;
    } catch (e) {
      throw e;
    }
  }, [id]);

  return (
    <div>
      <button onClick={() => setId((previousId) => previousId + 1)}>
        Fetch data with increase Id
      </button>
      <button onClick={() => fetch()}>Refetch api</button>
      <button onClick={() => setData({ ...data, update: true })}>
        Update data
      </button>
      {isLoading ? <p>Loading</p> : <p>Loaded</p>}
      {data && <p>{JSON.stringify(data)}</p>}
      {error && <p>{JSON.stringify(error)}</p>}
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
