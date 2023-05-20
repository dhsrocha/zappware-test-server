import { server as slave, port as masterPort } from './feature/slave.js';
import { server as master, port as slavePort } from './feature/master.js';

export default {};

slave.listen(masterPort);
master.listen(slavePort);
