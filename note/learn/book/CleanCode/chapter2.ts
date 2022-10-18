// chapter 2 의미 있는 이름

const STATUS_VALUE = 0;
const FALGGED = 4;

class Chapter2 {
  private theList = [];
  private numberGameBoard: number[] = [];
  private cellGameBoard: Cell[] = [];

  constructor() {}

  getThem() {
    const list1: number[] = [];
    for (const x of this.theList) {
      if (x[0] === 4) {
        list1.push(x);
      }
    }
    return list1;
  }

  //=> 0 과 4를 비롯해 바로 알 수 없는 값들에 이름을 부여함
  // -> 작성할 때는 맥락을 알고있기 때문에 이름을 붙이지 않아도 쉽게 이해할 수 있다고 생각할 수 있지만 다시 보거나 처음 보는 사람은 맥락을 쫓아야 함.
  // -> 이름을 붙여주는게 좋음.

  getFlaggedCells() {
    const falggedCells: number[] = [];
    for (const cell of this.numberGameBoard) {
      if (cell[STATUS_VALUE] === FALGGED) {
        falggedCells.push(cell);
      }
    }
    return falggedCells;
  }

  getFlaggedCellsWithCell() {
    const flaggedCells: Cell[] = [];
    for (const cell of this.cellGameBoard) {
      if (cell.isFlagged()) {
        flaggedCells.push(cell);
      }
    }
    return flaggedCells;
  }
}

class Cell {
  private statusValue: number;
  constructor() {}

  isFlagged() {
    return this.statusValue === FALGGED;
  }
}
