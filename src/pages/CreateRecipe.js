import s from '../css/CreateRecipe.module.css'
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getDiets } from '../redux/Actions'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { validate } from '../functions/functions'

const CreateRecipe = () => {
    let [objectStep, setObjectStep] = useState({number: 0, step: ''})
    let [input, setInput] = useState({name: '', summary: '', image: '', healthScore: 0, steps: [], diets: []})
    let [error, setError] = useState({})

    let diets = useSelector(state => state.getDiets)
    console.log(diets)

    let dispatch = useDispatch()

    let history = useHistory()

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleChangeObjectStep = (e) => {
        setObjectStep({
            ...objectStep,
            [e.target.name]: e.target.value
        })
    }

    const addStep = () => {
        
        let newStep = {number: objectStep.number, step: objectStep.step}
        if(!newStep.number || !newStep.step || !!input.steps.find(e => e.number === newStep.number)){
            alert('step is empty or it already exist')
        }else{

            setInput({
                ...input,
                steps: [...input.steps, newStep]
            })
            setObjectStep({number: 0, step: ''})
        }
    }

    const deleteStep = (number) => {
        setInput({
            ...input,
            steps: input.steps.filter(e => e.number !== number)
        })
    }

    const handleSelectDiet = (e) => {
        if(!input.diets.includes(e.target.value)){
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }
    }

    const deleteDiet = (name) => {
        setInput({
            ...input,
            diets: input.diets.filter(e => e !== name)
        })
    }

    const handleSubmit = (e) => {
            e.preventDefault()
            if(input.name && input.summary && input.image && !!input.diets.length && !!input.steps.length){

                axios.post('http://localhost:3001/recipes', input)
                .then(res => {
                    alert('Recipe Created')
                    setInput({name: '', summary: '', image: '', healthScore: 0, steps: [], diets: []})
                    history.push('/Home')
                })
                .catch(error => alert("It coudn't be created"))
    
            }else alert('Some fields are missing')
        
    }

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])
    
    return (
        <div className={s.createRecipeContainer}>
            <form >
                <label>Name</label>
                <input type={'text'} placeholder='write a name' required name='name' value={input.name} onChange={handleChange}/>
                {!!error.name&& <span className={s.dangerAlert}>{error.name}</span>}
                <label>Summary</label>
                <textarea type={'text'} placeholder='write a name' required name='summary' value={input.summary} onChange={handleChange}/>
                {!!error.summary&& <span className={s.dangerAlert}>{error.summary}</span>}
                <label>Image</label>
                <input type={'text'} placeholder='Put an url' required name='image' value={input.image} onChange={handleChange}/>
                {!!error.image&& <span className={s.dangerAlert}>{error.image}</span>}
                <label>Health Score</label>
                <input type={'number'} placeholder='Put a number' name='healthScore' min={0} value={input.healthScore} onChange={handleChange}/>
                {!!error.healthScore&& <span className={s.dangerAlert}>{error.healthScore}</span>}
                <label>Steps</label>
                    <div className={s.stepsContainer}>
                        <label>Number</label>
                        <input type={'number'} name='number' min={1} value={objectStep.number} onChange={ handleChangeObjectStep}/>
                        <label>Step</label>
                        <textarea type={'text'}  name='step' value={objectStep.step} onChange={handleChangeObjectStep}/>
                        <button type='button' onClick={addStep}>Add Step</button>
                        {!!input.steps.length &&
                        <div>
                            {input.steps.map((e, k) => {
                                return (
                                    <table key={k}>
                                        <tr>
                                            <th>Number</th>
                                            <td>{e.number}</td>
                                        </tr>
                                        <tr>
                                            <th>Step</th>
                                            <td>{e.step}</td>
                                            <button type='button' onClick={() => deleteStep(e.number)}>X</button>
                                        </tr>
                                        
                                    </table>
                                )
                            })}    
                        </div>}
                    </div>

                {!!diets.length && (
                    <>
                    <label>Diets</label>
                    <select onChange={handleSelectDiet}>
                        <option  disabled selected>Choose a Type of Diet</option>
                        {diets.map((e, k) => <option key={k} value={e.name}>{e.name}</option>)}
                    </select>
                    {
                        !!input.diets.length &&
                        <div className={s.choosenDiets}>
                            <div>Choosen Diets:</div>
                            {input.diets.map((e, k) => <div key={k}>{e}<button type={'button'}onClick={() => deleteDiet(e)}>X</button></div>)}
                        </div>
                    }

                    </>
                )}
                <input type='submit' value='Create Recipe' onClick={handleSubmit}/>

            </form>
        </div>
    )
}

export default CreateRecipe