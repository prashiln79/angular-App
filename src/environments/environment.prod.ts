export const environment = {
  production: true,
  spreadsheetId:'1uK7I_xBLxjsv934177jWlu523KVdFzV66835t6xBCQo',
  appApi: {
    baseUrl: 'https://sheets.googleapis.com/v4/spreadsheets/'
  },
  socketConfig: {
    url: 'https://contacts-api.vatsaev.com',
    opts: {
      transports: ['websocket']
    }
  }
};
