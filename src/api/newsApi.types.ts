interface QueryContext {
    _type: string;
    originalQuery: string;
    adultIntent: boolean;
}

interface Sort {
    _type: string;
    name: string;
    id: string;
    isSelected: boolean;
    url: string;
}

interface Thumbnail {
    _type: string;
    contentUrl: string;
    width: number;
    height: number;
}

interface Image {
    _type: string;
    thumbnail: Thumbnail;
}

interface About {
    _type: string;
    readLink: string;
    name: string;
}

interface Mention {
    _type: string;
    name: string;
}

interface Thumbnail2 {
    _type: string;
    contentUrl: string;
}

interface Image2 {
    _type: string;
    thumbnail: Thumbnail2;
}

interface Provider {
    _type: string;
    name: string;
    image: Image2;
}

interface Value {
    _type: string;
    name: string;
    url: string;
    image: Image;
    description: string;
    about: About[];
    mentions: Mention[];
    provider: Provider[];
    // datePublished: Date;
    datePublished: string;
    category: string;
}

export interface newsApiT {
    _type: string;
    readLink: string;
    queryContext: QueryContext;
    totalEstimatedMatches: number;
    sort: Sort[];
    value: Value[];
}