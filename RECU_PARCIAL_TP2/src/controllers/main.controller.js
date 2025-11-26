import mainService from '../services/main.service.js';

class MainController {

    // 1. Ruta raíz
    sendGreeting = (req, res) => {
        const message = mainService.getGreeting();
        res.send(message);
    }

    // 2. Obtener colores (GET)
    getColors = (req, res) => {
        const colors = mainService.getColors();
        res.json(colors);
    }

    // 2. Guardar color (POST)
    postColor = (req, res) => {
        // envían un JSON: { "color": "rojo" }
        const { color } = req.body;

        if (!color) {
            return res.status(400).json({ error: 'Falta el campo color' });
        }

        try {
            mainService.addColor(color);
            // Retornamos la lista actualizada o mensaje de éxito
            res.json(mainService.getColors());
        } catch (error) {
            // Si el servicio lanza eror (duplicado), respondemos con el JSON pedido
            res.json({ error: error.message });
        }
    }
}

export default new MainController();