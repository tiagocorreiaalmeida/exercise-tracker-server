import { CreateCategoryProps } from '../../../modules/exercise/domain/repos/categoryRepo';
import { MIN_NAME_LENGTH } from '../../../modules/exercise/useCases/createCategory/createCategoryValidator';
import { UniqueEntityID } from '../../core/UniqueEntityID';

export const generateCategoryCreateData = (ownerId: string): CreateCategoryProps => {
  const name = 'a'.repeat(MIN_NAME_LENGTH);

  return {
    id: new UniqueEntityID().toString(),
    ownerId,
    name,
  };
};
