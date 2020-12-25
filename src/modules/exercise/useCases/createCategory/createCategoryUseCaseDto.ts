import { Category } from '../../domain/category';

export interface CreateCategoryDTO {
  ownerId: string;
  name: string;
}

export type CreateCategoryResponse = Category;
