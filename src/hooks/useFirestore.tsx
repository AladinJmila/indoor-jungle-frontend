import { Statement } from 'typescript';

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
      return { isPending: true, document: null, error: null, success: null };

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

const useFirestore = () => {
  return;
};

export default useFirestore;
