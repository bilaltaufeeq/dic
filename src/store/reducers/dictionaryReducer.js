import {
    CREATE_DICTIONARY, CREATE_DICTIONARY_SUCCESS, CREATE_DICTIONARY_FAILURE,
    GET_DICTIONARIES, GET_DICTIONARIES_SUCCESS, GET_DICTIONARIES_FAILURE,
    DELETE_DICTIONARY, DELETE_DICTIONARY_SUCCESS, DELETE_DICTIONARY_FAILURE,
    UPDATE_DICTIONARY, UPDATE_DICTIONARY_SUCCESS, UPDATE_DICTIONARY_FAILURE,
} from './../constants'

const initialState = {
    createdDictionary: null,
    createDictionaryLoader: false,
    createDictionaryError: null,

    dictionaries: null,
    getDictionariesLoader: false,
    getDictionariesError: null,

    deletedDictionary: null,
    deleteDictionaryLoader: false,
    deleteDictionaryError: null,

    updatedDictionary: null,
    updateDictionaryLoader: false,
    updateDictionaryError: null,
}

export default function dictionaryReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_DICTIONARY:
            return {
                ...state,
                updatedDictionary: null,
                updateDictionaryLoader: true,
                updateDictionaryError: null
            }

        case UPDATE_DICTIONARY_SUCCESS:
            return {
                ...state,
                updatedDictionary: action.payload,
                updateDictionaryLoader: false,
                updateDictionaryError: null
            }

        case UPDATE_DICTIONARY_FAILURE:
            return {
                ...state,
                updatedDictionary: null,
                updateDictionaryLoader: false,
                updateDictionaryError: action.payload
            }

        case DELETE_DICTIONARY:
            return {
                ...state,
                deletedDictionary: null,
                deleteDictionaryLoader: true,
                deleteDictionaryError: null
            }

        case DELETE_DICTIONARY_SUCCESS:
            return {
                ...state,
                deletedDictionary: action.payload,
                deleteDictionaryLoader: false,
                deleteDictionaryError: null
            }

        case DELETE_DICTIONARY_FAILURE:
            return {
                ...state,
                deletedDictionary: null,
                deleteDictionaryLoader: false,
                deleteDictionaryError: action.payload
            }

        case GET_DICTIONARIES:
            return {
                ...state,
                dictionaries: null,
                getDictionariesLoader: true,
                getDictionariesError: null
            }

        case GET_DICTIONARIES_SUCCESS:
            return {
                ...state,
                dictionaries: action.payload.dictionaries,
                getDictionariesLoader: false,
                getDictionariesError: null
            }

        case GET_DICTIONARIES_FAILURE:
            return {
                ...state,
                dictionaries: null,
                getDictionariesLoader: false,
                getDictionariesError: action.payload
            }

        case CREATE_DICTIONARY:
            return {
                ...state,
                createdDictionary: null,
                createDictionaryLoader: true,
                createDictionaryError: null
            }

        case CREATE_DICTIONARY_SUCCESS:
            return {
                ...state,
                createdDictionary: action.payload,
                createDictionaryLoader: false,
                createDictionaryError: null
            }

        case CREATE_DICTIONARY_FAILURE:
            return {
                ...state,
                createdDictionary: null,
                createDictionaryLoader: false,
                createDictionaryError: action.payload
            }

        default:
            return state
    }

}