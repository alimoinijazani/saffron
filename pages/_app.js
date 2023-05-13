import '@/styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { StoreProvider } from '@/utils/Store';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <StoreProvider>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </StoreProvider>
      </SessionProvider>
      <Analytics
        beforeSend={(e) => {
          if (e.url.includes('private')) return null;
          return e;
        }}
      />
    </>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=لطفا وارد حساب کاربری شوید');
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return children;
}
