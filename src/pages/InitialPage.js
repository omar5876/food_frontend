import s from '../css/InitialPage.module.css'
import { Link } from "react-router-dom"

const InitialPage = () => {
    return (
        <div className={s.initialPageContainer}>
            <h2>Learn about cooking</h2>
            <Link className={s.initialPageButton} to={'/Home'}>
                <button>Enter</button>
            </Link>
        </div>
    )
}

export default InitialPage