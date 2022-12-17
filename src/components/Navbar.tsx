import { FC, useEffect, useState } from 'react'
import { Avatar, Button, Col, Menu, Typography } from 'antd'
import { Link } from 'react-router-dom'
import icon from '../assets/images/logo.jpg'
import { BulbOutlined, FundOutlined, HomeOutlined, MenuOutlined } from '@ant-design/icons'

const menuItems = [
    {
        key: 'Home',
        label: <Link to="/">Home</Link>,
        icon: <HomeOutlined/>
    },
    {
        key: 'Cryptocurrencies',
        label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
        icon: <FundOutlined/>
    },
    {
        key: 'News',
        label: <Link to="/news">News</Link>,
        icon: <BulbOutlined/>
    }
]

export const Navbar: FC = () => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState<number | null>(null)

    useEffect(() => {
        const resizeHandler = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', resizeHandler)
        return () => window.removeEventListener('resize', resizeHandler)
    }, [])

    useEffect(() => {
        if (window.innerWidth < 1024) setActiveMenu(false)
        else setActiveMenu(true)
    }, [screenSize])

    return <aside className="sticky h-52 w-full shadow-2xl bg-bg-dark z-10 lg:w-1/6 lg:h-full lg:fixed">
        <nav>
            <div className="pt-5 text-center">
                <Avatar src={ icon } className="h-20 w-20"/>
                <Typography.Title level={ 2 } className="mt-2">
                    <Link to="/"><span className="text-red-50">Cryptoweb</span></Link>
                </Typography.Title>
                { window.innerWidth < 1024 &&
                    <Button onClick={ () => setActiveMenu(prevState => !prevState) } className="text-white">
                        <Col className="-mt-1">
                            <MenuOutlined/>
                        </Col>
                    </Button> }
            </div>
            { activeMenu && <Menu items={ menuItems } theme={ 'dark' } className="-mt-5 lg:mt-0"
                                  onClick={ () => setActiveMenu(false) }/> }
        </nav>
    </aside>
}