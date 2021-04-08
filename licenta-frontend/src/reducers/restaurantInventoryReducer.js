import { 
    INVENTORY_LIST_LOADING,
    INVENTORY_LIST_SUCCES,
    INVENTORY_LIST_ERROR,
    RENDER_ITEM_FORM,
    CLOSE_ITEM_FORM,
    CREATE_ITEM_VALIDATION_ERRORS,
    CREATE_ITEM_ERROR,
    CREATE_ITEM_SUCCES,
    INVENTORY_ITEM_DELETE_SUCCESS,
    INVENTORY_ITEM_DELETE_LOADING,
    INVENTORY_ITEM_DELETE_FAIL,
    ADD_INVENTORY_ITEM_VALIDATION_ERROR,
    ADD_INVENTORY_ITEM_ERROR,
    ADD_INVENTORY_ITEM_SUCCESS,
    UPDATE_INVENTORY_ITEM_SUCCESS,
    UPDATE_INVENTORY_ITEM_ERROR,
    UPDATE_INVENTORY_ITEM_VALIDATION_ERRORS
} from '../actiontypes/index'


const initialState = {

    inventoryItemsList: [],
    isInventoryItemsListRetrieved: false,
    inventoryItemListLoading: false,
    inventoryItemListError: {
        isError: false,
        errorMessage: ""
    },

    renderItemForm: false,
    inventoryItemCreated: false,
    inventoryItemCreateValidationErrors: [],
    inventoryItemCreateError: {
        isError: false,
        errorMessage: ""
    },

    itemInventoryDeleteFail: {
        isError: false,
        errorMessage: ""
    },
    itemInventoryDeleteLoading: false,

    addInventoryItemsValidationErrors: [],
    addInventoryItemError: {
        isError: false,
        errorMessage: ""
    },

    updateInventoryItemsValidationErrors: [],
    updateInventoryItemError: {
        isError: false,
        errorMessage: ""
    }

}

export default function(state = initialState, action){

    switch(action.type){
        case INVENTORY_LIST_LOADING:
            return {
                ...state,
                inventoryItemListLoading: true
            };

        case INVENTORY_LIST_SUCCES:
            return {
                ...state,
                isInventoryItemsListRetrieved: true,
                inventoryItemListLoading: false,
                inventoryItemsList: action.payload.inventoryItemsList
            };

        case INVENTORY_LIST_ERROR:
            return {
                ...state,
                isInventoryItemsListRetrieved: false,
                inventoryItemListError: {
                    isError: true,
                    errorMessage: action.payload.inventoryItemListError.errorMessage
                }
            };

        case RENDER_ITEM_FORM:
            return {
                ...state,
                renderItemForm: true
            };

        case CLOSE_ITEM_FORM:
            return {
                ...state,
                renderItemForm: false
            };

        // case CREATE_ITEM_VALIDATION_ERRORS:
        //     return {
        //         ...state,
        //         inventoryItemCreateValidationErrors: action.payload.inventoryItemCreateValidationErrors
        //     };

        // case CREATE_ITEM_ERROR:
        //     return {
        //         ...state,
        //         inventoryItemCreateError:{
        //             isError: true,
        //             errorMessage: action.payload.inventoryItemCreateError.errorMessage
        //         }
        //     };

        // case CREATE_ITEM_SUCCES:
        //     return {
        //         ...state,
        //         inventoryItemCreated: true
        //     };

        case INVENTORY_ITEM_DELETE_SUCCESS:
            return {
                ...state,
                itemInventoryDeleteLoading: false,
                isInventoryItemsListRetrieved: true,
                inventoryItemsList:   state.inventoryItemsList.filter( (item, index) => index !== action.payload.index)

                
            };
           
        case INVENTORY_ITEM_DELETE_LOADING:
            return {
                ...state,
                itemInventoryDeleteLoading: true
                
            };
            
        case INVENTORY_ITEM_DELETE_FAIL:
            return {
                ...state,
                itemInventoryDeleteFail: {
                    isError: true,
                    errorMessage: action.payload.itemInventoryDeleteFail.errorMessage
                }
            };

        case ADD_INVENTORY_ITEM_VALIDATION_ERROR:
            return {
                ...state,
                addInventoryItemsValidationErrors: action.payload.addInventoryItemsValidationErrors
            };

        case ADD_INVENTORY_ITEM_ERROR:
            return {
                ...state,
                addInventoryItemError:{
                    isError: true,
                    errorMessage: action.payload.addInventoryItemError.errorMessage
                }
            };
            

        case ADD_INVENTORY_ITEM_SUCCESS: 
            return {
                ...state,
                inventoryItemsList: action.payload.inventoryItemsList
            };
        
        case UPDATE_INVENTORY_ITEM_SUCCESS:
            const index = state.inventoryItemsList.findIndex(item => item.InventoryItemId === action.payload.updatedItem.InventoryItemId);
            const newArray = [...state.inventoryItemsList]; 
            newArray[index] = {...action.payload.updatedItem};

            return { 
             ...state, 
             inventoryItemsList: newArray, 
            };

        case UPDATE_INVENTORY_ITEM_ERROR:
            return {
                ...state,
                updateInventoryItemError: {
                    isError: true,
                    errorMessage: action.payload.updateInventoryItemError.errorMessage
                }
            };

        case UPDATE_INVENTORY_ITEM_VALIDATION_ERRORS:
            return {
                ...state,
                updateInventoryItemsValidationErrors: action.payload.updateInventoryItemsValidationErrors
            };

            
        

        default: return state;   
    }
}