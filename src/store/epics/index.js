import { combineEpics } from 'redux-observable';
import dictionaryEpic from './dictionaryEpic'

const rootEpic = combineEpics(
    dictionaryEpic.createDictionary,
    dictionaryEpic.getDictionaries,
    dictionaryEpic.deleteDictionary,
    dictionaryEpic.updateDictionary,
);

export default rootEpic;