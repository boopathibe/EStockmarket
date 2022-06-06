import { Stock } from "./stock";

export class CompanySearchDetail {
    stockList?: Stock[];
    companyName?: string;
    maxStockPrice?: number;
    minStockPrice?: number;
    avgStockPrice?: number;
    errorMsg?: string;

    constructor(companyName: string,
        stockList: Stock[],
        maxStockPrice: number,
        minStockPrice: number,
        avgStockPrice: number,
        errorMsg: string) {

        this.companyName = companyName
        this.stockList = stockList;
        this.maxStockPrice = maxStockPrice;
        this.minStockPrice = minStockPrice;
        this.avgStockPrice = avgStockPrice;
        this.errorMsg = errorMsg;
    }
}
