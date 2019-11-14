

/** TODO: Limpia url que pasar� el cifrado seleccionado y la entrada de clave * /
/ ** Esto permitira al usuario twittear su mensaje codificado, y permitir que otros
 * para hacer clic en el enlace para descifrar el mensaje sin tener que buscar el
 * cifrado o clave */


/**
 * @param str
 * @returns {Array|{index: number, input: string}|*}
 */
function isAlpha(str) {
    var regex = /[A-Za-z]/;
    return str.match(regex);
}


/**
 * Metodo que devuelve la posición alfabetica del caracter.
 * @param letter
 * @returns {*}
 */
function alphabetPosition(letter) {
    if (letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122) {
        return letter.charCodeAt(0) - 97;
    }
    else if (letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90) {
        return letter.charCodeAt(0) - 65;
    }
    else {
        return letter.charCodeAt(0);
    }
}


/**
 * Method to rotate the character
 * @param char
 * @param rot
 * @returns {string}
 */
function rotateCharacter(char, rot, encrypt) {

    // Posición del alfabeto basada en 0-25 (26 caracteres)
    var c = alphabetPosition(char);

    if (char == char.toUpperCase()) {
        // si está cifrado que añadir rotación
        if (encrypt == true) {
            return String.fromCharCode(((c + rot) % 26) + 65);
        } else {
            if (rot == rot && c <= (rot - 1)) {
                return String.fromCharCode(((c - rot) % 26) + 65 + 26);
            }
            else {
                return String.fromCharCode(((c - rot) % 26) + 65);
            }

        }

    }
    else if (char == char.toLowerCase()) {
        if (encrypt == true) {
            return String.fromCharCode(((c + rot) % 26) + 97);
        } else {
            if (rot == rot && c <= (rot - 1)) {
                return String.fromCharCode(((c - rot) % 26) + 97 + 26);
            }
            else {
                return String.fromCharCode(((c - rot) % 26) + 97);
            }

        }

    }
    else {
        return String.fromCharCode(c);
    }

}


/**
 * Método para cifrar / descifrar cifrado de sustitución
 * @param text
 * @param rot
 * @returns {string}
 */
function michaelcifrado(text, rot, encrypt) {
    var encryptedMessage = [];
    for (var i = 0; i < text.length; i++) {
        if (isAlpha(text[i])) {
            encryptedMessage.push(rotateCharacter(text[i], rot, encrypt));
        }
        else {
            encryptedMessage.push(text[i]);
        }
    }
    return encryptedMessage.join('');
}


/**
 * Método para cifrar / descifrar texto cifrado vigenere
 *
 * @param text
 * @param key
 * @returns {string}
 */
function vigenereCipher(text, key, encrypt) {
    var encryptedMessage = [];
    var idx = 0;
    var i = 0;

    // var keyString = text.replace(/[a-z]/gi, c => key[i++ % key.length]);  ES6
    var keyString = text.replace(/[a-z]/gi, function (c) {
        return c == ' ' ? c : key[i++ % key.length]
    }); // ES5
    // var keyString = text.replace(/[a-z]/gi, (a, b) => a == ' ' ? a : key[i++ % key.length]);

    while (idx < text.length) {
        if (isAlpha(text[idx])) {
            encryptedMessage.push(rotateCharacter(text[idx], alphabetPosition(keyString[idx]), encrypt));
        }
        else {
            encryptedMessage.push(text[idx])
        }
        idx++;
    }

    return encryptedMessage.join('');
}


/**
 * Método para ventanas modales
 */
function modals() {

    // Establezca la visualización en ninguno, lo que permite eventos de aparición gradual y de clic
    $('.modal').css('display', 'none');

    // En 'Acerca de' haga clic en la navegación
    $('#about').on('click', function () {
        $('#aboutModal').addClass('is-active').fadeIn(500);
        $('body').addClass('stop-scroll');
    });

    // En el fondo, haga clic en eliminar es clase activa + configurar pantalla
    $('.modal-background').on('click', function () {
        $('#aboutModal').removeClass('is-active');
        $('body').removeClass('stop-scroll');
        $('.modal').css('display', 'none');
    });

    // En el modo de cierre cercano, haga clic en eliminar la clase activa + mostrar pantalla
    $('.mod-close').on('click', function () {
        $('#aboutModal').removeClass('is-active');
        $('body').removeClass('stop-scroll');
        $('.modal').css('display', 'none');
    });

}


