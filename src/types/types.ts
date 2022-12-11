// json2ts

interface Stats {
    total: number;
    totalCoins: number;
    totalMarkets: number;
    totalExchanges: number;
    totalMarketCap: string;
    total24hVolume: string;
}

export interface coinT {
    uuid: string;
    symbol: string;
    name: string;
    color: string;
    iconUrl: string;
    marketCap: string;
    price: string;
    listedAt: number;
    tier: number;
    change: string;
    rank: number;
    sparkline: string[];
    lowVolume: boolean;
    coinrankingUrl: string;
    '24hVolume': string;
    btcPrice: string;
}

interface Data {
    stats: Stats;
    coins: coinT[];
}

export interface cryptoApiT {
    status: string;
    data: Data;
}
