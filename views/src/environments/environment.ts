// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  videoUrl:
    'https://ssanotaai.s3.sa-east-1.amazonaws.com/demo_1.mp4?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXNhLWVhc3QtMSJGMEQCIGtiJYDnrJmCqMP38x2d00JuimjkQc3mxcIXkfsiFjFEAiAiiWk%2FHj8GoqQdFViZS16grQhiX6hzTptncV7HyKlRbSrNAgim%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDU5MzQwMDc0MzUyMyIM%2FnIowoo4hTT26VXvKqECl4%2B1Jtwu2wm0EKK%2FkzCN60tzN8OeLbc8uNL08yKL6fFhlig6tVGUF54PO5Yaf0Q5ML5R6i3hcif9g8hYeCxGu%2FWGH3msgsFl1%2FFWsEixK0hx1%2BnC1nv9zMpbZwnweJ03hAoRh6qnxLhb%2B8pTi5Fgm3w0gErcY%2FnXKxet3KjxsWLOb3JbUcKbZXGQrI4bsadN3rTMon6s5r2n1UTV64LuBQVT9VQvJdbqGGrmwxwVMaYktZoi8YLaTNAETsMGn7VjCJdyZLwv4lwapvdJhDbHIQpLEQlRQZ4n0gdlyG8WXRD97yHQW1LdkUFhG8LOdiJW0FqUm0UWQUu2nv2xefLkWCB8Tu1m76wiqViVIYz9PGltB%2BjbO335UsLph3LMNyl0FjDY6Y76BTqxAoJ%2BaZcTYfrtAz0ZjOifdN%2Bj6qRj51N9lWSzHd1ZVSEbYjsjAV%2FNo4HhdwRPhjCPoPdPKobULErS4WfUPshxaVl0bVj%2Baf9TACRPxGXqo%2FQ9X5kkYmAyTp4tI9VAnw7Io8357kvveyDBWo1y0e0w2ic5setRXDnrQbVAriKTuqm5yAOTL7pwxAgS6Noe1vXBWF0bDOzIJ19ESNSfc2odqTtOKGF35OJCUdBQRXQA%2Fk65TfBrhvA4G34ISbG9B1SnadeOaNR5vWICQsLc1JUfFR%2BDjq%2BPDuMPKEYnOzlbyhoMxGMs%2BJS5fMjtwXJP8zBKq3bXJllKJLookEZ3KtFE1z0ADTRvretMidlrflDD9umF3KDXdEC04tq6545e5TaB7JBaqZ48eQXsmuLfC9HY9cNe&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200824T125033Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYUKLQYZRXKMEFLG3%2F20200824%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Signature=8fb918bf645255a89e32030c1a816a137736553a478a9aea7327fb0d47422188',
  // url: 'https://staging-ssanotaai-api.herokuapp.com',
  url: 'http://localhost:3000',
  moskit: 'https://moskit.herokuapp.com/auth/moskit',
  firebase: {
    apiKey: 'AIzaSyATcmFVuIq51Csk75VcQLWPdO-1FgOQSMY',
    authDomain: 'vendas-anotaai.firebaseapp.com',
    databaseURL: 'https://vendas-anotaai.firebaseio.com',
    projectId: 'vendas-anotaai',
    storageBucket: 'vendas-anotaai.appspot.com',
    messagingSenderId: '635630891816',
    appId: '1:635630891816:web:0f4c7913b608a8ff',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
