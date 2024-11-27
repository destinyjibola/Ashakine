export interface Category {
  _id: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FetchUserDataResponse {
  data: {
    _id: string;
    budgetDetails: string;
    categoryId: Category;
    createdAt: string;
    currentAmount: number;
    description: string;
    enddate: string;
    goalAmount: number;
    images: string[];
    startdate: string;
    title: string;
    updatedAt: string;
    userId: string | null;
    __v: number;
  };
}

export interface ProjectResponse {
  _id: string;
  budgetDetails: string;
  categoryId: Category;
  createdAt: string;
  currentAmount: number;
  description: string;
  enddate: string;
  goalAmount: number;
  images: string[];
  startdate: string;
  title: string;
  updatedAt: string;
  userId: string | null;
  __v: number;
}
