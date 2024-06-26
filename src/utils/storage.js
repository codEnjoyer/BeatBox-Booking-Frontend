'use client'

export const read = (key) => {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

export const write = (key, value) => {
    return localStorage.setItem(key, value);
}

export const remove = (key) => {
    return localStorage.removeItem(key);
}

export const removeAll = (key) => {
    return localStorage.clear(key);
}