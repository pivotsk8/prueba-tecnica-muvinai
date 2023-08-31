export const aptoValidationSchema = {
    aptoCaducidad(value) {
        if (!value) {
            return 'Este campo es obligatorio';
        }
        return true
    }
}