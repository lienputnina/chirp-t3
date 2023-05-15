import Head from 'next/head';
import { api } from '~/utils/api';

import { createServerSideHelpers } from '@trpc/react-query/server';
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import superjson from 'superjson';
import { appRouter } from '~/server/api/root';
import { prisma } from '~/server/db';

import { PageLayout } from '~/components/PageLayout';
import Image from 'next/image';

type ProfilePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProfilePage: NextPage<ProfilePageProps> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <PageLayout>
        <div className="relative h-36  bg-slate-600">
          <Image
            src={data.profileImageUrl}
            alt={`@${data.username ?? ''}'s profile picture`}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 border-4 border-black bg-black"
            width={128}
            height={128}
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4 text-2xl font-bold">
          {`@${data.username ?? ''}`}
        </div>
        <div className="w-full border-b border-slate-400"></div>
      </PageLayout>
    </>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson,
  });

  const slug = context.params?.slug;

  if (typeof slug !== 'string') throw new Error('no slug');

  const username = slug.replace('@', '');

  await helpers.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default ProfilePage;
