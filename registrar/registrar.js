const inputs = document.querySelectorAll('.form-control')
const inputPassword = document.querySelector('input[name="password"]')

inputs.forEach(input => {
    input.addEventListener('change', e => {
        if (input.checkValidity() === true && (input.type === 'text' || input.type === 'email' || input.type === 'password')) {
            input.classList.remove('is-invalid')
            input.classList.add('is-valid')
        } else {
            input.classList.remove('is-valid')
            input.classList.add('is-invalid')
        }

        if (input.type === 'password') {
            passwordIsValid()
        }

        if (input.type === 'date') {
            birthdateIsValid()
        }

        if (input.type === 'file') {
            const file = e.target.files[0]
            imageIsValid(file)
        }
    })
})

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.target))
    console.info(data)
    
    if (formIsValid(data) === true) {
        alert('Registro exitoso')
        e.target.submit()
    }
})

document.querySelector('.password-toggle-icon').addEventListener('click', ()=> {
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

function formIsValid(data) {
    return (passwordIsValid() === true && imageIsValid(data.avatar) === true && birthdateIsValid() === true)
}

function imageIsValid(file) {
    const img = document.querySelector('img')
    const inputFile = document.querySelector('input[name="avatar"]')
    
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
        const reader = new FileReader()

        reader.readAsDataURL(file)
        
        reader.onload = e => {
            img.src = e.target.result
        }

        img.classList.add('valid-image')
        img.classList.remove('invalid-image')
        inputFile.classList.add('is-valid')
        inputFile.classList.remove('is-invalid')

        return true
    }
    else if (file.size === 0) { //No es obligatorio que el usuario suba una foto
        return true
    }

    img.classList.add('invalid-image')
    img.classList.remove('valid-image')
    inputFile.classList.add('is-invalid')
    inputFile.classList.remove('is-valid')
    img.src = '../avatars/default-avatar.jpg'

    return false
}

function passwordIsValid() {
    const eyeIcon = document.querySelector('.password-toggle-icon')
    const inputConfirmPassword = document.querySelector('input[name="confirm-password"]')
    eyeIcon.classList.add('move-icon')
    
    if (inputPassword.value !== inputConfirmPassword.value) {
        inputConfirmPassword.classList.remove('is-valid')
        inputConfirmPassword.classList.add('is-invalid')
        return false
    }
    
    inputConfirmPassword.classList.remove('is-invalid')
    inputConfirmPassword.classList.add('is-valid')
    return true
}

function birthdateIsValid() {
    const inputBirthdate = document.querySelector('input[type="date"]')
    const today = new Date()
    const birthdate = new Date(inputBirthdate.value)
    const monthDifference = today.getMonth() - birthdate.getMonth()
    const dayDifference = today.getDate() - birthdate.getDate()
    const MINIMUM_AGE = 18
    const HIGHEST_AGE_EVER = 115
    let age = today.getFullYear() - birthdate.getFullYear()

    console.log(birthdate)

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--
    }

    if (birthdate > today || age < MINIMUM_AGE || age > HIGHEST_AGE_EVER) {
        inputBirthdate.classList.remove('is-valid')
        inputBirthdate.classList.add('is-invalid')
        return false
    }

    inputBirthdate.classList.remove('is-invalid')
    inputBirthdate.classList.add('is-valid')
    return true
}