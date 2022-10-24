import { resolveComponent as _resolveComponent } from 'vue';
export function isObject(object) {
    return Object.prototype.toString.call(object) === '[object Object]';
}

export function resolveComponent(component) {
    if (typeof component === 'string') return _resolveComponent(component);

    return component;
}