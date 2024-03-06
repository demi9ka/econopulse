import styles from './footer.module.css'
const Footer = () => {
    return (
        <footer>
            <div className={styles.content}>
                <div className={styles.part}>
                    <div className={styles.logo}>
                        <img className={styles.logo} src="/logo.svg" alt="" />
                        <p>
                            Econopulse<span className={styles.prefix}>.ru</span>{' '}
                        </p>
                    </div>
                    <p className={styles.hyphen}>
                        Статистика и анализ <br />
                        экономических показателей
                    </p>
                </div>
                <p className={styles.sourse}>
                    Для построения графиков используются данные, полученные с сайтов{' '}
                    <a target="_blank" href="https://cbr.ru">
                        Центрального банка России
                    </a>
                    ,{' '}
                    <a target="_blank" href="https://rosstat.gov.ru">
                        Федеральной службы государственной статистики России
                    </a>{' '}
                    и{' '}
                    <a target="_blank" href="https://www.moex.com/">
                        Московской межбанковской валютной биржи
                    </a>
                    .
                </p>
            </div>
        </footer>
    )
}
export default Footer
