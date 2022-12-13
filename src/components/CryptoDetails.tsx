import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetCryptoDetailsQuery } from '../api/cryptoApi'
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

const {Title, Text} = Typography

const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'] as const
type timeT = typeof time[number]

export const CryptoDetails: FC = () => {
    const {coinId} = useParams()
    const [timePeriod, setTimePeriod] = useState<timeT>('7d')
    const {data} = useGetCryptoDetailsQuery(coinId!)
    const cryptoDetails = data?.data?.coin

    const stats = [
        {
            title: 'Price to USD',
            value: `$ ${ cryptoDetails?.price && millify(+cryptoDetails?.price) }`,
            icon: <DollarCircleOutlined/>
        },
        {title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined/>},
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
            title: 'All-time-high(daily avg.)',
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

    return <>
        <Col>
            <Col>
                <Title level={ 2 }>
                    { cryptoDetails?.name }
                </Title>
                <p>{ cryptoDetails?.name } Price in USD $. View detailed stats for a selected period</p>
                <Select placeholder="Select time period"
                        options={ time.map(i => ({value: i, label: i})) }
                        value={ timePeriod }
                        onChange={ value => setTimePeriod(value) }
                />
                {/*// <!-- chart -->*/ }
                <Col>
                    <Title level={ 2 }>{ cryptoDetails?.name } value statistics</Title>
                    <p>Overview { cryptoDetails?.name } stats</p>
                </Col>
                { stats.map(({icon, title, value}) => (
                    <Col className='flex justify-between align-middle' key={value}>
                        <Col>
                            <Text>{ icon }</Text>
                            <Text>{ title }</Text>
                        </Col>
                        <Text>{value}</Text>
                    </Col>
                )) }
            </Col>
        </Col>
    </>
}