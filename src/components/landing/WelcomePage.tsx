import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { OauthProvider } from '@/types/oauth/oauthType';
import IconMainLogo from '@/assets/icons/IconMainLogo.svg?react';
import { useAuthStore } from '@/stores/authStore';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { setIsGuest } = useAuthStore();

  const handleGuest = () => {
    setIsGuest(true);
    navigate(PATH.ROOT);
  };

  return (
    <div className="h-screen bg-pink-500 text-white flex flex-col justify-center items-center px-6">
      <IconMainLogo />
      <p className="text-lg mb-10">우리들의 재능이 이어지는 공간</p>
      <button
        onClick={() => navigate(PATH.OAUTH_CALLBACK(OauthProvider.KAKAO))}
        className="w-full max-w-xs py-3 bg-yellow-400 text-black rounded mb-3"
      >
        카카오로 시작하기
      </button>
      <button
        onClick={handleGuest}
        className="w-full max-w-xs py-3 bg-black text-white rounded"
      >
        로그인 없이 둘러보기
      </button>
    </div>
  );
}
