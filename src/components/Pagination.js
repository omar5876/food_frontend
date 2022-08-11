import s from '../css/Pagination.module.css'

const Pagination = ({recipesPerPage, totalRecipes, actualPage, setActualPage}) => {
    let numberOfPages = []
    for(let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++){
        numberOfPages.push(i)
    }

    const prev  = () => {
        if(actualPage > 1) setActualPage(actualPage - 1)
    }

    const next = () => {
        if(actualPage < numberOfPages.length) setActualPage(actualPage + 1)
    }
    return(
        <div className={s.paginationContainer}>
            {actualPage > 1 && <div onClick={prev}>Prev</div>}
            {numberOfPages.length && numberOfPages.map((p, i) => {
                return (
                    <div key={i} onClick={() => setActualPage(p)}>
                        <span >{p}</span>
                    </div>
                )
            })}

            {actualPage < numberOfPages.length && <div onClick={next}>Next</div>}
        </div>
    )
}

export default Pagination