import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { AuthenticationForm } from '@/components/Autentification/AutentificationForm';
import Head from 'next/head';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Chat App</title>
        <meta name="description" content="A simple chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl h-3/4 border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <AuthenticationForm />
          <ColorSchemeToggle />
        </div>
      </main>
    </div>
  );
};

export default Home;
