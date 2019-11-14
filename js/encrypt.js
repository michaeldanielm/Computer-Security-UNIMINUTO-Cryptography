/**
 * Página de prueba para cifrar descifrars
 */


/**
 * @param str
 * @returns {Array|{index: number, input: string}|*}
 */
function isAlpha(str) {
    var regex = /[A-Za-z]/;
    return str.match(regex);
}


/**
 * Método que devuelve la posición alfabética del carácter.
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
 * Método para rotar el carácter.
 * @param char
 * @param rot
 * @returns {string}
 */
function rotateCharacter(char, rot, encrypt) {

    // Posición alfabética basada en 0-25 (26 caracteres)
    var c = alphabetPosition(char);

    if (char == char.toUpperCase()) {
        // Si encripta entonces agrega rotación
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

console.log("key 1");
console.log(michaelcifrado("abcdefghijklmnñopqrstuvwxyz", 1, true));
console.log("Descifrar....");
console.log(michaelcifrado("bcdefghijklmnñopqrstuvwxyza", 1, false));

console.log("");

console.log("key 2");
console.log(michaelcifrado("abcdefghijklmnñpqrstuvwxyz", 2, true));
console.log("Descifrar....");
console.log(michaelcifrado("cdefghijklmnñopqrstuvwxyzab", 2, false));

console.log("");

console.log("key 3");
console.log(michaelcifrado("abcdefghijklmnñopqrstuvwxyz", 3, true));
console.log("Descifrar....");
console.log(michaelcifrado("defghijklmnñopqrstuvwxyzabc", 3, false));

console.log("");

console.log("key 4");
console.log(michaelcifrado("abcdefghijklmñnopqrstuvwxyz", 4, true));
console.log("Descifrar....");
console.log(michaelcifrado("efghijklmnñopqrstuvwxyzabcd", 4, false));

console.log("");

console.log("key 5");
console.log(michaelcifrado("abcdefghijklmnñopqrstuvwxyz", 5, true));
console.log("Descifrar....");
console.log(michaelcifrado("fghijklmnñopqrstuvwxyzabcde", 5, false));

console.log("");

console.log("key 6");
console.log(michaelcifrado("abcdefghijklmnñopqrstuvwxyz", 6, true));
console.log("Descifrar....");
console.log(michaelcifrado("ghijklmnñopqrstuvwxyzabcdef", 6, false));


console.log("");

console.log("key 7");
console.log(michaelcifrado("abcdefghijklmnñopqrstuvwxyz", 7, true));
console.log("Descifrar....");
console.log(michaelcifrado("hijklmnñopqrstuvwxyzabcdefg", 7, false));

console.log("");

console.log("key 8");
console.log(michaelcifrado("abcdefghijklmnñopqrstuvwxyz", 8, true));
console.log("Descifrar....");
console.log(michaelcifrado("ijklmnñopqrstuvwxyzabcdefgh", 8, false));

console.log("");

console.log("key 9");
console.log(michaelcifrado("abcdefghijklmnñopqrstuvwxyz", 9, true));
console.log("Descifrar....");
console.log(michaelcifrado("jklmnñopqrstuvwxyzabcdefghi", 9, false));

console.log("");

console.log("key 10");
console.log(michaelcifrado("abcdefghijklmnñopqrstuvwxyz", 10, true));
console.log("Descifrar....");
console.log(michaelcifrado("klmnñopqrstuvwxyzabcdefghij", 10, false));

console.log("");

console.log("key 11");
console.log(michaelcifrado("abcdefghijklmnñopqrstuvwxyz", 11, true));
console.log("Descifrar....");
console.log(michaelcifrado("lmnñopqrstuvwxyzabcdefghijk", 11, false));

console.log("");

console.log("key 12");
console.log(michaelcifrado("abcdefghijklmnñopqrstuvwxyz", 12, true));
console.log("Descifrar....");
console.log(michaelcifrado("mnñopqrstuvwxyzabcdefghijkl", 12, false));

console.log("");

console.log("key 13");
console.log(michaelcifrado("abcdefghijklmnñopqrstuvwxyz", 13, true));
console.log("Descifrar....");
console.log(michaelcifrado("nñopqrstuvwxyzabcdefghijklm", 13, false));

console.log("");

console.log("key 14");
console.log(michaelcifrado("abcdefghijklmnñopqrstuvwxyz", 14, true));
console.log("Descifrar....");
console.log(michaelcifrado("nñopqrstuvwxyzabcdefghijklm", 14, false));

console.log("");
console.log("");
console.log("");
console.log("");
console.log("");
console.log("");

console.log("key 1");
console.log(michaelcifrado("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", 1, true));
console.log("Descifrar....");
console.log(michaelcifrado("BCDEFGHIJKLMNÑOPQRSTUVWXYZA", 1, false));

console.log("");

console.log("key 2");
console.log(michaelcifrado("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", 2, true));
console.log("Descifrar....");
console.log(michaelcifrado("CDEFGHIJKLMNÑOPQRSTUVWXYZAB", 2, false));

console.log("");

console.log("key 3");
console.log(michaelcifrado("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", 3, true));
console.log("Descifrar....");
console.log(michaelcifrado("DEFGHIJKLMNÑOPQRSTUVWXYZABC", 3, false));

console.log("");

console.log("key 4");
console.log(michaelcifrado("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", 4, true));
console.log("Descifrar....");
console.log(michaelcifrado("EFGHIJKLMNÑOPQRSTUVWXYZABCD", 4, false));

console.log("");

console.log("key 5");
console.log(michaelcifrado("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", 5, true));
console.log("Descifrar....");
console.log(michaelcifrado("FGHIJKLMNÑOPQRSTUVWXYZABCDE", 5, false));

console.log("");

console.log("key 6");
console.log(michaelcifrado("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", 6, true));
console.log("Descifrar....");
console.log(michaelcifrado("GHIJKLMNÑOPQRSTUVWXYZABCDEF", 6, false));


console.log("");

console.log("key 7");
console.log(michaelcifrado("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", 7, true));
console.log("Descifrar....");
console.log(michaelcifrado("HIJKLMNÑOPQRSTUVWXYZABCDEFG", 7, false));

console.log("");

console.log("key 8");
console.log(michaelcifrado("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", 8, true));
console.log("Descifrar....");
console.log(michaelcifrado("IJKLMNÑOPQRSTUVWXYZABCDEFGH", 8, false));

console.log("");

console.log("key 9");
console.log(michaelcifrado("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", 9, true));
console.log("Descifrar....");
console.log(michaelcifrado("JKLMNÑOPQRSTUVWXYZABCDEFGHI", 9, false));

console.log("");

console.log("key 10");
console.log(michaelcifrado("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", 10, true));
console.log("Descifrar....");
console.log(michaelcifrado("KLMNÑOPQRSTUVWXYZABCDEFGHIJ", 10, false));

console.log("");

console.log("key 11");
console.log(michaelcifrado("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", 11, true));
console.log("Descifrar....");
console.log(michaelcifrado("LMNÑOPQRSTUVWXYZABCDEFGHIJK", 11, false));

console.log("");

console.log("key 12");
console.log(michaelcifrado("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", 12, true));
console.log("Descifrar....");
console.log(michaelcifrado("MNÑOPQRSTUVWXYZABCDEFGHIJKL", 12, false));

console.log("");

console.log("key 13");
console.log(michaelcifrado("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", 13, true));
console.log("Descifrar....");
console.log(michaelcifrado("NÑOPQRSTUVWXYZABCDEFGHIJKLM", 13, false));

console.log("");

console.log("key 14");
console.log(michaelcifrado("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", 14, true));
console.log("Descifrar....");
console.log(michaelcifrado("ÑOPQRSTUVWXYZABCDEFGHIJKLMN", 14, false));

console.log("\n\n");

console.log("*****   VIGENERE CIPHER *****")
console.log("Agrege las llaves");
console.log(vigenereCipher("El cuervo vuela a la medianoche", "michael", true));
console.log("Descifrar....");
console.log(vigenereCipher("Uvs Códigos ASC de Positivo", "michael", false));