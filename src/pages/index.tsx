import { useEffect } from 'react';
import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';
import { Blog, AllBlogs } from '@/types';
import { useQuery } from '@tanstack/react-query';
import Blogs from '@/components/Blogs';
import { GlobalStyle } from '../styles/GlobalStyle';
import { useDispatch } from 'react-redux';
import { setBlogs } from '@/store/blogs-slice';

const endpoint = 'https://6144e843411c860017d256f0.mockapi.io/api/v1/posts';

const fetchBlogs = async () => {
  const res = await fetch(endpoint);
  const results = await res.json();
  return results;
};

const Home: NextPage<{ blogs: Blog[] }> = ({ blogs }: AllBlogs) => {
  const dispatch = useDispatch();

  const { isLoading, error, data } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
    initialData: blogs,
  });

  useEffect(() => {
    if (!isLoading && !error && data) {
      dispatch(setBlogs(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) {
    return <p>Oops! Something went wrong!</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Next-Typescript</title>
        <meta name='description' content='Technical assessment' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <GlobalStyle />
      <Blogs blogs={data} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const results = await fetchBlogs();
  return {
    props: {
      blogs: results,
    },
    revalidate: 30,
  };
};

export default Home;
