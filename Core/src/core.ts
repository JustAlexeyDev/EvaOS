import app from './app';
import { Port } from './Config';

app.listen(Port, () => {
  console.log(`The Core runs on the port: ${Port}`);
});