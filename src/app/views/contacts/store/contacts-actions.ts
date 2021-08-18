import {createAction, props} from '@ngrx/store';
import { Contact } from '@app/core/models';

export const loadSpreadSheet = createAction(
  '[Contacts] Load SpreadSheet'
);

export const load = createAction(
  '[Contacts] Load',
  props<{id: number}>()
);

export const create = createAction(
  '[Contacts] Create',
  props<{contact: Contact}>()
);

export const update = createAction(
  '[Contacts] Update',
  props<{contact: Partial<Contact>}>()
);

export const remove = createAction(
  '[Contacts] Remove',
  props<{id: number}>()
);

export const loadSpreadSheetSuccess = createAction(
  '[Contacts] Load all success',
  props<{contacts: Contact[]}>()
);

export const loadSuccess = createAction(
  '[Contacts] Load success',
  props<{'contact': Contact}>()
);

export const createSuccess = createAction(
  '[Contacts] Create success',
  props<{contact: Contact}>()
);

export const updateSuccess = createAction(
  '[Contacts] Update success',
  props<{contact: Partial<Contact>}>()
);


export const removeSuccess = createAction(
  '[Contacts] Remove success',
  props<{id: number}>()
);


export const failure = createAction(
  '[Contacts] Failure',
  props<{err: {concern: 'CREATE' | 'PATCH', error: any}}>()
);
