import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { PATH } from '@/constants/path';

export default function DGUAuthenticationPage() {
  const [step, setStep] = useState<'info' | 'form'>('info');
  const navigate = useNavigate();
  const { setIsGuest, setIsUnivAuthenticated } = useAuthStore();

  const completeSignup = () => {
    setIsGuest(false);
    setIsUnivAuthenticated(true);
    navigate(PATH.ROOT);
  };

  if (step === 'info') {
    return (
      <div className="bg-black text-pink-400 h-screen flex flex-col items-center justify-center px-6">
        <h2 className="text-xl font-bold">아직 SOT의 회원이 아니시네요.</h2>
        <p className="text-sm text-white mt-2">
          지금 가입하고 재능을 나눠보세요 :)
        </p>
        <button
          onClick={() => setStep('form')}
          className="mt-6 bg-pink-500 text-white px-6 py-2 rounded"
        >
          지금 시작하기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white h-screen flex flex-col justify-center items-center px-6">
      <input
        placeholder="닉네임"
        className="w-full max-w-sm p-2 mb-4 rounded"
      />
      <div className="w-full max-w-sm space-y-2">
        <p className="text-sm text-gray-300">학교 웹메일 인증</p>
        <input placeholder="이메일 입력" className="w-full p-2 rounded" />
        <input placeholder="인증번호 입력" className="w-full p-2 rounded" />
      </div>
      <button
        onClick={completeSignup}
        className="mt-6 bg-pink-500 px-6 py-2 rounded text-white"
      >
        가입하고 시작하기
      </button>
    </div>
  );
}
