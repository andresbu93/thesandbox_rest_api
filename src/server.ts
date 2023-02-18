import winston from 'winston';
import { server } from './app';

const port = parseInt(process.env.PORT as string) || 5001;
server.listen(port, () => winston.info(`Server running on port ${port} ...`));
