export interface BaseInterfaceRepository<T> {
  create(data: T | any): Promise<T>;

  findOneById(_id: string): Promise<T>;

  findAll(): Promise<T[]>;

  remove(_id: string): Promise<void>;

  update(_id: string, updateDto: T | any): Promise<T>;

  findExsited(_id: string): boolean

  findWithCondition(condition: T | any): Promise<T>;
}
