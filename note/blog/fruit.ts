interface Fruit {
  banana: string;
}

export function isBanana(fruit: any): fruit is Fruit {
  return (fruit as Fruit).banana !== undefined;
}
