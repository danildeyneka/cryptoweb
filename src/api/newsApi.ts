import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { newsApiT } from './newsApi.types'

const headers = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '2422496abcmsh0caa3f6518d8981p164edcjsn002676e8f4fd',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const createRequest = (url: string) => ({url, headers})

export const newsApi = createApi({
    reducerPath: '/newsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://bing-news-search1.p.rapidapi.com'}),
    endpoints: build => ({
        getNews: build.query<newsApiT, {category: string, count: number}>({
            query: ({category, count}) => createRequest(`/news/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const {useGetNewsQuery} = newsApi