import { PlayType } from "./chapter1.const";
import {
  Invoice,
  PerformanceModel,
  PerformanceData,
  PlayDict,
  StatementDataType,
  PlayModel,
} from "./chpater1.types";

function createPerformanceCalculator(
  aPerformance: PerformanceModel,
  aPlay: PlayModel
) {
  switch (aPlay.type) {
    case PlayType.TRAGEDY:
      return new TragedyCalculator(aPerformance, aPlay);
    case PlayType.COMEDY:
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}

class PerformanceCalculator {
  performance: PerformanceModel;
  play: PlayModel;

  constructor(aPerformance: PerformanceModel, aPlay: PlayModel) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 * 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

function playFor(playDict: PlayDict, aPerformance: PerformanceModel) {
  return playDict[aPerformance.playId];
}

function totalAmount(data: StatementDataType) {
  //   let result = 0;
  //   for (let perf of data.performances) {
  //     result += perf.amount;
  //   }
  //   return result;
  return data.performances.reduce((total, perf) => total + perf.amount, 0);
}

function totalVolumeCredits(data: StatementDataType) {
  //   let result = 0;
  //   for (let perf of data.performances) {
  //     result += perf.volumeCredits;
  //   }
  //   return result;
  return data.performances.reduce(
    (total, perf) => total + perf.volumeCredits,
    0
  );
}

function enrichPerformance(playDict: PlayDict, aPerformance: PerformanceModel) {
  const calculator = createPerformanceCalculator(
    aPerformance,
    playFor(playDict, aPerformance)
  );
  const result = { ...aPerformance } as PerformanceData; // 얕은 복사 수행
  result.play = calculator.play;
  result.amount = calculator.amount;
  result.volumeCredits = calculator.volumeCredits;
  return result;
}

function createStatementData(invoice: Invoice, playDict: PlayDict) {
  const result: StatementDataType = {
    customer: "",
    performances: [],
    totalAmount: 0,
    totalVolumeCredits: 0,
  };
  result.customer = invoice.customer;
  result.performances = invoice.performances.map((performance) =>
    enrichPerformance(playDict, performance)
  );
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;
}

export default createStatementData;
