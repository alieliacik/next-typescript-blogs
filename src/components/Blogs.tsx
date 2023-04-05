import Image from 'next/image';
import { AllBlogs, Blog } from '@/types';
import styled, { keyframes } from 'styled-components';
import homePageImage from '../../public/Images/homePageBackgroundImage.jpg';
import Card from './Card';
import moment from 'moment';
import { useState } from 'react';
import Pagination from './Pagination';

const blogsPerPage = 4;

const Blogs = ({ blogs }: AllBlogs) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const sortedBlogs = [...blogs].sort((a, b) => {
    return (
      (moment(b.createdAt).format('X') as any) -
      (moment(a.createdAt).format('X') as any)
    );
  });

  return (
    <>
      <ImageWrapper>
        <Image
          style={{ position: 'fixed' }}
          src={homePageImage}
          alt='Home Page Image'
        />
      </ImageWrapper>

      <BlogsContainer key={currentPage}>
        {sortedBlogs
          .slice((currentPage - 1) * blogsPerPage, blogsPerPage * currentPage)
          .map((blog: Blog, index: number) => (
            <Card key={blog.id} {...blog} index={index} />
          ))}
      </BlogsContainer>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default Blogs;

const FadeIn = keyframes`
  from {opacity: 0; transform: translateY(0.5rem)};
  to {opacity: 1}
`;

const BlogsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  animation: ${FadeIn} 1s;
`;

const ImageWrapper = styled.div`
  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: 0.3;
  }
`;
