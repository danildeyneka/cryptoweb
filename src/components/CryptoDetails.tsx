import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetChartHistoryQuery, useGetCryptoDetailsQuery } from '../api/cryptoApi'
import millify from 'millify'
import {
    CheckOutlined,
    DollarCircleOutlined, ExclamationCircleOutlined,
    FundOutlined, MoneyCollectOutlined,
    NumberOutlined, StopOutlined,
    ThunderboltOutlined,
    TrophyOutlined
} from '@ant-design/icons'
import { Col, Row, Select, Typography } from 'antd'
import HTMLReactParser from 'html-react-parser'
import { Chart } from './Chart'

const {Title, Text} = Typography

const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'] as const
export type timeT = typeof time[number]

export const CryptoDetails: FC = () => {
    const {coinId} = useParams()
    const [timePeriod, setTimePeriod] = useState<timeT>('7d')
    const {data, isFetching} = useGetCryptoDetailsQuery(coinId!)
    const cryptoDetails = data?.data?.coin
    const {data: coinHistory} = useGetChartHistoryQuery({coinId, timePeriod})

    const stats = [
        {
            title: 'USD price',
            value: `$ ${ cryptoDetails?.price && millify(+cryptoDetails?.price) }`,
            icon: <DollarCircleOutlined/>
        },
        {title: 'Rank', value: `№ ${ cryptoDetails?.rank }`, icon: <NumberOutlined/>},
        {
            title: '24h Volume',
            value: `$ ${ cryptoDetails?.['24hVolume'] && millify(+cryptoDetails?.['24hVolume']) }`,
            icon: <ThunderboltOutlined/>
        },
        {
            title: 'Market Cap',
            value: `$ ${ cryptoDetails?.marketCap && millify(+cryptoDetails?.marketCap) }`,
            icon: <DollarCircleOutlined/>
        },
        {
            title: 'All-time-high',
            value: `$ ${ cryptoDetails?.allTimeHigh?.price && millify(+cryptoDetails?.allTimeHigh?.price) }`,
            icon: <TrophyOutlined/>
        }
    ]
    const genericStats = [
        {title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined/>},
        {title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined/>},
        {
            title: 'Approved Supply',
            value: cryptoDetails?.supply?.confirmed ? <CheckOutlined/> : <StopOutlined/>,
            icon: <ExclamationCircleOutlined/>
        },
        {
            title: 'Total Supply',
            value: `$ ${ cryptoDetails?.supply?.total && millify(+cryptoDetails?.supply?.total) }`,
            icon: <ExclamationCircleOutlined/>
        },
        {
            title: 'Circulating Supply',
            value: `$ ${ cryptoDetails?.supply?.circulating && millify(+cryptoDetails?.supply?.circulating) }`,
            icon: <ExclamationCircleOutlined/>
        }
    ]

    if (isFetching) return <div>Loading...</div>
    return <>
        <Col className="wrapper">
            <Col className="text-center">
                <Title level={ 2 }>
                    { cryptoDetails?.name } stats
                </Title>
                <Title level={ 4 }>{ cryptoDetails?.name } Price in $USD. View detailed stats for a selected
                    period</Title>
                <Select placeholder="Select time period"
                        options={ time.map(i => ({value: i, label: i})) }
                        value={ timePeriod }
                        onChange={ value => setTimePeriod(value) }
                />
            </Col>
            <Chart coinName={ cryptoDetails!.name } currentPrice={ millify(+cryptoDetails!.price) }
                   coinHistory={ coinHistory! }/>

            {/*stats tables*/ }

            <Col className="flex justify-between">
                <Col className="w-1/5 mt-3">
                    <Title level={ 2 }>Basic { cryptoDetails?.name } statistics</Title>
                    { stats.map(({icon, title, value}) => (
                        <Col className="flex justify-between mt-2" key={ title }>
                            <Col className="relative">
                                <Col className="text-xl absolute -top-2">{ icon }</Col>
                                <Text className="text-base ml-8"> { title }</Text>
                            </Col>
                            <Text className="text-base">{ value }</Text>
                        </Col>
                    )) }
                    <Title level={ 2 } className="mt-4"> Other { cryptoDetails?.name } statistics</Title>
                    { genericStats.map(({icon, title, value}) => (

                        <Col className="flex justify-between mt-2" key={ title }>
                            <Col className="relative">
                                <Col className="text-xl absolute -top-2">{ icon }</Col>
                                <Text className="text-base ml-8"> { title }</Text>
                            </Col>
                            <Text className="text-base">{ value }</Text>
                        </Col>
                    )) }
                </Col>

                {/*links*/ }

                <Col className="mt-16 mr-8">
                    <Title level={ 3 } className='shadow-2xl p-5'>
                        { cryptoDetails?.links.map(i => (
                            <Row key={ i.url }>
                                <Title level={ 5 } className='text-base'>
                                    { i.type }:
                                </Title>
                                <a href={ i.url } target="_blank" rel="noreferrer noopener nofollower"
                                   className="block pl-2 m-1">{ i.name }</a>
                            </Row>
                        )) }
                    </Title>
                </Col>
            </Col>

            <Col>
                <Title level={ 2 } className='mt-5 text-center'>
                    What is { cryptoDetails?.name }
                </Title>
                <Col className='text-base p-2 parsed-html'>
                { HTMLReactParser(cryptoDetails!.description) }</Col>
            </Col>
        </Col>
    </>
}