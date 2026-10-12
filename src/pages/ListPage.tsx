/* src/pages/ListPage.tsx */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import RestaurantList from '../components/RestaurantList';
import { restaurantAPI } from '../services/api';
import { ClipLoader } from 'react-spinners';
import type { CategoryFilter } from '../types/restaurant';

const PageContainer = styled.div`
  padding: 2rem 0;
`;

const FilterContainer = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

// $active: DOM으로 전달되지 않는 transient prop
const FilterButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid var(--ajou-blue);
  background: ${props => props.$active ? 'var(--ajou-blue)' : 'white'};
  color: ${props => props.$active ? 'white' : 'var(--ajou-blue)'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: var(--ajou-blue);
    color: white;
  }
`;

const categories: CategoryFilter[] = ['전체', '한식', '중식', '일식', '양식', '아시안', '분식', '카페'];

function ListPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('전체');

  // React Query로 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: restaurantAPI.getRestaurants,
  });

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="var(--ajou-blue)" size={50} />
        <p>맛집 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">에러가 발생했습니다: {error.message}</div>;
  }

  const filteredData = selectedCategory === '전체'
    ? data?.data
    : data?.data.filter(r => r.category === selectedCategory);

  return (
    <PageContainer>
      <h2>맛집 목록</h2>

      <FilterContainer>
        {categories.map(category => (
          <FilterButton
            key={category}
            $active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>

      <RestaurantList restaurants={filteredData || []} />
    </PageContainer>
  );
}

export default ListPage;
