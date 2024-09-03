document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.target))
    const today = new Date()
    const birthdate = new Date(data.birthdate)
    const file = data.avatar
    let birthdateIsValid = true
    let fileIsValid = true
    let passwordValid = true

    console.info(data)

    if (data.password !== data.confirmPassword) {
        alert('La contraseña ingresada no coincide')
        passwordValid = false
    }

    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        alert('Por favor, selecciona una imagen de perfil válida')
        fileIsValid = false
    }

    if (birthdate > today) {
        alert('La fecha de nacimiento ingresada no es válida.')
        birthdateIsValid = false
    }
})