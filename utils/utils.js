export const debounce = (callback, wait) => {
    let timeoutId = null;

    return (...args) => {
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback.apply(context, args);
        }, wait);
    };
}