import styled from 'styled-components';
import { Comment, CommentsProps } from '@/types';
import moment from 'moment';

const Comments = ({ comments, isDetailsPage = false }: CommentsProps) => {
  return (
    <AllComments>
      <CommentTitle>Comments</CommentTitle>
      {comments.map((cmt: Comment) => (
        <>
          {isDetailsPage && <h3>{cmt.title}</h3>}
          <SingleComment key={cmt.id}>{cmt.description}</SingleComment>
          {isDetailsPage && (
            <>
              <p>
                Created {moment(cmt.createdAt).fromNow()}, updated{' '}
                {moment(cmt.createdAt).fromNow()}
              </p>
              <hr />
            </>
          )}
        </>
      ))}
    </AllComments>
  );
};

export default Comments;

const AllComments = styled.ul`
  margin-top: 4rem;
  padding: 0;
`;

const SingleComment = styled.li`
  font-size: 1.2rem;
  font-style: italic;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
  margin: 1rem 0;
`;

const CommentTitle = styled.h4`
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 1px;
  margin-bottom: 2rem;
`;
