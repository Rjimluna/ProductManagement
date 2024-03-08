const initialState = {
    viewItemModal: false,
    editItem: false,
    addVariant: false,
    addItem: false,
    submitLoading: false,

    products: [],
    tableProducts:[],
    item: {},
    itemUpdate: {},
    additionalItems: {
        id: "",
        size: "",
        price: 0,
        quantity: 0
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCT':
            return { ...state, products: action.value }
        case 'VIEW_ITEM_MODAL':
            return { ...state, viewItemModal: action.value }
        case 'GET_ITEM':
            return { ...state, item: action.value }
        case 'EDIT_ITEM':
            return { ...state, editItem: action.value }
        case 'ADD_VARIANT':
            return { ...state, addVariant: action.value }
        case 'SET_ADDITIONAL_ITEM':
            return {  ...state, additionalItems: { ...state.additionalItems,  [action.name]: action.value} }
        case 'ITEM_UPDATE':
            return { ...state, itemUpdate: { ...state.itemUpdate, [action.name]: action.value } }
        case 'PRODUCT_ITEM_UPDATE':
            return { 
                ...state, 
                itemUpdate: { 
                    ...state.itemUpdate,  
                    // eslint-disable-next-line array-callback-return
                    items: state.itemUpdate.items.map((item, index) => {
                        if (index === action.index) {
                            return {
                                ...item,
                                [action.name]: action.value,
                            }
                        }
                        return item;
                    }) }}
        case 'ADD_NEW_ITEM':
            return { ...state, itemUpdate: {}}
        case 'CREATE_ITEM':
            return { ...state, addItem: action.value }
        case 'SUBMIT_LOADING':
            return { ...state, submitLoading: action.value }
        case 'SET_CATEGORY_VALUE':
            return { ...state, itemUpdate: { ...state.itemUpdate, categories: action.value } }
        case 'PRODUCT_TABLE_CONTAINER':
            return { ...state, tableProducts: action.value }
        default:
            return state;
    }
}

export { initialState, reducer };