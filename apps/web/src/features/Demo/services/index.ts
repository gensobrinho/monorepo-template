import { DemoApi } from '@shared/api';
import { DemoManager } from './DemoManager';
import { DemoRepository } from './DemoRepository';

const demoApi = new DemoApi();
const demoRepository = new DemoRepository(demoApi);
const demoManager = new DemoManager(demoRepository);

export default demoManager;
