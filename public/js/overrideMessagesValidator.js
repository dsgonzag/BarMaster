jQuery.extend(jQuery.validator.messages, {
    required: "Campo requerido.",
    remote: "Please fix this field.",
    email: "Email no válido.",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Ingrese el mismo valor nuevamente.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Ingrese no mas de {0} caracteres."),
    minlength: jQuery.validator.format("Ingrese al menos {0} caracteres."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Seleccione {0} item.")
});
