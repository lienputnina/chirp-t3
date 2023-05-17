import type { FC } from 'react';

import { api } from '~/utils/api';

import { PostView } from './PostView';
import { LoadingPage } from './Loading/LoadingPage';

export const Feed: FC = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex grow flex-col ">
      {...data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};
