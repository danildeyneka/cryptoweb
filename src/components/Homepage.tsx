import { FC } from 'react'
import { Statistic, Typography, Row, Col } from 'antd'
import { useGetCryptosQuery } from '../api/cryptoApi'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Cryptocurrencies } from './Cryptocurrencies'

const {Title} = Typography

export const Homepage: FC = () => {
    const {data, isFetching} = useGetCryptosQuery()

    const globalStats = data?.data.stats

    if (isFetching) return <div>Loading...</div>
    return <>
        <Title level={ 2 } className='ml-80'>
            Global Crypto Stats
        </Title>
        <Row>
            <Col span={ 12 }><Statistic title="Total Cryptocurrencies" value={ globalStats!.total }/></Col>
            <Col span={ 12 }><Statistic title="Total Exchanges" value={ millify(globalStats!.totalExchanges) }/></Col>
            <Col span={ 12 }><Statistic title="Total Market Cap" value={ millify(+globalStats!.totalMarketCap) }/></Col>
            <Col span={ 12 }><Statistic title="Total 24h volume" value={ millify(+globalStats!.total24hVolume) }/></Col>
            <Col span={ 12 }><Statistic title="Total Markets" value={ millify(globalStats!.totalMarkets) }/></Col>
        </Row>
        <div className='flex justify-between'>
            <Title level={2} className='mt-6'>Top 10 Cryptocurrencies in the world</Title>
            <Title level={3} className='mr-52'><Link to='/cryptocurrencies'>Show more</Link></Title>
        </div>
        <Cryptocurrencies simplified/>
        <div className='flex justify-between'>
            <Title level={2} className='mt-6'>Latest Crypto news</Title>
            <Title level={3} className='mr-52'><Link to='/news'>Show more</Link></Title>
        </div>
    </>
}