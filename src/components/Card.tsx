import { useRouter } from 'next/router';
import { Blog, CardContainerProps } from '@/types';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';
import { TfiComments } from 'react-icons/tfi';
import Comments from './Comments';

const images = [
  'https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg',
  'https://www.newsbtc.com/wp-content/uploads/2020/06/mesut-kaya-LcCdl__-kO0-unsplash-scaled.jpg',
  'https://images6.alphacoders.com/312/thumb-1920-312773.jpg',
];

const topics = [
  { name: 'TECHNOLOGY', color: '#47bcd4' },
  { name: 'POPULAR', color: '#5e76bf' },
  { name: 'DESIGN', color: '#cd5b9f' },
];

const Card = ({
  title,
  description,
  updatedAt,
  authors,
  index,
  comments,
  id,
}: Blog) => {
  const { push } = useRouter();
  const lastUpdatedAuthor = [...authors].sort((a, b) => {
    return (
      (moment(b.updatedAt).format('X') as any) -
      (moment(a.updatedAt).format('X') as any)
    );
  })[0];

  const goToDetails = () => {
    push(`/details/${id}`);
  };

  return (
    <CardContainer index={index}>
      <FrontFace>
        <Image
          width={200}
          height={200}
          src={images[index % 3]}
          alt='card image'
        />
        <CardBody>
          <HeaderContainer>
            <Topic
              style={{
                backgroundColor: topics[index % 3].color,
              }}
            >
              {topics[index % 3].name}
            </Topic>
            <LastAuthorUpdate>
              Updated {moment(lastUpdatedAuthor.updatedAt).fromNow()}
            </LastAuthorUpdate>
          </HeaderContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </CardBody>
        <AuthorContainer>
          {/* <Image
              width={200}
              height={200}
              src={lastUpdatedAuthor.avatar}
              alt='author image'
            /> */}
          <Avatar>
            {lastUpdatedAuthor.name.split(' ')[0][0]}
            {lastUpdatedAuthor.name.split(' ')[1][0]}
          </Avatar>
          <AuthorName>{lastUpdatedAuthor.name}</AuthorName>
          <LastPostUpdate>Updated {moment(updatedAt).fromNow()}</LastPostUpdate>
        </AuthorContainer>
      </FrontFace>

      <BackFace>
        <TfiComments
          size={50}
          style={{
            opacity: 0.2,
            position: 'absolute',
            top: '2rem',
            right: '1rem',
          }}
        />

        <Comments comments={comments} />

        <Button onClick={goToDetails} aria-label='Blog details'>
          <ButtonText>Details</ButtonText>
        </Button>
      </BackFace>
    </CardContainer>
  );
};

export default Card;

const FrontFace = styled.div`
  display: flex;
  flex-direction: column;
  transform: rotateY(0);
  background-color: #fff;
  padding-bottom: 1rem;

  & img {
    object-fit: cover;
    width: 100%;
    height: 40%;
    border-radius: 7px;
  }
`;

const CardBody = styled.div`
  padding: 1rem 1.4rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Topic = styled.div`
  border-radius: 50px;
  font-size: 1.1rem;
  padding: 0.2rem 1rem;
  width: max-content;
  color: #fff;
  margin-bottom: 0.8rem;
`;

const Title = styled.h5`
  color: #10182f;
  font-size: 1.7rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.3rem;
  margin: 0 0 4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 0;
`;

const AuthorContainer = styled.div`
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  grid-template-rows: 1.75rem 1.75rem;
  grid-column-gap: 0.7rem;
  padding-top: 1rem;
  padding-left: 1.4rem;
  margin-top: auto;
`;

const Avatar = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-column: 1 / 2;
  grid-row: 1 / 3;

  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 1px;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: blue;
  color: #fff;
  margin-top: auto;
`;

const AuthorName = styled.h6`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0.3px;
`;

const LastAuthorUpdate = styled.p`
  font-size: 1rem;
  font-style: italic;
  text-align: right;
`;

const LastPostUpdate = styled.p`
  font-size: 1rem;
  font-style: italic;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;

const BackFace = styled.div`
  color: #fff;
  background-image: linear-gradient(
    to right bottom,
    rgba(0, 151, 230, 1),
    rgba(220, 221, 225, 1)
  );
  transform: rotateY(180deg);
  overflow: hidden;
  padding: 1.5rem;
`;

const Button = styled.button`
  position: absolute;
  left: 34%;
  bottom: 8%;
  padding: 0.9rem 1.6rem;
  border-radius: 0.2rem;
  transition: all 0.2s;
  border: none;
  color: inherit;
  background-color: #192a56;
  letter-spacing: 2px;
  cursor: pointer;

  &::after {
    content: '';
    display: inline-block;
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: #192a56;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
    transition: all 0.4s;
  }

  &:hover {
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    &::after {
      transform: translateX(-50%) scaleX(1.2) scaleY(1.3);
      opacity: 0;
    }
  }
  &:active,
  &:focus {
    outline: none;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }
`;

const ButtonText = styled.span`
  font-size: calc(1.1vw);

  @media (max-width: 48em) {
    font-size: calc(2.6vw);
  }

  font-family: 'Lato', sans-serif;
  font-weight: 300;
  display: inline-block;
`;

const FadeIn = keyframes`
  from {opacity: 0; transform: translateY(0.5rem)};
  to {opacity: 1}
`;

const CardContainer = styled.div<CardContainerProps>`
  perspective: 120rem;
  position: relative;
  width: 21%;
  height: calc(22vw / 3 * 4);
  margin: 2%;
  color: #10182f;
  animation: ${FadeIn} 1s;
  animation-delay: ${({ index }) => `${index * 0.2}s`};
  opacity: 0;
  animation-fill-mode: forwards;
  @media (max-width: 48em) {
    width: 42%;
    height: calc(43vw / 3 * 4);
    margin: 4%;
  }

  @media (max-width: 34em) {
    width: 92%;
    height: calc(43vw / 3 * 4);
    margin: 4%;
  }

  & > div {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 7px;
    backface-visibility: hidden;
    transition: transform 0.7s ease;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
  }

  &:hover {
    ${FrontFace} {
      transform: rotateY(-180deg);
    }

    ${BackFace} {
      transform: rotateY(0);
    }
  }
`;
