export enum EStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED'
}

export interface IAsyncData<T> {
  data: T;
  error: null | string;
  status: EStatus;
}

export interface IResponseError {
  reason: string;
}
