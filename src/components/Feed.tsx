import type { FC } from 'react';

import { api } from '~/utils/api';

import { PostView } from './PostView';
import { LoadingPage } from './Loading/LoadingPage';

export const Feed: FC = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};
