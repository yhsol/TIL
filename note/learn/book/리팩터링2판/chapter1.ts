import { Invoice, PlayDict, StatementDataType } from "./chpater1.types";
import createStatementData from "./createStatementData";
import { invoices, playDict } from "./data";

function usd(aNumber: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function renderPlainText(data: StatementDataType) {
  const { customer, performances } = data;
  let result = `청구 내역 (고객명: ${customer})\n`;
  for (let perf of performances) {
    // 청구 내역을 출력한다.
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }
  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;
}

function renderHtml(data: StatementDataType) {
  const { customer, performances } = data;
  let result = `청구 내역 (고객명: ${customer})\n`;
  result += "<table>\n";
  result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";
  for (let perf of performances) {
    // 청구 내역을 출력한다.
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }
  result += "</table>\n";
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;
  return result;
}

function statement(invoice: Invoice, playDict: PlayDict) {
  return renderPlainText(createStatementData(invoice, playDict));
}

function htmlStatement(invoice: Invoice, playDict: PlayDict) {
  return renderHtml(createStatementData(invoice, playDict));
}

console.log(statement(invoices[0], playDict));
