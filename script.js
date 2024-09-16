$(document).ready(function() {
    // Alternar entre los formularios según la opción seleccionada
    $('#option-selector').on('change', function() {
        var selectedOption = $(this).val();
        if (selectedOption === 'rfc') {
            $('#rfc-form').show();
            $('#api-form').hide();
        } else {
            $('#rfc-form').hide();
            $('#api-form').show();
        }
    });

    // Función para generar RFC
    $('#generar-rfc').on('click', function() {
        var nombre = $('#nombre').val().toUpperCase();
        var apellidoPaterno = $('#apellidoPaterno').val().toUpperCase();
        var apellidoMaterno = $('#apellidoMaterno').val().toUpperCase();
        var fechaNacimiento = $('#fechaNacimiento').val().split('-');

        if (nombre && apellidoPaterno && apellidoMaterno && fechaNacimiento.length === 3) {
            var rfc = apellidoPaterno.slice(0, 2) + apellidoMaterno.slice(0, 1) + nombre.slice(0, 1) + fechaNacimiento[0].slice(2) + fechaNacimiento[1] + fechaNacimiento[2];
            $('#rfc-result').text('RFC Generado:  ' + rfc);
        } else {
            $('#rfc-result').text('Por favor, complete todos los campos.');
        }
    });

    // Función para consultar API con ID ingresado
    $('#cargar-usuario').on('click', function() {
        var userId = $('#user-id').val();

        if (userId === '') {
            alert('Por favor, ingrese un ID de usuario.');
            return;
        }

        $.get(`https://jsonplaceholder.typicode.com/users/${userId}`, function(data) {
            $('#user-info').empty();
            var userInfo = `
                <p><strong>Nombre:  </strong> ${data.name}</p>
                <p><strong>Email:  </strong> ${data.email}</p>
            `;
            $('#user-info').append(userInfo);
        }).fail(function() {
            $('#user-info').text('Error: Usuario no encontrado.');
        });
    });
});
