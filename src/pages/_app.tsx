import type { AppProps } from 'next/app';

import { Providers } from '@/components/Providers';
import { PageContainer } from '@/components/PageContainer';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <PageContainer>
        <Component {...pageProps} />
      </PageContainer>
    </Providers>
  );
};

export default App;
