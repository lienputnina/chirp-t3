import type { FC } from 'react';
import { LoadingPage } from '~/components/Loading/LoadingPage';
import { PostView } from '~/components/PostView';
import { api } from '~/utils/api';

export interface ProfileFeedProps {
  userId: string;
}
export const ProfileFeed: FC<ProfileFeedProps> = ({ userId }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: userId,
  });

  if (isLoading) return <LoadingPage />;

  if (!data || data.length === 0) return <div>User has not posted</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};
