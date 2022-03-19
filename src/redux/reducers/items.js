import * as types from '../types/items';

const initialState = {
    loading: false,
    items: [],
    archivedItems: [],
}

export default function items(state = initialState, action) {
    switch (action.type) {
        case types.GET_ITEMS_ATTEMPT:
            return { ...state, loading: true }
        case types.GET_ITEMS_FAIL:
            return { ...state, loading: false }
        case types.GET_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.data
            }
        case types.ADD_ITEM:
            return {
                ...state,
                loading: false,
                items: [action.payload.data, ...state.items].sort((a, b) => a.date - b.date)

            }
        case types.ARCHIVE_ITEM:
            const newItems = [...state.items];
            const archivedItem = newItems.splice(state.items.findIndex(item => item.id === action.payload.id), 1);
            return {
                ...state,
                loading: false,
                items: newItems,
                archivedItems: [archivedItem[0], ...state.archivedItems]
            }
        case types.UNARCHIVE_ITEM:
            const newArchivedItems = [...state.archivedItems];
            const unarchivedItem = newArchivedItems.splice(state.archivedItems.findIndex(item => item.id === action.payload.id), 1);
            return {
                ...state,
                loading: false,
                items: [unarchivedItem[0], ...state.items].sort((a, b) => a.date - b.date),
                archivedItems: newArchivedItems
            }
        default:
            return state;
    }
}