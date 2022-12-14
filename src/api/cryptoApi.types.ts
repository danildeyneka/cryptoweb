// json2ts
// all items query

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

// coin query

interface Link {
    name: string
    type: string
    url: string
}

interface Supply {
    confirmed: boolean
    supplyAt: number
    max: string
    total: string
    circulating: string
}

interface AllTimeHigh {
    price: string
    timestamp: number
}

export interface cryptoDetailsT {
    data: {
        coin: {
            uuid: string
            symbol: string
            name: string
            description: string
            color: string
            iconUrl: string
            websiteUrl: string
            links: Link[]
            supply: Supply
            numberOfMarkets: number
            numberOfExchanges: number
            '24hVolume': string
            marketCap: string
            fullyDilutedMarketCap: string
            price: string
            btcPrice: string
            priceAt: number
            change: string
            rank: number
            sparkline: string[]
            allTimeHigh: AllTimeHigh
            coinrankingUrl: string
            tier: number
            lowVolume: boolean
            listedAt: number
            notices: any
            tags: string[]
        }
    }
}

// chart query

export interface chartT {
    data: {
        change: string
        history: History[]
    }
}

interface History {
    price: string
    timestamp: number
}
