import {
  CategoryRepo as ICategoryRepo,
  CreateCategoryProps,
} from '../../../domain/repos/categoryRepo';
import { Category } from '../../../domain/category';

export class InMemoryCategoryRepo implements ICategoryRepo {
  categories: Category[];

  constructor() {
    this.categories = [];
  }

  async save(partialCategory: CreateCategoryProps): Promise<Category> {
    const category = {
      ...partialCategory,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.categories.push(category);
    return category;
  }

  async findByName(categoryName: string): Promise<Category | null> {
    const category = this.categories.find((storedCategory) => storedCategory.name === categoryName);

    return category || null;
  }

  async exists(categoryId: string): Promise<boolean> {
    const category = this.categories.find((storedCategory) => storedCategory.id === categoryId);

    return !!category;
  }
}

export const CategoryRepo = new InMemoryCategoryRepo();
