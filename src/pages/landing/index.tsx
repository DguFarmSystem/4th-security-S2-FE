import LandingPageLayout from '@/components/landing/LandingPageLayout';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <LandingPageLayout>
      <h1>홈화면 (글목록)</h1>
      <Link to="/test">test</Link>
    </LandingPageLayout>
  );
}
