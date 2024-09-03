document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.target))
    console.info(data)
    
    if (formIsValid(data) === true) {
        e.target.submit()
    }
})

function formIsValid(data) {
    const today = new Date()
    const birthdate = new Date(data.birthdate)
    const file = data.avatar

    if (data.password !== data.confirmPassword) {
        alert('La contraseña ingresada no coincide')
        return false
    }
    
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        alert('Por favor, selecciona una imagen de perfil válida')
        return false
    }
    
    if (birthdate > today) {
        alert('La fecha de nacimiento ingresada no es válida.')
        return false
    }

    return true
}