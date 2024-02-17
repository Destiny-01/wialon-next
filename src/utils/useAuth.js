import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { parseCookies } from 'nookies';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const isAccessToken = cookies.accessToken;

    if (!isAccessToken) {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, []);

  return <></>; // Return empty fragment to satisfy React's rules
};
