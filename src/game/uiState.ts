import Vector2 from "../engine/core/Vector2";

let UIState = {
    velocity: new Vector2(0, 0),
    timer: 65,
};

let uiListeners: any[] = [];

export const UIStateStore = {
    setVelocity(velocity: Vector2) {
        UIState = { ...UIState, velocity: velocity };
        emitChange();
    },

    setTimer(time: number) {
        UIState = { ...UIState, timer: time };
        emitChange();
    },

    subscribe(listener: any) {
        uiListeners = [...uiListeners, listener];
        return () => {
            uiListeners = uiListeners.filter((l) => l !== listener);
        };
    },

    getSnapshot() {
        return UIState;
    },
};

function emitChange() {
    for (let listener of uiListeners) {
        listener();
    }
}
