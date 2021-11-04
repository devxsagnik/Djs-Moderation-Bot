module.exports = client => {
    process.on('unhandledRejection', (reason, p) => {
         console.log('Unhandled Rejection/Catch'.bgRed);
         console.log(reason, p);
     });
     process.on("uncaughtException", (err, origin) => {
         console.log('Uncaught Exception/Catch'.bgRed);
         console.log(err, origin);
     }) 
     process.on('uncaughtExceptionMonitor', (err, origin) => {
         console.log('Uncaught Exception/Catch (MONITOR)'.bgRed);
         console.log(err, origin);
     });
     process.on('multipleResolves', (type, promise, reason) => {
         console.log('Multiple Resolves'.bgRed);
         console.log(type, promise, reason);
     });
 }