import { useState, useContext } from 'react'
import styles from './form.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { postLogin } from 'services/user'
import { Loader } from '@mantine/core'

import { UserDataContext, IUserDataContext } from 'provider/UserProvider'
import { IUserData } from 'interface'

const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [p_type, setPType] = useState(false)
    const [wait_res, setWaitRes] = useState(false)
    const { setUserData } = useContext(UserDataContext) as IUserDataContext
    const login = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        const form_data = new FormData(event.currentTarget)
        const form_value = Object.fromEntries(form_data.entries())
        try {
            setWaitRes(true)
            const res = await postLogin(form_value)
            setError('')
            localStorage.setItem('JWT', res.data.jwt)
            delete res.data.jwt
            if (res.status == 200) setUserData(res.data as IUserData)

            setWaitRes(false)
            return navigate('/')
        } catch (e: any) {
            setWaitRes(false)
            setError(typeof e === 'string' ? e : 'Сервис не доступен')
        }
    }
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={login}>
                <div>
                    <h2 className={styles.title}>Вход</h2>
                    <input autoComplete="off" required className={styles.form_input} type="text" placeholder="Почта" name="email" />
                    <label htmlFor="login_password_input" className={styles.pass_input_wrapper}>
                        <input autoComplete="off" id="login_password_input" required className={`${styles.form_input} ${styles.pass_input}`} type={p_type ? 'text' : 'password'} placeholder="Пароль" name="password" />
                        <div className={styles.view_password} onClick={() => setPType(!p_type)}>
                            {p_type ? <IconEye /> : <IconEyeOff />}
                        </div>
                    </label>
                </div>
                <div>
                    {error && <div className={styles.error_wrapper}>{error}</div>}
                    <button disabled={wait_res} type="submit" className={styles.submit_button}>
                        {wait_res ? <Loader color="white" size={'xs'} /> : 'Войти'}
                    </button>
                    <p className={styles.alternative}>
                        Нет аккаунта? <Link to={'/register'}>Регистрация</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}
export default Login
