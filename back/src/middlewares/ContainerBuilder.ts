import container from '../ioc/container';

export function ContainerBuilder(req, res, next) {    
    container.unbindAll();
    next();
}