
import {
    CREATE_DICTIONARY, CREATE_DICTIONARY_SUCCESS, CREATE_DICTIONARY_FAILURE,
    GET_DICTIONARIES, GET_DICTIONARIES_SUCCESS, GET_DICTIONARIES_FAILURE,
    DELETE_DICTIONARY, DELETE_DICTIONARY_SUCCESS, DELETE_DICTIONARY_FAILURE,
    UPDATE_DICTIONARY, UPDATE_DICTIONARY_SUCCESS, UPDATE_DICTIONARY_FAILURE,
} from './../constants'

export class dictionaryAction {

    static updateDictionary(payload) {
        return {
            type: UPDATE_DICTIONARY,
            payload
        }
    }

    static updateDictionarySuccess(payload) {
        return {
            type: UPDATE_DICTIONARY_SUCCESS,
            payload
        }
    }

    static updateDictionaryFailure(payload) {
        return {
            type: UPDATE_DICTIONARY_FAILURE,
            payload
        }
    }
    
    static deleteDictionary(payload) {
        return {
            type: DELETE_DICTIONARY,
            payload
        }
    }

    static deleteDictionarySuccess(payload) {
        return {
            type: DELETE_DICTIONARY_SUCCESS,
            payload
        }
    }

    static deleteDictionaryFailure(payload) {
        return {
            type: DELETE_DICTIONARY_FAILURE,
            payload
        }
    }

    static getDictionaries() {
        return {
            type: GET_DICTIONARIES
        }
    }

    static getDictionariesSuccess(payload) {
        return {
            type: GET_DICTIONARIES_SUCCESS,
            payload
        }
    }

    static getDictionariesFailure(payload) {
        return {
            type: GET_DICTIONARIES_FAILURE,
            payload
        }
    }

    static createDictionary(payload) {
        return {
            type: CREATE_DICTIONARY,
            payload
        }
    }

    static createDictionarySuccess(payload) {
        return {
            type: CREATE_DICTIONARY_SUCCESS,
            payload
        }
    }

    static createDictionaryFailure(error) {
        return {
            type: CREATE_DICTIONARY_FAILURE,
            error
        }
    }
}