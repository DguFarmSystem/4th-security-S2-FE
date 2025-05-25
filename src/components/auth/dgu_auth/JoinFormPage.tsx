import IconBack from '@/assets/icons/IconBack.svg?react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { useAuthStore } from '@/stores/authStore';
import DGUAuthLayout from './DGUAuthLayout';
import JoinForm from './JoinForm';

interface JoinFormPageProps {
  onPrev: () => void;
}

interface FormValues {
  nickname: string;
  email: string;
  verificationCode: string;
}

export default function JoinFormPage({ onPrev }: JoinFormPageProps) {
  const { setIsGuest, setIsUnivAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (data: FormValues) => {
    // 실제 회원가입 로직 필요
    console.log(data);
    setIsGuest(false);
    setIsUnivAuthenticated(true);
    navigate(PATH.ROOT);
  };

  return (
    <DGUAuthLayout>
      <IconBack
        className="size-12 -ml-2 mb-3 cursor-pointer"
        onClick={onPrev}
      />
      <h1 className="text-4xl font-bold text-primary">회원가입</h1>
      <JoinForm onSubmit={handleSubmit} />
    </DGUAuthLayout>
  );
}
