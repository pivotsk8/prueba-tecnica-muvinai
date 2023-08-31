export const custumerDataSchema = {
    email(value) {
        if (!value) {
            return 'Este campo es obligatorio';
        }

        // se es un email valido
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+[A-Z]{2,4}$/i;
        if (!regex.test(value)) {

            return 'Email no es válido'
        }

        return true

    },
    name(value) {
        if (!value) {
            return 'Este campo es obligatorio';
        }
        return true

    },
    lastname(value) {
        if (!value) {
            return 'Este campo es obligatorio';
        }
        return true

    },
    phone(value) {
        if (!value) {
            return 'Este campo es obligatorio';
        }
        return true

    },
    birthdate(value) {
        if (!value) {
            return 'Este campo es obligatorio';
        }
        return true

    },
    dni(value) {
        if (!value) {
            return 'Este campo es obligatorio';
        }
        return true
    },

}