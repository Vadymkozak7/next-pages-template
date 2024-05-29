
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { AuthenticationForm } from '@/components/Autentification/AutentificationForm';

export default function HomePage() {
  return (
    <>
      <AuthenticationForm />
      <ColorSchemeToggle />
    </>
  );
}
