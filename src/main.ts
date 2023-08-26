import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import path from 'path';
import fs from 'fs';
import { Logger } from '@nestjs/common';

declare const module: any;

async function bootstrap() {

  // setting localhost to serve in HTTPS
  // if ssl is on fill up HTTPS option
  let httpsOptions = process.env.SSL ? {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  } : null;
  const address = 'http' + (process.env.SSL ? 's' : '') + '://' + 'localhost' + ':' + '3000' + '/'

  // insert the HTTPS optitons
  const app = await NestFactory.create(AppModule, { httpsOptions });
  await app.listen(3000, () => {
    Logger.log('Listening at: ' + address)
  });

  // webpack hot reloading
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close);
  }
}
bootstrap();
