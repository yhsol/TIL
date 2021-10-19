function printOwing(invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice);
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}

function printBanner() {
  console.log("고객 채무");
}

function printDetails(invoice, outstanding) {
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocalDateString()}`);
}

function recordDueDate(invoice) {
  const today = new Date();
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );
}

function calculateOutstanding(invoice) {
  let result = 0;
  for (const o of invoice.orders) {
    result += o.amount;
  }
  return result;
}

function rating(aDriver) {
  // return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
  return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
}

function moreThanFiveLateDeliveries(aDriver) {
  return aDriver.numberOfLateDeliveries > 5;
}

function reportLines(aCustomer) {
  const lines = [];
  lines.push(["name", aCustomer.name]);
  lines.push(["location", aCustomer.location]);
  return lines;
}

function extractVariable() {
  let order = {
    quantity: 0,
    itemPrice: 0,
  };

  // before
  // return (
  //   order.quantity * order.itemPrice -
  //   Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
  //   Math.min(order.quantity * order.itemPrice * 0.1, 100)
  // );

  // refactoring
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount =
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(basePrice + 0.1, 100);
  return basePrice - quantityDiscount + shipping;
}

class Order {
  _data: {
    quantity: number;
    itemPrice: number;
  };

  constructor(aRecord) {
    this._data = aRecord;
  }

  get quantity() {
    return this._data.quantity;
  }
  get itemPrice() {
    return this._data.itemPrice;
  }

  get price() {
    return this.basePrice - this.quantityDiscount + this.shipping;
  }
  get basePrice() {
    return this.quantity * this.itemPrice;
  }
  get quantityDiscount() {
    return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;
  }
  get shipping() {
    return Math.min(this.basePrice * 0.1, 100);
  }
}
