import { FC } from 'react'
import { Col, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import { chartT } from '../api/cryptoApi.types'
import { Line } from 'react-chartjs-2'
import { CategoryScale, Chart as ChartJS, registerables } from 'chart.js'
import { fromUnixDate } from '../assets/helpers/helperFunctions'

ChartJS.register(CategoryScale, ...registerables)

export const Chart: FC<{ currentPrice: string, coinName: string, coinHistory: chartT }> = ({
                                                                                               currentPrice,
                                                                                               coinName,
                                                                                               coinHistory
                                                                                           }) => {

    const chartData = {
        labels: coinHistory?.data?.history?.map(i => fromUnixDate(i.timestamp)).reverse(),
        datasets: [
            {
                label: 'USD price',
                data: coinHistory?.data?.history?.map(i => i.price).reverse(),
                backgroundColor: '#0071bd',
                borderColor: '#71a9d3'
            }
        ]
    }

    return <>
        <Col className="text-center mt-2">
            <Title level={ 4 }>Curren { coinName } price is <span
                className="text-2xl text-red-400">${ currentPrice }</span></Title>
            <Title level={ 4 }>Period change: <span
                className={ +coinHistory?.data?.change > 0 ? 'text-green-500' : 'text-red-500' }>{ coinHistory?.data?.change }%</span></Title>
        </Col>
        <Line data={ chartData }></Line>
    </>
}