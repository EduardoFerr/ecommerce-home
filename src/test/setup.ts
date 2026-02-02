import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

/**
 * Global Test Setup.
 * Este ficheiro corre antes de cada ficheiro de teste para configurar o ambiente JSDOM.
 */

// Limpa o DOM após cada teste para evitar fugas de memória ou poluição entre testes
afterEach(() => {
    cleanup();
});

/**
 * Mock Global do LocalStorage.
 * Como o JSDOM não implementa persistência real, simula o LocalStorage 
 * para que os testes do Carrinho funcionem corretamente.
 */
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        length: 0,
        key: (index: number) => Object.keys(store)[index] || null,
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});