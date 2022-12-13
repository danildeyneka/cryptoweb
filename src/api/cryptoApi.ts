import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { coinT, cryptoApiT, cryptoDetailsT } from './cryptoApi.types'

const headers = {
    'X-RapidAPI-Key': '2422496abcmsh0caa3f6518d8981p164edcjsn002676e8f4fd',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const createRequest = (url: string) => ({url, headers})

export const cryptoApi = createApi({
    reducerPath: '/cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://coinranking1.p.rapidapi.com'}),
    endpoints: (builder) => ({
        getCryptos: builder.query<cryptoApiT, number | void>({
            query: (count = 50) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query<cryptoDetailsT, string>({
            query: (id) => createRequest(`/coin/${id}`)
        })
    })
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery
} = cryptoApi