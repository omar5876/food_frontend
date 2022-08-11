export const validate = (input) => {
    let error = {}

    if(!input.name) error.name = 'Name is required'
    if(!input.summary) error.summary = 'Summary is required'
    if(!input.image) error.image = 'Image url is required'
    if(input.healthScore < 0) error.healthScore = 'It has to be greater than 0'

    return error
}