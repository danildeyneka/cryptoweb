import { FC, useEffect, useState } from 'react'
import { useGetCryptosQuery } from '../api/cryptoApi'
import { coinT } from '../api/cryptoApi.types'
import { Card, Col, Input, Row } from 'antd'
import { Link } from 'react-router-dom'
import millify from 'millify'
import { fromUnixDate } from '../assets/helpers/helperFunctions'

export const Cryptocurrencies: FC<{ simplified?: boolean }> = ({simplified}) => {
    const count = simplified ? 10 : 100
    const {data: cryptoData, isFetching} = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState<coinT[] | undefined>(undefined)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        setCryptos(cryptoData?.data?.coins)
        const filteredData = cryptoData?.data?.coins.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData)
    }, [searchTerm, cryptoData])

    if (isFetching) return <div>Loading...</div>
    if (!cryptos) return <div>No cryptos to show</div>
    return <>
        { !simplified && <div className="text-base my-4 w-64 mx-auto">
            <Input placeholder="Search crypto" onChange={ e => setSearchTerm(e.target.value) } value={ searchTerm }
                   className="text-center text-xl p-2"/>
        </div> }
        <Row gutter={ [22, 22] } className="">
            { cryptos?.map((i) => (<Col lg={ 6 } key={ i.uuid }>
                <Link to={ `/cryptocurrencies/${ i.uuid }` }>
                    <Card title={ `${ i.rank } - ${ i.name }` }
                          extra={ <img src={ i.iconUrl } alt={ i.uuid } className="w-10 h-10"/> } hoverable>
                        <Col className='flex justify-between'>
                            <Col>
                                <p>Price: ${ millify(+i.price) }</p>
                                <p>Market Cap: { millify(+i.marketCap) }</p>
                                <p>Daily Change: { millify(+i.change) }%</p>
                            </Col>
                            <Col>

                                <p>Created on</p>
                                <p>{fromUnixDate(i.listedAt)}</p>
                            </Col>
                        </Col>
                    </Card>
                </Link>
            </Col>)) }
        </Row>
    </>
}