import type { AppProps } from 'next/app';

import Providers from '@/components/Providers';

import 'antd/dist/reset.css';
import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
};

export default App;
