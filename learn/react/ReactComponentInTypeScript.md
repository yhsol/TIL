# How to write a React Component in TypeScript

from: [How to write a React Component in TypeScript
](https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript)

```tsx
type OperationFn = (left: number, right: number) => number;
type Operator = "+" | "-" | "/" | "*";
const operations: Record<Operator, OperationFn> = {
  "+": (left, right) => left + right,
  "-": (left, right) => left - right,
  "*": (left, right) => left * right,
  "/": (left, right) => left / right,
};

type CalculatorProps = {
  left: number;
  operator: keyof typeof operations;
  right: number;
};

function Calculator({ left, operator, right }: CalculatorProps) {
  const result = operations[operator](left, right);
  return (
    <div>
      <code>
        {left} {operator} {right} = <output>{result}</output>
      </code>
    </div>
  );
}

const examples = (
  <>
    <Calculator left={1} operator="+" right={2} />
    <Calculator left={1} operator="-" right={2} />
    <Calculator left={1} operator="*" right={2} />
    <Calculator left={1} operator="/" right={2} />
  </>
);

function ReactComponentInTypeScript() {
  return examples;
}

export default ReactComponentInTypeScript;
```
