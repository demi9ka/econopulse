import styles from './app.module.css'
import Header from './header/Header'

import { Routes, Route } from 'react-router-dom'
import Home from './home/Home'
import Register from 'components/register/Register'
import Login from 'components/login/Login'

const App = () => {
    return (
        <div className={styles.container}>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    )
}
export default App
