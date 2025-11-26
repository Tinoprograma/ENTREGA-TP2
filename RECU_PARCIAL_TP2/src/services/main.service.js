import persistence from '../persistence/memory.persistence.js';

class MainService {
    
    getGreeting() {
        const currentHour = new Date().getHours();
        
        if (currentHour >= 6 && currentHour <= 12) {
            return 'Buenos dias!';
        } else if (currentHour >= 13 && currentHour <= 19) {
            return 'Buenas tardes!';
        } else {
            // Cubre de 20 a 5hs
            return 'Buenas noches!';
        }
    }

    getColors() {
        return persistence.getAllColors();
    }

    addColor(colorName) {
        // Validar duplicados
        if (persistence.exists(colorName)) {
            throw new Error('color ya ingresado');
        }
        persistence.saveColor(colorName);
        return colorName;
    }
}

export default new MainService();