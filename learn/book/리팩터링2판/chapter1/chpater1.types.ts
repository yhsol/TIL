import { PlayType } from "./chapter1.const";

export type PlayModel = {
  name: string;
  type: PlayType;
};

export type PlayDict = Record<string, PlayModel>;

export type PerformanceModel = {
  playId: string;
  audience: number;
};

export type Invoice = {
  customer: string;
  performances: PerformanceModel[];
};

export type StatementDataType = {
  customer: string;
  performances: PerformanceData[];
  totalAmount: number;
  totalVolumeCredits: number;
};

export type PerformanceData = PerformanceModel & {
  play: PlayModel;
  amount: number;
  volumeCredits: number;
};
