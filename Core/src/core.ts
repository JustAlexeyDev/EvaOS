import app from './app';
import { PORTS } from './Config';

app.listen(PORTS, () => {
  console.log(`The Core runs on the port: ${PORTS}`);
});