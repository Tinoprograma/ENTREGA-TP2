class MemoryPersistence {
    constructor() {
        this.colors = [];
    }

    saveColor(color) {
        this.colors.push(color);
    }

    getAllColors() {
        return this.colors;
    }

    // Método para chequear existencia
    exists(color) {
        return this.colors.includes(color);
    }
}

export default new MemoryPersistence();