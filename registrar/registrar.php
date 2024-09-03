<?php
    if ($_POST) {
        $email = $_POST['email'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $role = $_POST['role'];
        $fullname = $_POST['fullname'];
        $birthdate = $_POST['birthdate'];
        $gender = $_POST['gender'];
        $avatar = $_FILES['avatar']['name'];

        echo '<h1>Hola '.$fullname.'</h1>';
        echo '<p>Nombre de usuario: '.$username.'</p>';
        echo '<p>Contraseña: '.$password.'</p>';
        echo '<p>Rol: '.$role.'</p>';
        echo '<p>Foto de perfil: '.$avatar.'</p>';
        echo '<p>Fecha de nacimineto: '.$birthdate.'</p>';
        echo '<p>Sexo: '.$gender.'</p>';
    }
?>