/**
 * Método para alertar a los usuarios con notificaciones.
 */
function alerts() {

    // Alerta de alerta
    // Al salir haga clic en eliminar alerta
    $('.del-warn').on('click', function () {
        $('#notify').css('visibility', 'hidden');
    });

    // En el enfoque del área de texto, agregue clase de animación a alerta de notificación
    $('#enText').on('focus', function () {
        $('#notify').addClass('fadeInLeft');
    });
}


/**
 * Método para imitar la escritura
 */
function typeOut() {

    var text = "Cifrar y descifrar Enviar mensajes ocultos........";
    // Matriz de velocidad
    var speedArr = [170, 180, 195, 200, 215];
    // Elige una velocidad al azar
    var rand = speedArr[Math.floor(Math.random() * speedArr.length)];
    //el texto se divide en letras
    $.each(text.split(''), function (i, letter) {

        //Añadimos rand*i ms delay a cada letra.
        setTimeout(function () {

            //Añadimos la letra al texto div.
            $('#texttype').html($('#texttype').html() + letter);

        }, rand * i);
    });

}

/**
 * Método para imitar el cursor blink
 */
function cursorBlink() {

    // Establezca el tiempo de espera en un 1.2s
    setTimeout(function () {

        // Fade cursor hacia afuera y hacia atrás
        $('#cursor').fadeOut('fast').fadeIn('fast');

    }, 500);

}

/**
 * Método para desplazarse hasta el punto en la página
 */
function scroll() {

    // En el botón de navegación "Encrypt" haga clic
    $('.nav-encrypt-btn').on('click', function () {

        // Desplazar la animación a la sección de entrada
        $("html,body").animate({
            scrollTop: 200
        }, 600);


        // Destella la sección de entrada.
        $('#encrypt-sec').fadeTo(1000, 0.25, function () {
            $(this).fadeTo(800, 1);
        });

    });
}

/**
 * Método para comprobar si el tamaño de la pantalla ha cambiado
 */
function screenChange() {
    if ($(window).width() < 769) {

    }
    else {

    }
}


/**
 * TODO: Bloque de teclas Vigenere - rotación (cadena y clave de rotación)
 */

/**
 * Método para mostrar texto = clave
 */
