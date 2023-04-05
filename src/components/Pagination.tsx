import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { AllBlogs, PaginationProps, PaginationNumberProps } from '@/types';

const blogsPerPage = 4;

const Pagination = ({ setCurrentPage, currentPage }: PaginationProps) => {
  const { blogs } = useSelector((state: { blogs: AllBlogs }) => state.blogs);
  return (
    <PaginationContainer>
      {new Array(Math.ceil(blogs.length / blogsPerPage))
        .fill(null)
        .map((_, index) => (
          <Number
            isActive={currentPage === index + 1}
            onClick={() => setCurrentPage(index + 1)}
            key={index}
          >
            {index + 1}
          </Number>
        ))}
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 2rem auto;
`;

const Number = styled.button<PaginationNumberProps>`
  display: grid;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  width: 4rem;
  height: 4rem;
  background-color: rgb(91, 172, 229);
  color: #fff;
  border-radius: 50%;
  border: none;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: ${({ isActive }: any) =>
    isActive ? '2px solid red' : '2px solid transparent'};

  &:hover {
    transition: all 0.2s;
    transform: translateY(-0.2rem);
    box-shadow: rgba(0, 0, 0, 0.84) 0px 1.5px 4px;
    opacity: 0.9;
  }
`;
