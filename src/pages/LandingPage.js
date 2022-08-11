
import s from '../css/LandingPage.module.css'

const LandingPage = ({children}) => {
    

    return (
        <div className={s.landingPageContainer } >
            <div className={s.childrenContainer}>
                {children}
            </div>
        </div>
    )
}

export default LandingPage