function keyBlock() {
    $('#vig-section').hide();

    var abcplain = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';

    $('.abc-plaintext').append(abcplain.split('').join(' '));
    $('.abc-cipher').append(abcplain.split('').join(' '));


    var plainkey = document.getElementById('plain-key-title');
    var cipherkey = document.getElementById('cipher-key-title');

    var c = ''; // variable para mantener la clave de cifrado de retorno


    var clickCounter = 0;

    // En Elegir Cifrado desplegable cambiar
    $('#cipherSelect').on('change', function () {
        // Mostrar clave Seleccionar DD
        $(this).removeClass('is-danger');
        $('.h-select').css("visibility", "hidden");
        $('.fa-warning').css('visibility', 'hidden');

        // $('#key-col').attr('style', 'display: block!important');

        $('#plain-key-title').html("Substitution Key:");
        $('#cipher-key-title').html("Ciphertext:");

        // $('#enText').val(''); // Área de texto de texto
        $('#msgdisplay').val(''); // Cifrar texto
        var value = $(this).val();

        $('.abc-cipher').text(''); // Borrar el texto actual en el bloque de clave de cifrado


        var sub1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        var sub2 = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
        var subArray = sub1.concat(sub2);

        var randSub = subArray[Math.floor(Math.random() * subArray.length)];

        if (value == "caesar") {
            $('#vig-section').fadeOut('fast').hide();
            $('#vigenere-input').hide('fast');

            $("#sub-section").fadeIn('slow').show('slow');

            $('#key-col').show('slow');

            $('#subSelect').val('3').prop('selected', true);

            plainkey.append('Plaintext');
            cipherkey.append('Caesar Cipher / Key-' + $('#subSelect').val());

            c = keyChange(abcplain, $('#subSelect').val());
            $('.abc-cipher').append(c);

        }
        else if (value === "rot13") {
            $('#vig-section').fadeOut('fast').hide();
            $('#vigenere-input').hide('fast');

            $("#sub-section").fadeIn('slow').show('slow');

            $('#key-col').show('slow');

            $('#subSelect').val('13').prop('selected', true);

            plainkey.append('Plaintext');
            cipherkey.append('ROT' + $('#subSelect').val());

            c = keyChange(abcplain, $('#subSelect').val());
            $('.abc-cipher').append(c);

        }
        else if (value === "substitution") {
            $('#vig-section').fadeOut('fast').hide();
            $('#vigenere-input').hide('fast');

            $("#sub-section").fadeIn('slow').show('slow');

            $('#key-col').show('slow');

            $('#subSelect').val(randSub).prop('selected', true)

            plainkey.append('Plaintext');
            cipherkey.append('Key-' + randSub);

            c = keyChange(abcplain, randSub);
            $('.abc-cipher').append(c);

        }
        else if (value === "vigenere") {
            $("#sub-section").fadeOut('fast').hide();

            // Crea dinámicamente la tabla Vigenere.
            if (clickCounter <= 0) {
                makeTable();
                clickCounter++;
            }

            $('#vig-section').fadeIn('slow').show();

            $('#key-col').hide('fast');

            $('#vigenere-input').show('slow');

            document.getElementById('vigenereKey').value = "";

            plainkey.append('Plaintext');

            $('#vigenereKey').removeClass('is-danger');

            // advertencia de texto vigenere
            $('.v-text').css('visibility', 'hidden');
            // icono de advertencia
            $('.v-warn').css('visibility', 'hidden');

        }

    });


    // Cambio de clave de sustitución
    $('#subSelect').on('change', function () {

        $('#plain-key-title').html("Substitution Key:");
        $('#cipher-key-title').html("Ciphertext:");

        var value = $(this).val();

        $('.abc-cipher').text(''); // Borrar el texto actual en el bloque de clave de cifrado

        if (value === '3') {

            $('#cipherSelect').val('caesar').prop('selected', true);

            plainkey.append('Plaintext');
            cipherkey.append('Caesar Cipher / Key-' + value);

            c = keyChange(abcplain, value);
            $('.abc-cipher').append(c);


        }
        else if (value === '13') {

            $('#cipherSelect').val('rot13').prop('selected', true);

            plainkey.append('Plaintext');
            cipherkey.append('ROT' + value);

            c = keyChange(abcplain, value);
            $('.abc-cipher').append(c);

        }
        else if (value >= '1' || value < '3' || value > '3' || value <= '12') {
            $('#cipherSelect').val('substitution').prop('selected', true);

            plainkey.append('Plaintext');
            cipherkey.append('Key-' + value);

            c = keyChange(abcplain, value);
            $('.abc-cipher').append(c);

        }
    });

    var timer;
    var previousVal = $('#vigenereKey').val();
    $('#vigenereKey').keyup(function () {
        var currentVal = $(this).val();
        //$('.abc-cipher').text(''); // Borrar el texto actual en el bloque de clave de cifrado
        $('#cipher-key-title').html("Ciphertext:");

        clearTimeout(timer);
        timer = setTimeout(function () {
            if (currentVal != previousVal) {
                cipherkey.append('Vigenere Cipher / Key-' + currentVal);

                currentVal = currentVal.replace(/\s/g, ''); // eliminar espacios en blanco para permitir múltiples palabras
                c = vigKeyBlock(abcplain, currentVal);

                $('.abc-cipher').append(c);
            }
        }, 500);

    });

}

// TODO: Arreglar la visualización de la tecla vigenere desde "ABCDEF" hasta el comienzo real de la cadena ingresada por el usuario - hasta 24 caracteres ...
/**
 * Método para cambiar la visualización de teclas para la sustitución
 *
 * @param abc
 * @param idx
 * @returns {string}
 */
function keyChange(abc, idx) {
    var answer = abc.slice(idx) + abc.slice(0, idx);
    return answer.split('').join(' ');
}


/**
 * Método para cambiar la visualización de teclas para la sustitución
 *
 * @param abc
 * @param vigKey
 * @returns {string}
 */
