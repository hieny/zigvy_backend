import { BaseInterfaceRepository } from 'src/based-repositories/base.inteface.repository';
import { User } from '../user.schema';

export interface UserRepositoryInterface extends BaseInterfaceRepository<User> {}
