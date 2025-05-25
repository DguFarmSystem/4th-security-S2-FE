import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { useAuthStore } from '@/stores/authStore';

export default function SignInPage() {
  const navigate = useNavigate();
  const { setIsUnivAuthenticated, setIsGuest } = useAuthStore();

  const handleSelect = () => {
    setIsGuest(false);
    setIsUnivAuthenticated(true);
    navigate(PATH.ROOT);
  };

  return (
    <div className="bg-black text-white h-screen flex flex-col justify-center items-center p-8">
      <h1 className="text-lg mb-6">
        꾸기님, 오늘도 멋진 재능의 만남을 기대할게요!
      </h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleSelect}
          className="bg-white text-black px-6 py-3 rounded"
        >
          김민서(○)로 계속하기
        </button>
      </div>
    </div>
  );
}
