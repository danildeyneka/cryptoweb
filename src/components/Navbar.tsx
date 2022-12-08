import { FC } from 'react'
import { Avatar, Menu, Typography } from 'antd'
import { Link } from 'react-router-dom'
import icon from '../assets/images/logo.jpg'
import { BulbOutlined, FundOutlined, HomeOutlined } from '@ant-design/icons'

export const Navbar: FC = () => {

    return <nav>
        <div>
            <Avatar src={ icon } size="large"/>
            <Typography.Title level={ 2 }>
                <Link to="/">Cryptoweb</Link>
            </Typography.Title>
        </div>
        <Menu>
            <Menu.Item icon={<HomeOutlined/>}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined/>}>
                <Link to="currencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined/>}>
                <Link to="news">News</Link>
            </Menu.Item>
        </Menu>
    </nav>
}