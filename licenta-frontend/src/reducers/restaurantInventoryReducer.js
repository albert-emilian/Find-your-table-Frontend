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
    INVENTORY_ITEM_DELETE_FAIL
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
    itemInventoryDeleteLoading: false

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

        case CREATE_ITEM_VALIDATION_ERRORS:
            return {
                ...state,
                inventoryItemCreateValidationErrors: action.payload.inventoryItemCreateValidationErrors
            };

        case CREATE_ITEM_ERROR:
            return {
                ...state,
                inventoryItemCreateError:{
                    isError: true,
                    errorMessage: action.payload.inventoryItemCreateError.errorMessage
                }
            };

        case CREATE_ITEM_SUCCES:
            return {
                ...state,
                inventoryItemCreated: true
            };

        case INVENTORY_ITEM_DELETE_SUCCESS:
            console.log("AAAAAA")
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

        default: return state;   
    }
}