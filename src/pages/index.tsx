import { type NextPage } from 'next';
import { api } from '~/utils/api';

import { SignInButton, useUser } from '@clerk/nextjs';
import { CreatePostWizard } from '~/components/CreatePostWizard';
import { Feed } from '~/components/Feed';
import { PageLayout } from '~/components/PageLayout';

const LandingPage: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching asap - cached data
  api.posts.getAll.useQuery();

  // Return empty div, if user isn't loaded
  if (!userLoaded) return <div />;

  return (
    <PageLayout>
      <div className="flex border-b border-slate-400 p-4">
        {!isSignedIn && (
          <div className="flex justify-center">
            <SignInButton />
          </div>
        )}
        {isSignedIn && <CreatePostWizard />}
      </div>
      <Feed />
    </PageLayout>
  );
};

export default LandingPage;
