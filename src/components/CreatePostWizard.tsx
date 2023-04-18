import type { FC } from 'react';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

const CreatePostWizard: FC = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex w-full gap-3">
      <Image
        src={user.profileImageUrl}
        alt="Profile image"
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        placeholder="Type some text"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
};

export default CreatePostWizard;
