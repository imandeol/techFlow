// actions.ts
export const UPDATE_FORM = 'UPDATE_FORM';
export const UPDATE_RESPONSE = 'UPDATE_RESPONSE';

export const updateForm = (payload:any) => ({
  type: UPDATE_FORM,
  payload,
});

export const updateResponse = (payload:any) => ({
  type: UPDATE_RESPONSE,
  payload,
});