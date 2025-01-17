document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const mensajeExito = document.getElementById('mensaje-exito');
    const mensajeError = document.getElementById('mensaje-error');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Validación del formulario
            let isValid = true;
            const nombreInput = document.getElementById('nombre');
            const emailInput = document.getElementById('email');
            const mensajeInput = document.getElementById('mensaje');

            if (nombreInput.value.trim() === '') {
                nombreInput.classList.add('is-invalid');
                isValid = false;
            } else {
                nombreInput.classList.remove('is-invalid');
            }

            if (emailInput.value.trim() === '' || !/\S+@\S+\.\S+/.test(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
            }

            if (mensajeInput.value.trim() === '') {
                mensajeInput.classList.add('is-invalid');
                isValid = false;
            } else {
                mensajeInput.classList.remove('is-invalid');
            }

            if (!isValid) {
                return; // Detener el envío si el formulario no es válido
            }
            
            // Enviar el formulario usando EmailJS
            emailjs.sendForm('service_xqoudss', 'template_concm6h', this) 
                .then(function() {
                    console.log('SUCCESS!');
                    mensajeExito.style.display = 'block';
                    mensajeError.style.display = 'none';
                    form.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    mensajeExito.style.display = 'none';
                    mensajeError.style.display = 'block';
                });
        });
    }
});

/*  */

// Función para cargar las traducciones
async function cargarTraducciones(idioma) {
    try {
        // Guardar el idioma en localStorage
        localStorage.setItem('idioma', idioma);
        
        const response = await fetch('/js/idiomas.json'); // Ruta a tu archivo de traducciones
        const data = await response.json();

        // Actualizar el contenido de los elementos HTML
        for (const clave in data) {
            if (data.hasOwnProperty(clave)) {
                const elemento = document.getElementById(clave);
                if (elemento) {
                    elemento.textContent = data[clave][idioma];
                }
            }
        }

        // Actualizar el idioma actual en el dropdown
        document.getElementById('idiomaActual').textContent = idioma.toUpperCase();

        // Resaltar el idioma seleccionado
        const idiomasDropdown = document.querySelectorAll('.dropdown-item');
        idiomasDropdown.forEach(idiomaDropdown => {
            const i = idiomaDropdown.querySelector('i');
            if (idiomaDropdown.id === idioma) {
                i.classList.add('fa-check');
                i.classList.remove('fa-blank');
            } else {
                i.classList.remove('fa-check');
                i.classList.add('fa-blank');
            }
        });

    } catch (error) {
        console.error('Error al cargar las traducciones:', error);
    }
}

// Evento para cambiar el idioma
document.addEventListener('DOMContentLoaded', () => {
    // Añadir la clase fa-blank a los iconos de los idiomas
    const idiomasDropdown = document.querySelectorAll('.dropdown-item');
    idiomasDropdown.forEach(idiomaDropdown => {
        const i = idiomaDropdown.querySelector('i');
        i.classList.add('fa-blank');
    });

    // Cargar las traducciones al cargar la página
    cargarTraducciones(localStorage.getItem('idioma') || 'es'); // Obtener idioma de localStorage o usar 'es' por defecto

    // Event listeners para los botones de idioma
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const idiomaSeleccionado = item.id;
            cargarTraducciones(idiomaSeleccionado);
        });
    });

    // Aquí puedes agregar más código que se ejecutará al cargar la página
    // ...
});

// El resto de tu código JavaScript (validación de formulario, etc.)
// ...
