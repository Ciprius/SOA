export default function buildMakeCar() {
    return function makeCar ({
        id,
        ownerName,
        manufactureYear,
        horsePower,
        torque,
        engine,
        engineCapacity,
        weight,
        brand,
        model,
        spectedFor,
    } = {}) {
        if (!ownerName) {
            throw new Error('Car must have an owner.');
        }
        if (!manufactureYear) {
            throw new Error('Car must have a manufacture year.');
        }
        if (!horsePower) {
            throw new Error('Car must have horse power.');
        }
        if (isNaN(horsePower)) {
            throw new Error('The horse power must be number.');
        }
        if (!torque) {
            throw new Error('Car must have torque power');
        }
        if (isNaN(torque)) {
            throw new Error('The torque must be number.');
        }
        if (!engine) {
            throw new Error('Car must have an engine');
        }
        if (!engineCapacity || isNaN(engineCapacity)) {
            throw new Error('Car must have an engine capacity or the engine capacity is not a number');
        }
        if (!weight || isNaN(weight)) {
            throw new Error('Car must have a weigth or the weight is not a number');
        }
        if (!brand) {
            throw new Error('Car must come from a brand');
        }
        if (!model) {
            throw new Error('Car must be a model');
        }
        if (!spectedFor) {
            throw new Error('Car must be spected for something i.e. drag, circuit etc');
        }
        
        return Object.freeze({
            getOwner: () => ownerName,
            getManufacturedYear: () => manufactureYear,
            getHp: () => horsePower,
            getTorque: () => torque,
            getEngine: () => engine,
            getId: () => id,
            getEngineCapacity: () => engineCapacity,
            getWeight: () => weight,
            getBrand: () => brand,
            getModel: () => model,
            getSpec: () => spectedFor,
        });
    }
}
