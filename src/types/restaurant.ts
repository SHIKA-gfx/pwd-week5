/* src/types/restaurant.ts */

export type Category = '한식' | '중식' | '일식' | '양식' | '아시안' | '분식' | '카페' | '기타';

// 목록 필터용 ('전체' 포함)
export type CategoryFilter = '전체' | Category;

export interface Restaurant {
  id: number;
  name: string;
  category: Category;
  location: string;
  priceRange: string;
  rating: number;
  description: string;
  recommendedMenu: string[];
  likes: number;
  image: string;
}

// API 응답 래퍼
export interface ApiResponse<T> {
  data: T;
}

// 맛집 제보 폼 입력값
export interface SubmitFormValues {
  restaurantName: string;
  category: Category | '';
  location: string;
  priceRange: string;
  recommendedMenu: string;
  review: string;
  submitterName: string;
  submitterEmail: string;
}

// localStorage에 저장되는 제보 데이터
export interface Submission extends Omit<SubmitFormValues, 'recommendedMenu'> {
  id: string;
  status: 'pending';
  recommendedMenu: string[];
}
