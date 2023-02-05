// modules
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

// options
import options from 'src/store/options';

const persistKeys = ['auth', 'current', 'theme', 'language', 'tour'];

const reducer = (state, { type, value }) => {
    return { ...state, [type]: typeof value === 'object' && !(value instanceof Array) ? { ...state[type], ...value } : value };
};

const useStore = create(
    persist(
        devtools((set) => ({
            ...options,
            dispatch: (args) => set((state) => reducer(state, args))
        })),
        {
            name: 'bot',
            partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => persistKeys.includes(key)))
        }
    )
);

export default useStore;
