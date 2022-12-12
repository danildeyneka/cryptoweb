import { FC, useState } from 'react'
import { useGetNewsQuery } from '../api/newsApi'
import { Avatar, Card, Col, Row, Select, Typography } from 'antd'
import defaultImg from '../assets/images/defaultNewsImage.png'
import moment from 'moment'

export const News: FC<{ simplified?: boolean }> = ({simplified = false}) => {

    const count = simplified ? 6 : 12
    const {data: news, isFetching} = useGetNewsQuery({category: 'Cryptocurrency', count})
    const [category, setCategory] = useState('Cryptocurrency')

    if (isFetching) return <div>Loading...</div>
    return <>
        { !simplified && (
            <Col span={ 24 }>
                <Select showSearch
                        placeholder="Select a Crypto" optionFilterProp="children"
                        onChange={ () => console.log('das') }
                        filterOption={ (input, option) => option!.children.toLowerCase().indexOf(input.toLowerCase()) }>
                    <Option value='Cryptocurrency'>Cryptocurrency</Option>
                </Select>
            </Col>
        ) }
        <Row gutter={ [24, 24] }>
            { news?.value.map(i => (
                <Col xs={ 24 } sm={ 12 } lg={ 8 } key={ i.datePublished.toString() }>
                    <Card hoverable className="h-72 relative">
                        <a href={ i.url } target="_blank" rel="nofollow noopener noreferrer">
                            <div className="flex justify-between">
                                <Typography.Title level={ 4 }>{ i.name }</Typography.Title>
                                <img src={ i.image?.thumbnail?.contentUrl || defaultImg }
                                     alt="news image"
                                     className="w-20 h-20 m-2"
                                />
                            </div>
                            <p className="">
                                { i.description.length > 100
                                    ? `${ i.description.substring(0, 200) } ...`
                                    : i.description }
                            </p>
                            <div className="flex justify-between absolute bottom-3">
                                <Avatar src={ i.provider[0]?.image?.thumbnail?.contentUrl || defaultImg }
                                        alt="author avatar" className="w-8 h-8 mr-2"/>
                                <Typography.Text>{ i.provider[0]?.name }</Typography.Text>
                            </div>
                            <Typography.Text className="absolute right-5 bottom-4">
                                { moment(i.datePublished).startOf('seconds').fromNow() }</Typography.Text>
                        </a>
                    </Card>
                </Col>
            )) }
        </Row>
    </>
}