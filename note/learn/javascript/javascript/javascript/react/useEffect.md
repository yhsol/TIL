# useEffect

[How to useEffect in React - RWieruch](https://www.robinwieruch.de/react-useeffect-hook)

- every render: mount + update

```jsx
React.useEffect(() => {
    console.log("I run on every render: mount + update.");
  });
```

- first render: mount

```jsx
React.useEffect(() => {
    console.log("I run only on ther first render: mount.");
  }, []);
```

- update + first render (mount)

```jsx
React.useEffect(() => {
    console.log("I run only if toggle changes (and on mount).");
  }, [toggle]);
```

- only on update - using useRef

```jsx
const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) {
      console.log("I run only if toggle changes.");
    } else {
      didMount.current = true;
    }
  }, [toggle]);
```

- only once when a variable updates

```jsx
const calledOnce = React.useRef(false);

  React.useEffect(() => {
    if (calledOnce.current) {
      return;
    }

    if (toggle === false) {
      console.log("I run only once if toggle is false.");

      calledOnce.current = true;
    }
  }, [toggle]);
```