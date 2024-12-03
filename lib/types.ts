export interface Category {
  _id: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}



export interface User {
  verify: boolean;
  _id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  homeAddress: string;
  phoneNumber: string;
  country: string;
  state: string;
  lga: string;
  image: string;
  idFront: string;
  idNumber: string;
  idBack: string;
  accountNumber: string;
  bank: string;
  bankName: string;
};

export interface FetchUserDataResponse {
  data: {
    _id: string;
    budgetDetails: string;
    categoryId: Category;
    createdAt: string;
    currentAmount: number;
    description: string;
    shortdesc: string;
    enddate: string;
    goalAmount: number;
    images: string[];
    startdate: string;
    title: string;
    updatedAt: string;
    userId: User;
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
  shortdesc: string;
  enddate: string;
  goalAmount: number;
  images: string[];
  startdate: string;
  title: string;
  updatedAt: string;
  userId: User;
  __v: number;
}
