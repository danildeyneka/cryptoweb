import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { chartT, cryptoApiT, cryptoDetailsT } from './cryptoApi.types'
import { timeT } from '../components/CryptoDetails'

const headers = {
    'X-RapidAPI-Key': '2422496abcmsh0caa3f6518d8981p164edcjsn002676e8f4fd',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const createRequest = (url: string, params = {}) => ({url, headers, params})

export const cryptoApi = createApi({
    reducerPath: '/cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://coinranking1.p.rapidapi.com'}),
    endpoints: (builder) => ({
        getCryptos: builder.query<cryptoApiT, number | void>({
            query: (count = 50) => createRequest(`/coins?limit=${ count }`)
        }),
        getCryptoDetails: builder.query<cryptoDetailsT, string>({
            query: (id) => createRequest(`/coin/${ id }`)
        }),
        getChartHistory: builder.query<chartT, ({ coinId?: string, timePeriod: timeT })>({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${ coinId }/history`, {timePeriod: timePeriod})
        })
    })
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetChartHistoryQuery
} = cryptoApi