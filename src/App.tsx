import { FC } from 'react'
import { Cryptocurrencies, CryptoDetails, Homepage, Navbar, News } from './components'
import { Layout } from 'antd'
import { Route, Routes } from 'react-router-dom'

export const App: FC = () => {

    return <>
        <Navbar/>
        <Layout className="ml-1/6 p-6">
            <Routes>
                <Route path="/" index element={ <Homepage/> }/>
                <Route path="cryptocurrencies" element={ <Cryptocurrencies/> }/>
                <Route path="cryptocurrencies/:coinId" element={ <CryptoDetails/> }/>
                <Route path="news" element={ <News/> }/>
                <Route path="*" element={ <div className="text-3xl text-center">no such path</div> }/>
            </Routes>
        </Layout>
    </>
}

export default App
