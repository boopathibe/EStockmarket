import { StockDetails } from "./stock";

export class stockResponse {
    stocks?: StockDetails[];
    maxPrice?: number;
    minPrice?: number;
    avgPrice?: number;

    constructor(stocks: StockDetails[],
        maxPrice: number,
        minPrice: number,
        avgPrice: number) {
        this.stocks = stocks;
        this.maxPrice = maxPrice;
        this.minPrice = minPrice;
        this.avgPrice = avgPrice;
    }
}
