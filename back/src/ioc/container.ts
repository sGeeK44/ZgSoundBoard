import { Container, interfaces } from "inversify";

class CustomContainer extends Container {
    getOrDefault<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
        if (this.isBound(serviceIdentifier)) {
            return this.get(serviceIdentifier);
        }
        return <any>undefined;
    }
}

let container = new CustomContainer();

export default container;