function vigKeyBlock(abc, vigKey) {
    var idx = 0;
    var i = 0;
    var keyblock = [];

    vigKey = vigKey.toUpperCase();

    var keyString = abc.replace(/[a-z]/gi, function (c) {
        return c == '' ? c : vigKey[i++ % vigKey.length]
    }); // ES5


    while (idx < abc.length) {
        keyblock.push(keyString[idx])
        idx++;

    }

    // el tipo de bloque de teclado es objeto - establecido en cadena
    var newKey = String(keyblock);

    return newKey.split('').join('').replace(/,/g, ' ');

}


/**
 *Método para la animación de la barra de progreso
 */
function loader() {

    var progress = document.getElementById("progbar");

    progress.style.display = "block";

    var width = 10;
    var id = setInterval(frame, 1);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
            progress.style.width = 0;
        } else {
            width++;
            progress.style.width = width + '%';
        }
    }

}


/**
 * Método para comprobar si la cadena es todas las letras
 *
 * @param str
 * @returns {boolean}
 */
function allLetters(str) {
    str = str.replace(/\s/g, '');
    var letters = /^[A-Za-z]+$/g;
    if (str.match(letters)) {
        return true;
    }
}


/**
 * Método para crear desplegable de números 1-25
 */
function createDropDown() {
    var openOption = '<option';
    var valueOpen = ' value="';
    var valueClose = '">';
    var closeOption = '</option>';
    var optionList1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
    var optionList2 = ["14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"];

    var options = optionList1.concat(optionList2);

    $('#subSelect').each(function () {
        for (key in options) {
            if (options.hasOwnProperty(key)) {
                $(this).append(openOption + valueOpen + options[key] + valueClose + options[key] + closeOption);
            }
        }
    });
}


/**
 * Método para crear dinámicamente la tabla Vigenere
 */
