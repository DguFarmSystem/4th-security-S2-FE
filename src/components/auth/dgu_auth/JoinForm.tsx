import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Input } from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import { verificationCodeFormatTime } from '@/utils/formatTime';

interface JoinFormProps {
  onSubmit: (data: FormValues) => void;
}

interface FormValues {
  nickname: string;
  email: string;
  verificationCode: string;
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@(dgu\.edu|dgu\.ac\.kr)$/i;
const VERIFICATION_TIME_SECONDS = 3 * 60;

export default function JoinForm({ onSubmit }: JoinFormProps) {
  const [formStatus, setFormStatus] = useState({
    isEmailVerificationSent: false,
    isEmailVerified: false,
    remainingTime: VERIFICATION_TIME_SECONDS,
    isTimerActive: false,
  });
  const showVerificationCode =
    formStatus.isEmailVerificationSent && !formStatus.isEmailVerified;

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

    if (formStatus.isTimerActive && formStatus.remainingTime > 0) {
      timer = setInterval(() => {
        setFormStatus((prev) => ({
          ...prev,
          remainingTime: prev.remainingTime - 1,
        }));
      }, 1000);
    } else if (formStatus.remainingTime === 0) {
      clearErrors('verificationCode');
      setFormStatus((prev) => ({
        ...prev,
        isTimerActive: false,
      }));
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [formStatus.isTimerActive, formStatus.remainingTime, clearErrors]);

  return (
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
            validate: (value) => {
              if (value && !formStatus.isEmailVerificationSent) {
                return '이메일 인증을 진행해주세요';
              }
              return true;
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
          disabled={formStatus.isEmailVerified}
        />
        <button
          type="button"
          onClick={handleVerifyEmail}
          className="absolute right-0 top-0 h-9 px-4 w-[90px] bg-gray-500 hover:enabled:bg-gray-500/90 rounded-[3px] disabled:cursor-not-allowed whitespace-nowrap"
          disabled={formStatus.isEmailVerified}
        >
          {formStatus.isEmailVerified ? '인증 완료' : '인증 요청'}
        </button>

        {showVerificationCode && (
          <div className="relative">
            <Input
              {...register('verificationCode', {
                required: '인증번호를 입력해주세요',
              })}
              placeholder="인증번호를 입력하세요"
              errorMessage={errors.verificationCode?.message}
              className="pr-[140px] focus:ring-primary"
              disabled={formStatus.remainingTime === 0}
            />
            <div className="absolute right-0 top-0 flex items-center gap-2">
              <span className="text-sm text-gray-400">
                {verificationCodeFormatTime(formStatus.remainingTime)}
              </span>
              <button
                type="button"
                onClick={handleVerifyCode}
                className={`h-9 px-4 w-[90px] rounded-[3px] ${
                  formStatus.remainingTime === 0
                    ? 'bg-gray-500 text-gray-200 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary/90'
                }`}
                disabled={formStatus.remainingTime === 0}
              >
                확인
              </button>
            </div>
            {formStatus.remainingTime === 0 && (
              <p className="text-red-500 text-sm mt-1">
                인증 시간이 만료되었습니다. 다시 인증요청을 진행해주세요.
              </p>
            )}
          </div>
        )}

        {formStatus.isEmailVerified && (
          <p className="text-primary text-md">이메일 인증이 완료되었습니다.</p>
        )}
      </div>

      <Button type="submit" className="mt-auto">
        가입하고 시작하기
      </Button>
    </form>
  );

  function handleDguAuth(data: FormValues) {
    if (!formStatus.isEmailVerificationSent) {
      setError('email', {
        message: '이메일 인증을 진행해주세요',
      });
      return;
    }

    if (!formStatus.isEmailVerified) {
      setError('verificationCode', {
        message: '인증번호를 확인해주세요.',
      });
      return;
    }
    onSubmit(data);
  }

  function handleVerifyEmail() {
    const userEmail = watch('email');
    if (!EMAIL_REGEX.test(userEmail)) {
      setError('email', {
        message: '@dgu.edu 또는 @dgu.ac.kr 도메인만 사용 가능합니다',
      });
      return;
    }
    clearErrors('email');
    clearErrors('verificationCode');
    setFormStatus((prev) => ({
      ...prev,
      isEmailVerificationSent: true,
      remainingTime: VERIFICATION_TIME_SECONDS,
      isEmailVerified: false,
      isTimerActive: true,
    }));

    // 실제 이메일 인증번호 발송 API 호출 필요
  }

  function handleVerifyCode() {
    const code = watch('verificationCode');
    if (!code) {
      setError('verificationCode', {
        message: '인증번호를 입력해주세요',
      });
      return;
    }

    if (formStatus.remainingTime === 0) {
      setError('verificationCode', {
        message: '인증 시간이 만료되었습니다. 다시 인증요청을 진행해주세요.',
      });
      return;
    }

    // 실제 인증번호 확인 API 호출 필요 및 성공시 아래 로직 수행
    clearErrors('verificationCode');
    setFormStatus((prev) => ({
      ...prev,
      isTimerActive: false,
      isEmailVerified: true,
    }));
  }
}
