import { StockDetails } from "./stock";

export class CompanySearchDetail {
    stocks?: StockDetails[];
    companyName?: string;
    maxPrice?: number;
    minPrice?: number;
    avgPrice?: number;
    errorMsg?: string;

    constructor(companyName: string,
        stockList?: StockDetails[],
        maxPrice?: number,
        minPrice?: number,
        avgPrice?: number,
        errorMsg?: string) {

        this.companyName = companyName
        this.stocks = stockList;
        this.maxPrice = maxPrice;
        this.minPrice = minPrice;
        this.avgPrice = avgPrice;
        this.errorMsg = errorMsg;
    }
}
