import IconBack from '@/assets/icons/IconBack.svg?react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/common/input/Input';
import { useState, useEffect } from 'react';
import Button from '@/components/common/button/Button';
import { verificationCodeFormatTime } from '@/utils/formatTime';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { useAuthStore } from '@/stores/authStore';
import DGUAuthLayout from './DGUAuthLayout';

interface JoinFormPageProps {
  onPrev: () => void;
}

interface FormValues {
  nickname: string;
  email: string;
  verificationCode: string;
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@(dgu\.edu|dgu\.ac\.kr)$/i;
const VERIFICATION_TIME_SECONDS = 1 * 60;

export default function JoinFormPage({ onPrev }: JoinFormPageProps) {
  const { setIsGuest, setIsUnivAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isEmailVerificationSent, setIsEmailVerificationSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [remainingTime, setRemainingTime] = useState(VERIFICATION_TIME_SECONDS);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      nickname: '',
      email: '',
      verificationCode: '',
    },
  });

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (isTimerActive && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsTimerActive(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerActive, remainingTime]);

  const handleDguAuth = (data: FormValues) => {
    if (!isEmailVerified) {
      setError('verificationCode', {
        message: '인증번호를 확인해주세요.',
      });
      return;
    }
    // 실제 회원가입 로직 필요
    console.log(data);
    setIsGuest(false);
    setIsUnivAuthenticated(true);
    navigate(PATH.ROOT);
  };

  const handleVerifyEmail = () => {
    const userEmail = watch('email');
    if (!EMAIL_REGEX.test(userEmail)) {
      setError('email', {
        message: '@dgu.edu 또는 @dgu.ac.kr 도메인만 사용 가능합니다',
      });
      return;
    }
    clearErrors('email');
    clearErrors('verificationCode');
    setIsEmailVerificationSent(true);
    setRemainingTime(VERIFICATION_TIME_SECONDS);
    setIsEmailVerified(false);
    setIsTimerActive(true);

    // 실제 이메일 인증번호 발송 API 호출 필요
  };

  const handleVerifyCode = () => {
    const code = watch('verificationCode');
    if (!code) {
      setError('verificationCode', {
        message: '인증번호를 입력해주세요',
      });
      return;
    }

    if (remainingTime === 0) {
      setError('verificationCode', {
        message: '인증 시간이 만료되었습니다. 다시 인증요청을 진행해주세요.',
      });
      return;
    }

    // 실제 인증번호 확인 API 호출 및 성공시 아래 로직 수행
    clearErrors('verificationCode');
    setIsTimerActive(false);
    setIsEmailVerified(true);
  };

  return (
    <DGUAuthLayout>
      <IconBack
        className="size-12 -ml-2 mb-3 cursor-pointer"
        onClick={onPrev}
      />
      <h1 className="text-4xl font-bold text-primary">회원가입</h1>

      <form
        onSubmit={handleSubmit(handleDguAuth)}
        className="w-full h-full mt-10 flex flex-col"
      >
        <Input
          {...register('nickname', {
            required: '닉네임을 입력해주세요',
            minLength: {
              value: 2,
              message: '닉네임은 2자 이상이어야 합니다',
            },
            maxLength: {
              value: 10,
              message: '닉네임은 10자 이하여야 합니다',
            },
          })}
          label="닉네임"
          labelClassName="text-md text-white"
          placeholder="닉네임을 입력하세요"
          description={
            watch('nickname')?.length < 2 || watch('nickname')?.length > 10
              ? '2-10자 이내로 입력해주세요'
              : ''
          }
          errorMessage={errors.nickname?.message}
          className="focus:ring-primary"
        />

        <h1 className="text-2xl font-bold mt-8 mb-3">학교 웹메일 인증</h1>

        <div className="flex flex-col gap-3 relative">
          <Input
            {...register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: EMAIL_REGEX,
                message: '@dgu.edu 또는 @dgu.ac.kr 도메인만 사용 가능합니다',
              },
            })}
            placeholder="웹메일 주소를 입력하세요"
            description={
              watch('email')?.length >= 0 && !EMAIL_REGEX.test(watch('email'))
                ? '@dgu.edu 또는 @dgu.ac.kr 도메인만 사용 가능합니다'
                : ''
            }
            errorMessage={errors.email?.message}
            className="pr-[90px] focus:ring-primary"
            disabled={isEmailVerified}
          />
          <button
            type="button"
            onClick={handleVerifyEmail}
            className="absolute right-0 top-0 h-9 px-4 w-[90px] bg-gray-500 hover:enabled:bg-gray-500/90 rounded-[3px] disabled:cursor-not-allowed whitespace-nowrap"
            disabled={isEmailVerified}
          >
            {isEmailVerified ? '인증 완료' : '인증 요청'}
          </button>

          {isEmailVerificationSent && !isEmailVerified && (
            <div className="relative">
              <Input
                {...register('verificationCode', {
                  required: '인증번호를 입력해주세요',
                })}
                placeholder="인증번호를 입력하세요"
                errorMessage={errors.verificationCode?.message}
                className="pr-[140px] focus:ring-primary"
                disabled={remainingTime === 0}
              />
              <div className="absolute right-0 top-0 flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  {verificationCodeFormatTime(remainingTime)}
                </span>
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  className={`h-9 px-4 w-[90px] rounded-[3px] ${
                    remainingTime === 0
                      ? 'bg-gray-500 text-gray-200 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                  disabled={remainingTime === 0}
                >
                  확인
                </button>
              </div>
              {remainingTime === 0 && (
                <p className="text-red-500 text-sm mt-1">
                  인증 시간이 만료되었습니다. 다시 인증요청을 진행해주세요.
                </p>
              )}
            </div>
          )}

          {isEmailVerified && (
            <p className="text-primary text-md">
              이메일 인증이 완료되었습니다.
            </p>
          )}
        </div>

        <Button type="submit" className="mt-auto">
          가입하고 시작하기
        </Button>
      </form>
    </DGUAuthLayout>
  );
}
