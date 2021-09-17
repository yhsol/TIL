import { PlayType } from "./chapter1.const";
import { Invoice, PlayDict } from "./chpater1.types";

export const playDict: PlayDict = {
  hamlet: { name: "Hamlet", type: PlayType.TRAGEDY },
  "as-like": { name: "As You Like It", type: PlayType.COMEDY },
  othello: { name: "Othello", type: PlayType.TRAGEDY },
};

export const invoices: Invoice[] = [
  {
    customer: "BigCo",
    performances: [
      {
        playId: "hamlet",
        audience: 55,
      },
      {
        playId: "as-like",
        audience: 35,
      },
      {
        playId: "othello",
        audience: 40,
      },
    ],
  },
];
