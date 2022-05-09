interface Doc {
  name: string;
  demand: number;
  price: number;
  producers: Producer[];
}

export function sampleProvinceData() {
  return {
    name: "Asia",
    producers: [
      {
        name: "Byzantium",
        cost: 10,
        production: 9,
        province: { totalProduction: 0 },
      },
      {
        name: "Attalia",
        cost: 12,
        production: 10,
        province: { totalProduction: 0 },
      },
      {
        name: "Sinope",
        cost: 10,
        production: 6,
        province: { totalProduction: 0 },
      },
    ],
    demand: 30,
    price: 20,
  };
}

export class Province {
  name: string;
  producers: Partial<Producer>[];
  totalProduction: number;
  demand: number;
  price: number;

  constructor(doc) {
    this.name = doc.name;
    this.producers = [];
    this.totalProduction = 0;
    this.demand = doc.demand;
    this.price = doc.price;
    doc.producers.forEach((d) => this.addProducer(new Producer(this, d)));
  }

  get getName() {
    return this.name;
  }
  get getProducers() {
    return this.producers.slice();
  }
  get getTotalProduction() {
    return this.totalProduction;
  }
  set setTotalProduction(arg) {
    this.totalProduction = arg;
  }
  get getDemand() {
    return this.demand;
  }
  set setDemand(arg) {
    this.demand = parseInt(`${arg}`);
  }
  get getPrice() {
    return this.price;
  }
  set setPrice(arg) {
    this.price = parseInt(`${arg}`);
  }

  get shortfall() {
    return this.demand - this.totalProduction;
  }

  get profit() {
    return this.demandValue - this.demandCost;
  }

  get demandValue() {
    return this.satisfiedDemand * this.price;
  }
  get satisfiedDemand() {
    return Math.min(this.demand, this.totalProduction);
  }

  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach((p) => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });
    return result;
  }

  addProducer(producer: Producer) {
    this.producers.push(producer);
    this.totalProduction += producer.production;
  }
}

class Producer {
  province: {
    totalProduction: number;
  };
  cost: number;
  name: string;
  production: number;

  constructor(aProvince, data) {
    this.province = aProvince;
    this.cost = data.cost;
    this.name = data.name;
    this.production = data.production || 0;
  }

  get getName() {
    return this.name;
  }
  get getCost() {
    return this.cost;
  }
  set setCost(arg) {
    this.cost = parseInt(`${arg}`);
  }

  get getProduction() {
    return this.production;
  }
  set setProduction(amountStr) {
    const amount = parseInt(`${amountStr}`);
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    this.province.totalProduction += newProduction - this.production;
    this.production = newProduction;
  }
}
