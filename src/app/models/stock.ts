export class StockDetails {
    stockDate?: string;
    stockTime?: string;
    stockPrice?: number;
    companyCode?: string;

    constructor(stockDate: string, stockTime: string, stockPrice: number, companyCode: string) {
        this.stockDate = stockDate;
        this.stockTime = stockTime;
        this.stockPrice = stockPrice;
        this.companyCode = companyCode;
    }
}