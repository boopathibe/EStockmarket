export class Company {
    id?: string;
    companyCode?: string;
    companyName?: string;
    companyCeoName?: string;
    companyTurnover?: number;
    companyWebsite?: string;
    companyStockExchange?: string;
    latestStockPrice?: number;

    constructor(compCode: string, compName: string, compCeoName?: string, compTurnover?: number,
        compWebsite?: string, compStockExchange?: string, latestStockPrice?: number) {
        var length = 5;
        var randomNum = (Math.pow(10, length).toString().slice(length - 1) + Math.floor((Math.random() * Math.pow(10, length)) + 1).toString()).slice(-length);
        this.companyCode = compCode;
        this.companyName = compName;
        this.companyCeoName = compCeoName;
        this.companyTurnover = compTurnover;
        this.companyWebsite = compWebsite;
        this.companyStockExchange = compStockExchange;
        this.latestStockPrice = latestStockPrice;
    }
}