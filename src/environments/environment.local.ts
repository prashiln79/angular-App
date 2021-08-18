export const environment = {
  production: false,
  spreadsheetId:'1uK7I_xBLxjsv934177jWlu523KVdFzV66835t6xBCQo',
  appApi: {
    baseUrl: 'https://sheets.googleapis.com/v4/spreadsheets/'
  },
  socketConfig: {
    url: 'http://localhost:3000',
    opts: {
      transports: ['websocket']
    }
  }
};
