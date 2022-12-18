import { FC, useState } from 'react'
import { useGetNewsQuery } from '../api/newsApi'
import { Avatar, Card, Col, Row, Select, Typography } from 'antd'
import defaultImg from '../assets/images/defaultNewsImage.png'
import moment from 'moment'
import { useGetCryptosQuery } from '../api/cryptoApi'
import * as child_process from 'child_process'
import millify from 'millify'

export const News: FC<{ simplified?: boolean }> = ({simplified = false}) => {

    const count = simplified ? 6 : 12
    const [category, setCategory] = useState('Cryptocurrency')
    const {data: news, isFetching} = useGetNewsQuery({category, count})
    const {data} = useGetCryptosQuery(100)
    const selectValues = data?.data?.coins?.map(i => ({label: i.name, value: i.name}))
    selectValues?.unshift({label: 'All crypto news', value: 'Cryptocurrency'})

    if (isFetching) return <div>Loading...</div>
    return <>
        { !simplified && (
            <Select showSearch
                    placeholder="Select a Crypto"
                    defaultValue={ category }
                    onChange={ (value) => setCategory(value) }
                    options={ selectValues }
                    className="w-40 mx-auto mb-6"
            />
        ) }
        <Row gutter={ [24, 24] }>
            { news?.value?.map(i => (
                <Col xs={ 24 } sm={ 12 } lg={ 8 } key={ i.url }>
                    <Card hoverable className="h-72 relative">
                        <a href={ i.url } target="_blank" rel="nofollow noopener noreferrer">
                            <div className="flex justify-between">
                                <Typography.Title level={ 4 }
                                                  className="h-[88px] xxl:h-auto overflow-hidden">{ i.name }</Typography.Title>
                                <img src={ i.image?.thumbnail?.contentUrl || defaultImg }
                                     alt="news image"
                                     className="w-20 h-20 m-2"
                                />
                            </div>
                            <p className="h-28 overflow-hidden">
                                { i.description }
                            </p>
                            <div className="absolute bottom-4">
                                <Avatar src={ i.provider[0]?.image?.thumbnail?.contentUrl || defaultImg }
                                        alt="author avatar" className="w-8 h-8 mr-2"/>
                                <Typography.Text className="mt-1">{ i.provider[0]?.name }</Typography.Text>
                            </div>
                            <Typography.Text
                                className="absolute right-5 bottom-[10px] xl:bottom-[21px] xl:text-base text-xs block">
                                { moment(i.datePublished).startOf('seconds').fromNow() }</Typography.Text>
                        </a>
                    </Card>
                </Col>
            )) }
        </Row>
    </>
}