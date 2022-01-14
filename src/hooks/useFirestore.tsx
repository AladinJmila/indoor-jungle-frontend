import { useReducer, useState, useEffect } from 'react';
import { porjectFirestore } from '../firebase/config';
import { timestamp } from './../firebase/config';

interface IState {
  document: any;
  error: any;
  isPending: boolean;
  success: boolean;
}

const initialState: IState = {
  document: null,
  error: null,
  isPending: false,
  success: false,
};

enum ActionType {
  IsPending = 'IS_PENDING',
  AddedDoc = 'ADDED_DOCUMENT',
  UpdatedDoc = 'UPDATED_DOCUMENT',
  DeletedDoc = 'DELETED_DOCUMENT',
  Error = 'ERROR',
}

type Action = { type: ActionType; payload: any };

const isPendingAction: Action = { type: ActionType.IsPending, payload: false };
const addedDocAction: Action = { type: ActionType.AddedDoc, payload: null };
const updatedDocAction: Action = { type: ActionType.UpdatedDoc, payload: null };
const deletedDocAction: Action = { type: ActionType.DeletedDoc, payload: null };
const errorAction: Action = { type: ActionType.Error, payload: null };

const firestoreReducer = (state: IState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, error: null, success: false };

    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: payload,
        error: null,
        success: true,
      };

    case 'UPDATED_DOCUMENT':
      return {
        isPending: false,
        document: payload,
        error: null,
        success: true,
      };

    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, error: null, success: true };

    case 'ERROR':
      return {
        isPending: false,
        document: null,
        error: payload,
        success: false,
      };

    default:
      return state;
  }
};

const useFirestore = (collection: string) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCanceled, setIsCanceled] = useState(false);

  const ref = porjectFirestore.collection(collection);

  const dispatchIfNotCanceled = (action: Action) => {
    if (!isCanceled) dispatch(action);
  };

  const addDocument = async (doc: any) => {
    dispatch(isPendingAction);

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      addedDocAction.payload = addedDocument;
      dispatchIfNotCanceled(addedDocAction);
    } catch (error: any) {
      errorAction.payload = error.message;
      dispatchIfNotCanceled(errorAction);
    }
  };

  const updateDocument = async (id: string, updates: any) => {
    dispatch(isPendingAction);

    try {
      const updatedDocument = await ref.doc(id).update(updates);
      updatedDocAction.payload = updatedDocument;
      dispatchIfNotCanceled(updatedDocAction);
    } catch (error: any) {
      errorAction.payload = error.message;
      dispatchIfNotCanceled(errorAction);
    }
  };

  const deleteDocument = async (id: string) => {
    dispatch(isPendingAction);

    try {
      await ref.doc(id).delete();
      dispatchIfNotCanceled(deletedDocAction);
    } catch (error: any) {
      errorAction.payload = error.message;
      dispatchIfNotCanceled(errorAction);
    }
  };

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { addDocument, updateDocument, deleteDocument, response };
};

export default useFirestore;
