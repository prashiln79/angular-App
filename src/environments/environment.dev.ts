export const environment = {
  production: true,
  spreadsheetId:'1uK7I_xBLxjsv934177jWlu523KVdFzV66835t6xBCQo',
  appApi: {
    baseUrl: 'https://sheets.googleapis.com/v4/spreadsheets/'
  },
  socketConfig: {
    url: 'http://dev.contacts.com:3000',
    opts: {
      transports: ['websocket']
    }
  }
};
