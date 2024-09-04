const inputs = document.querySelectorAll('.form-control')

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.target))
    console.info(data)
    
    if (formIsValid(data) === true) {
        e.target.submit()
    }
})

document.querySelector('.password-toggle-icon').addEventListener('click', ()=> {
    const inputPassword = document.querySelector('input[name="password"]')
    const icon = document.querySelector('i')

    if (inputPassword.type === 'password') {
        inputPassword.type = 'text'
        icon.classList.remove('fa-eye-slash')
        icon.classList.add('fa-eye')
    }
    else {
        inputPassword.type = 'password'
        icon.classList.remove('fa-eye')
        icon.classList.add('fa-eye-slash')
    }
})

document.querySelector('input[name="avatar"]').addEventListener('change', e => {
    const file = e.target.files[0]
    const img = document.querySelector('img')
    
    if (imageIsValid(file)) {
        const reader = new FileReader()

        reader.readAsDataURL(file)
        
        reader.onload = e => {
            img.src = e.target.result
        }

        img.classList.add('valid-image')
        img.classList.remove('invalid-image')
    } else {
        img.classList.add('invalid-image')
        img.classList.remove('valide-image')
        img.src = '../avatars/default-avatar.jpg'
    }
})

inputs.forEach(input => {
    input.addEventListener('change', () => {
        if (input.checkValidity() === true) {
            input.classList.remove('is-invalid')
            input.classList.add('is-valid')
        } else {
            input.classList.remove('is-valid')
            input.classList.add('is-invalid')
        }
    })
})

function formIsValid(data) {
    const today = new Date()
    const birthdate = new Date(data.birthdate)

    if (data.password !== data.confirmPassword) {
        alert('La contraseña ingresada no coincide')
        return false
    }
    
    if (!imageIsValid(data.avatar)) {
        return false
    }
    
    if (birthdate > today) {
        alert('La fecha de nacimiento ingresada no es válida.')
        return false
    }

    return true
}

function imageIsValid(file) {
    return !(file.type !== 'image/png' && file.type !== 'image/jpeg')
}