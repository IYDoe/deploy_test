type EventCallback = (...args: any) => void

export class EventBus {
    private readonly listeners: Record<string, EventCallback[]> = {};

    constructor() {
        this.listeners;
    }

    on(event: string, callback: EventCallback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: EventCallback) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(el => el !== callback);
    }

    emit(event: string, ...args: any) {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }
}
