import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Blog, Author, AllBlogs } from '@/types';
import Head from 'next/head';
import moment from 'moment';
import Comments from '@/components/Comments';

const Details = () => {
  const {
    query: { id },
    isReady,
    back,
  } = useRouter();

  const { blogs } = useSelector((state: { blogs: AllBlogs }) => state.blogs);
  if (!isReady) return;

  const { title, description, authors, comments, createdAt, updatedAt } =
    blogs.find((blg: Blog) => blg.id === id) as Blog;

  return (
    <>
      <Head>
        <title>Blog Details</title>
        <meta name='description' content='Technical assessment' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>{title.toUpperCase()}</h1>
      <p>{description}</p>
      <h2>Authors</h2>
      <ul>
        {authors.map((auth: Author) => (
          <li key={auth.id}>{auth.name}</li>
        ))}
      </ul>
      <Comments comments={comments} isDetailsPage />
      <p>This blog is created {moment(createdAt).fromNow()}</p>
      <p>This blog is updated {moment(updatedAt).fromNow()}</p>
      <button onClick={() => back()}>Go Back</button>
    </>
  );
};

export default Details;
