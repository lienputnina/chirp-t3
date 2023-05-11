import type { FC } from 'react';
import { useState } from 'react';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { api } from '~/utils/api';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from './Loading/LoadingSpinner';

const CreatePostWizard: FC = () => {
  const { user } = useUser();

  const [input, setInput] = useState('');

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput('');
      void ctx.posts.getAll.invalidate();
    },

    onError: (event) => {
      const errorMessage = event.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error('Failed to post! Please try again later');
      }
    },
  });

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
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            if (input !== '') {
              mutate({ content: input });
            }
          }
        }}
        disabled={isPosting}
      />
      {input !== '' && !isPosting && (
        <button onClick={() => mutate({ content: input })}>Post</button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

export default CreatePostWizard;
