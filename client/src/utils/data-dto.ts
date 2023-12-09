export interface CategoryDto {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealDto {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface CategoryDeliveryDto {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  description: string;
  image: ImageDelivery;
  name: string;
}

export interface ImageDelivery {
  _type: string;
  asset: Array<Object>;
}
