import { Category } from '../category';

export type CreateCategoryProps = Omit<Category, 'createdAt' | 'updatedAt'>;

export interface CategoryRepo {
  exists(categoryId: string): Promise<boolean>;
  save(category: CreateCategoryProps): Promise<Category>;
  findByName(categoryName: string): Promise<Category | null>;
}
