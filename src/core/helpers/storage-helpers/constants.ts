// keep this object in freeze only, not enum.
// This help use to add methods in the object as needed in future

// eslint-disable-next-line no-shadow
export enum STORAGE_KEYS {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  SESSION_TOKEN = 'SESSION_TOKEN',
  USER_ID = 'USER_ID',
}

export default STORAGE_KEYS;
