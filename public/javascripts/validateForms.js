(function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validated-form')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms) // Changing the form into an array
        .forEach(function (form) { // Looping over the array
            form.addEventListener('submit', function (event) { // Adding an EventListener to the form
                if (!form.checkValidity()) { // If the form is not valid
                    event.preventDefault() // Stoping the default behaviour of the form
                    event.stopPropagation() // Stoping the submiting process
                }
                form.classList.add('was-validated')
            }, false)
        })
})()