function makeTable() {
    var abcArray = [];
    abcArray.push([' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
    abcArray.push(['A', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
    abcArray.push(['B', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A']);
    abcArray.push(['C', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B']);
    abcArray.push(['D', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C']);
    abcArray.push(['E', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D']);
    abcArray.push(['F', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E']);
    abcArray.push(['G', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F']);
    abcArray.push(['H', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G']);
    abcArray.push(['I', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    abcArray.push(['J', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);
    abcArray.push(['K', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']);
    abcArray.push(['L', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']);
    abcArray.push(['M', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']);
    abcArray.push(['N', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']);
    abcArray.push(['Ñ', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']);
    abcArray.push(['O', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ']);
    abcArray.push(['P', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O']);
    abcArray.push(['Q', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P']);
    abcArray.push(['R', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q']);
    abcArray.push(['S', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R']);
    abcArray.push(['T', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S']);
    abcArray.push(['U', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T']);
    abcArray.push(['V', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U']);
    abcArray.push(['W', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V']);
    abcArray.push(['X', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']);
    abcArray.push(['Y', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X']);
    abcArray.push(['Z', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y']);

    var table = document.createElement('table');
    table.className = 'center-table';

    var columnCount = abcArray[0].length;

    var row = table.insertRow(-1);

    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement('td');
        headerCell.innerHTML = abcArray[0][i];
        row.appendChild(headerCell);
    }


    for (var j = 1; j < abcArray.length; j++) {
        row = table.insertRow(-1);
        for (var k = 0; k < columnCount; k++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = abcArray[j][k];
        }
    }

    var divTable = document.getElementById('tableresult');
    //divTable.innerHTML = "";
    divTable.appendChild(table);

}


/**
 *  Método para mostrar el nuevo encabezado cada n segundos
 */
function recurseHeader() {
    var obj = {
        "sub": [
            {
                title: "Cifrado de sustitución",
                description: "Un cifrado de sustitución es un método para codificar [sustituir] cada carácter de texto simple en un carácter de texto cifrado"
            }
        ],
        //"vig": [
          ///  {
             //   title: "Vigenère Cifrado",
               /// description: "El cifrado Vigenère es un método de codificación de texto plano alfabético mediante el uso de una serie de cifrados de sustitución." +
                //" basado en las letras de una palabra clave. Es una forma de sustitución polialfabética."
           // }
        //]

    };

    var objKeys = Object.keys(obj);
    var numOfKeys = Object.keys(obj).length;
    var index = 0;

    setInterval(function() {
        //$('#intervalDiv').text(obj[objKeys[index]][0].title + " " + obj[objKeys[index]][0].description);

        $("#title, #description").fadeOut(400, function () {
            $('#title').text(obj[objKeys[index]][0].title).fadeIn(400);
            $('#description').text(obj[objKeys[index]][0].description).fadeIn(400);
        });
        index = (index + 1) % numOfKeys;
    }, 16000); // Cada 16 segundos se desvanece el texto y se desvanece en el nuevo texto
}

$(document).ready(function () {

    var arr = ["#f00", "#ff0", "#f0f", "#f66"];


    (function recurse(counter) {
        // obtener el color
        var color = arr[counter];
        // animate it
        $('#testInterval').delay('1200').animate({
            backgroundColor: color
        }, 600);
        // borra el valor para ahorrar memoria
        delete arr[counter];
        //agrega el valor al final de la matriz
        arr.push(color);
        // ejecútalo de nuevo para el siguiente número
        setTimeout(function() {
            recurse(counter + 1);
        }, 200);
// Comience por el primer número.
    })(0);

    recurseHeader();

    /** Nav drop Down toggle */

    var toggle = $('.nav-toggle');
    var menu = $('#nav-menu');

    $(toggle).on('click', function (e) {
        e.stopPropagation();
        $(this).toggleClass('is-active');
        menu.toggleClass('is-active');
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.nav').length) {
            if (menu.is(":visible") && menu.hasClass('is-active')) {
                $(menu).toggleClass('is-active');
                $(toggle).toggleClass('is-active');
            }
        }
    });
    /** End Drop Down Nav functionality **/


    // Crea dinámicamente las opciones de selección de dd.
    createDropDown();

    setTimeout(function () {
        typeOut();
    }, 1000);

    setTimeout(function () {
        setInterval(cursorBlink, 1750);
    }, 2750);

    $('#progbar').hide();


    scroll();    // Scroll animation function
    alerts();    // Alert Function
    modals();    // Modal Function
    keyBlock();  // Key Block Change function - changes keys grid
    screenChange(); // Screen size change

    // On text area focus add animation class to notifcation alert
    $('#enText').on('focus', function () {
        $('#notify').addClass('flash');
    });


    // in text area - on change validate whether anything has been entered by the user
    $('#enText').keyup(function () {
        if ($(this) > '0') {
            $(this).removeClass('is-danger');
            // Advertencia de texto
            $('.h-text').css('visibility', 'hidden');
            // Advertencia de icono de texto
            $('.t-warn').css('visibility', 'hidden');
        }
    });

    // TODO On keyup si todavía hay números en la entrada guarde mensajes de advertencia / error
    $('#vigenereKey').keyup(function () {
        if ($(this) > '0' || ($(this) > '0' && allLetters($(this).val()))) {
            $(this).removeClass('is-danger');
            // vigenere Advertencia de texto
            $('.v-text').css('visibility', 'hidden');
            // icono de advertencia
            $('.v-warn').css('visibility', 'hidden');
        }
    });

    // Text
    var s = document.getElementById('enText');

    // Textarea para mostrar mensajes cifrados / descifrados
    var textDisplayMsg = document.getElementById('msgdisplay');


    $('#encryptMessage').on('click', function () {
        var encrypt = true;

        // Comprueba que el dato de cifrado esté seleccionado
        if (document.getElementById('cipherSelect').value === "none") {
            var cipherDDL = $('#cipherSelect');
            // Añadir clase borde rojo
            cipherDDL.addClass('is-danger');
            // Select DD Advertencia de texto
            $('.h-select').css("visibility", "visible");
            // Select DD icono de advertencia
            $('.s-warn').css('visibility', 'visible');
        }
        else if (document.getElementById('cipherSelect').value === 'vigenere' && document.getElementById('vigenereKey').value.length <= 0) {
            document.getElementById('v-err-text').innerHTML = "You must enter a key <i class='fa fa-warning v-warn'></i>";

            // vigenere input warning
            $('.v-text').css('visibility', 'visible');
            // icono de advertencia
            $('.v-warn').css('visibility', 'visible');
            // Add danger class to input field
            $('#vigenereKey').addClass('is-danger');


        } else if (document.getElementById('cipherSelect').value === 'vigenere' && document.getElementById('vigenereKey').value.length > 0 && !allLetters(document.getElementById('vigenereKey').value)) {
            //alert("working");
            document.getElementById('v-err-text').innerHTML = "You must enter only letters <i class='fa fa-warning v-warn'></i>";

            // vigenere input warning
            $('.v-text').css('visibility', 'visible');
            // icono de advertencia
            $('.v-warn').css('visibility', 'visible');
            // Add danger class to input field
            $('#vigenereKey').addClass('is-danger');
        }
        // Checks to make sure textarea has text
        else if (document.getElementById('enText').value < '0') {
            // alert("Text area is empty!");
            var txtArea = $('#enText');
            // Añadir clase borde rojo
            txtArea.addClass('is-danger');
            // Advertencia de texto
            $('.h-text').css('visibility', 'visible');
            // Advertencia de icono de texto
            $('.t-warn').css('visibility', 'visible');

        }
        // Si textarea tiene texto do ....
        else if (document.getElementById('enText') >= '1') {
            var cipherSelected = document.getElementById('cipherSelect').value;

            if (cipherSelected == 'caesar' || cipherSelected == 'substitution' || cipherSelected == 'rot13') {
                loader();
                textDisplayMsg.value = michaelcifrado(document.getElementById('enText').value, parseInt(document.getElementById('subSelect').value), encrypt);

            } else if (cipherSelected == 'vigenere') {
                loader();
                var vkey = document.getElementById('vigenereKey').value;
                vkey = vkey.replace(/\s/g, '');

                textDisplayMsg.value = vigenereCipher(document.getElementById('enText').value, vkey, encrypt);
            }

        }


        // TODO: Si el usuario ingresa texto antes de seleccionar un cifrado, mantenga el texto en área de texto en lugar de borrar
        // TODO: Usar contador para detener la eliminación de la rotación de sustitución y los despliegues de cifrado si el usuario no ha ejecutado el programa

    });


    $('#decryptMessage').on('click', function () {
        var encrypt = false;

        // Comprueba que el dato de cifrado esté seleccionado
        if (document.getElementById('cipherSelect').value === "none") {
            var cipherDDL = $('#cipherSelect');
            // Añadir clase borde rojo
            cipherDDL.addClass('is-danger');
            // Seleccione la advertencia de texto DD
            $('.h-select').css("visibility", "visible");
            // Seleccione el icono de advertencia de DD
            $('.s-warn').css('visibility', 'visible');
        }
        // Comprueba que textarea tenga texto.
        else if (document.getElementById('enText').value < '0') {
            // alerta ("¡Textarea está vacía!");
            var txtArea = $('#enText');
            // Añadir clase borde rojo
            txtArea.addClass('is-danger');
            // Advertencia de texto
            $('.h-text').css('visibility', 'visible');
            // Advertencia de icono de texto
            $('.t-warn').css('visibility', 'visible');

        }
        // Si textarea tiene texto do....
        else if (document.getElementById('enText') >= '1') {
            var cipherSelected = document.getElementById('cipherSelect').value;

            if (cipherSelected == 'caesar' || cipherSelected == 'substitution' || cipherSelected == 'rot13') {
                loader();
                textDisplayMsg.value = michaelcifrado(document.getElementById('enText').value, parseInt(document.getElementById('subSelect').value), encrypt);

            } else if (cipherSelected == 'vigenere') {
                loader();
                var vkey = document.getElementById('vigenereKey').value;
                vkey = vkey.replace(/\s/g, '');
                textDisplayMsg.value = vigenereCipher(document.getElementById('enText').value, vkey, encrypt);


            }
        }

// TODO: Si el usuario ingresa texto antes de seleccionar un cifrado, mantenga el texto en área de texto en lugar de borrar
// TODO: Usar contador para detener la eliminación de la rotación de sustitución y los despliegues de cifrado si el usuario no ha ejecutado el programa


    });


    // Al cancelar, haga clic en - borrar todos los elementos seleccionados + textarea
    $('#clearCancel').on('click', function () {
        $('#subSelect').val('none');
        $('#cipherSelect').val('none');
        $('#enText').val(''); // Borrar el texto actual en el bloque de clave de cifrado
        $('#msgdisplay').val(''); // borra el campo de visualización del mensaje cifrado / descifrado
        $('#vigenereKey').val('');
    });


});