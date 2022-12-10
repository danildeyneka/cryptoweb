import { FC } from 'react'
import { Avatar, Menu, Typography } from 'antd'
import { Link } from 'react-router-dom'
import icon from '../assets/images/logo.jpg'
import { BulbOutlined, FundOutlined, HomeOutlined } from '@ant-design/icons'

const menuItems = [
    {
        key: 'Home',
        label: <Link to='/'>Home</Link>,
        icon: <HomeOutlined/>
    },
    {
        key: 'Cryptocurrencies',
        label: <Link to='/cryptocurrencies'>Cryptocurrencies</Link>,
        icon: <FundOutlined/>
    },
    {
        key: 'News',
        label: <Link to='/news'>News</Link>,
        icon: <BulbOutlined/>
    },
]

export const Navbar: FC = () => {

    return <aside className='fixed h-full w-1/6 shadow-2xl bg-bg-dark'>
        <nav>
            <div className='pt-5 text-center'>
                <Avatar src={ icon } className='h-20 w-20'/>
                <Typography.Title level={ 2 } className='mt-2'>
                    <Link to="/"><span className='text-red-50'>Cryptoweb</span></Link>
                </Typography.Title>
            </div>
            <Menu items={menuItems} theme={'dark'}/>
        </nav>
    </aside>
}