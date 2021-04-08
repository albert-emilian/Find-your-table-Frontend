import { 
    CREATE_RESTAURANT_TABLE_SUCCESS,
    CREATE_RESTAURANT_TABLE_LOADING,
    CREATE_RESTAURANT_TABLE_FAIL,
    CREATE_RESTAURANT_TABLE_VALIDATION_ERROR,
    UPDATE_RESTAURANT_TABLE_SUCCESS,
    UPDATE_RESTAURANT_TABLE_FAIL,
    UPDATE_RESTAURANT_TABLE_VALIDATIONS_ERRORS,
    DELETE_RESTAURANT_TABLE_SUCCESS,
    DELETE_RESTAURANT_TABLE_FAIL,
    RESTAURANT_TABLE_LIST_SUCCESS,
    RESTAURANT_TABLE_LIST_LOADING,
    RESTAURANT_TABLE_LIST_FAIL,
} from '../actiontypes/index'


const initialState = {

    tableList: [],

    tableListLoading: false,
    isTableListRetrieved: false,
    tableListError:{
        isError: false,
        errorMessage: ""
    },

    tableCreated: false,
    tableCreateLoading: false,
    tableCreateValidationError: {
        isError: true,
        errorMessage: ""
    },
    tableCreateError: {
        isError: false,
        errorMessage: ""
    },


   
    tableUpdated: false,
    tableUpdateValidationErros: [],
    tableUpdateError: {
        isError: false,
        errorMessage: ""
    },

    tableDeleted: false,
    tableDeleteError: {
        isError: false,
        errorMessage: ""
    },

    tableReservationsList: [],

    reservationsTableLoading: false,
    reservationsTabletRetrieved: false,
    reservationsTableError:{
        isError: false,
        errorMessage: ""
    }
}

export default function(state = initialState, action){

    switch(action.type){

    case CREATE_RESTAURANT_TABLE_SUCCESS:
        return {
            ...state,
            tableCreated: true,
            tableList: action.payload.tableList
        };

    case CREATE_RESTAURANT_TABLE_LOADING:
        return {
            ...state,
            tableCreateLoading: true
        };


    case CREATE_RESTAURANT_TABLE_FAIL:
        return {
            ...state,
            tableCreated: false,
            tableCreateError: {
                isError: true,
                errorMessage: action.payload.tableCreateError.errorMessage
            }
        };
    
    case CREATE_RESTAURANT_TABLE_VALIDATION_ERROR:
        return {
            ...state,
            tableCreateValidationError: {
                isError: true,
                errorMessage: action.payload.tableCreateValidationError.errorMessage
            }
        }

    case UPDATE_RESTAURANT_TABLE_SUCCESS:
        const index = state.tableList.findIndex(item => item.TableId === action.payload.updatedItem.TableId);
        const newArray = [...state.tableList]; 
        newArray[index] = {...action.payload.updatedItem};

        return { 
            ...state,
            tableUpdated: true,
            tableList: newArray, 
        };


    case UPDATE_RESTAURANT_TABLE_FAIL:
        return {
            ...state,
            tableUpdateError: {
                isError: false,
                errorMessage: action.payload.tableUpdateError.errorMessage
            },
        };

    case UPDATE_RESTAURANT_TABLE_VALIDATIONS_ERRORS:
        return {
            ...state,
            tableUpdateValidationErros: action.payload.tableUpdateValidationErrors
        };

    case DELETE_RESTAURANT_TABLE_SUCCESS:
        return {
            ...state,
                tableDeleted: true,
                tableList:   state.tableList.filter( (item, index) => index !== action.payload.index)
        };

    case DELETE_RESTAURANT_TABLE_FAIL:
        return {
            ...state,
            tableDeleteError: {
                isError: false,
                errorMessage: action.payload.tableDeleteError.errorMessage
            }
        };

    case RESTAURANT_TABLE_LIST_SUCCESS:
        return {
            ...state,
            tableList: action.payload.tableList,
            tableListLoading: false,
            isTableListRetrieved: true
        };

    case RESTAURANT_TABLE_LIST_FAIL:
        return {
            ...state,
            tableListLoading: false,
            isTableListRetrieved: false,
            tableListError:{
                isError: true,
                errorMessage: action.payload.tableListError.errorMessage
            },

        };

    case RESTAURANT_TABLE_LIST_LOADING:
        return {
            ...state,
            tableListLoading: true
        };

    
    default: return state;

    }
}