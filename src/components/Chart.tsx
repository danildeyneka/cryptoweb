import { FC } from 'react'
import { Col, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import { Line } from 'react-chartjs-2'
import { chartT } from '../api/cryptoApi.types'

export const Chart: FC<{currentPrice: number, coinName: string, coinHistory: chartT}> = ({currentPrice ,coinName, coinHistory}) => {

    // line chart docs
    return <>
        <Row>
            <Col>
                <Title level={2}>{coinName} Price Chart</Title>
                <Col>
                    <Title level={5}>{coinHistory?.data?.change}%</Title>
                    <Title level={5}>Curren {coinName} price {currentPrice}</Title>
                </Col>
            </Col>
        </Row>
        <Line data={}></Line>
    </>
}