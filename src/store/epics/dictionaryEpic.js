import { CREATE_DICTIONARY, GET_DICTIONARIES, DELETE_DICTIONARY, UPDATE_DICTIONARY } from './../constants'
import { Observable } from 'rxjs/Rx';
import { dictionaryAction } from './../actions/index'
import { HttpService } from './../../services/http'

export default class dictionaryEpic {

    static createDictionary = (action$) =>
        action$.ofType(CREATE_DICTIONARY)
            .switchMap(({ payload }) => {
                let createdDictionaries = localStorage.getItem('dictionaries')
                if (createdDictionaries) {
                    let newDictionaries = JSON.parse(createdDictionaries)
                    newDictionaries.push(payload)
                    localStorage.setItem('dictionaries', JSON.stringify(newDictionaries))
                    return Observable.of(
                        dictionaryAction.createDictionarySuccess(payload),
                        dictionaryAction.getDictionaries()
                    )
                }
                else {
                    let createdDictionary = []
                    createdDictionary[0] = payload
                    createdDictionary = JSON.stringify(createdDictionary)
                    localStorage.setItem('dictionaries', createdDictionary)
                    return Observable.of(
                        dictionaryAction.createDictionarySuccess(payload),
                        dictionaryAction.getDictionaries()
                    )
                }
            })

    static updateDictionary = (action$) =>
        action$.ofType(UPDATE_DICTIONARY)
            .switchMap(({ payload }) => {
                localStorage.setItem('dictionaries', JSON.stringify(payload))
                return Observable.of(
                    dictionaryAction.updateDictionarySuccess(payload),
                    dictionaryAction.getDictionaries()
                )
            })

    static deleteDictionary = (action$) =>
        action$.ofType(DELETE_DICTIONARY)
            .switchMap(({ payload }) => {
                localStorage.setItem('dictionaries', JSON.stringify(payload))
                return Observable.of(
                    dictionaryAction.deleteDictionarySuccess(payload),
                    dictionaryAction.getDictionaries()
                )
            })

    static getDictionaries = (action$) =>
        action$.ofType(GET_DICTIONARIES)
            .switchMap(({ }) => {
                return HttpService.get('http://localhost:8000/')
                    .switchMap((response) => {
                        debugger
                        if (response.status === 200) {
                            return Observable.of(
                                dictionaryAction.getDictionariesSuccess({ dictionaries: response.response })
                            )
                        }
                    }).catch((err) => {
                        debugger
                        return Observable.of(dictionaryAction.getDictionariesFailure(`No Dictionary Found, Kindly Create Dictionary`))
                    })
                // let createdDictionaries = localStorage.getItem('dictionaries')

                // if (createdDictionaries) {
                //     let dictionaries = JSON.parse(createdDictionaries)
                //     return Observable.of(
                //         dictionaryAction.getDictionariesSuccess({ dictionaries })
                //     )
                // }
                // else {
                //     return Observable.of(
                //         dictionaryAction.getDictionariesFailure('No Dictionary Found, Kindly Create Dictionary')
                //     )
                // }
            })
}