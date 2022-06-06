export class Stock {
    date?: string;
    time?: string;
    price?: number;
    companyCode?: string;

    constructor(date: string, time: string, price: number, companyCode: string) {
        this.date = date;
        this.time = time;
        this.price = price;
        this.companyCode = companyCode;
    }
}