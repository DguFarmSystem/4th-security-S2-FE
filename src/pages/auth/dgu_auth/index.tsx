import { useFunnel } from '@/hooks/useFunnel';
import JoinPromptPage from '@/components/auth/dgu_auth/JoinPromptPage';
import JoinFormPage from '@/components/auth/dgu_auth/JoinFormPage';

const DGU_AUTH_STEPS = {
  JOIN_PROMPT: 'joinPrompt',
  JOIN_FORM: 'joinForm',
} as const;

type DGUAuthStep = (typeof DGU_AUTH_STEPS)[keyof typeof DGU_AUTH_STEPS];

export default function DGUAuthenticationPage() {
  const { Funnel, setStep } = useFunnel<DGUAuthStep>(
    DGU_AUTH_STEPS.JOIN_PROMPT
  );

  return (
    <Funnel>
      <Funnel.Step step={DGU_AUTH_STEPS.JOIN_PROMPT}>
        <JoinPromptPage onNext={() => setStep(DGU_AUTH_STEPS.JOIN_FORM)} />
      </Funnel.Step>
      <Funnel.Step step={DGU_AUTH_STEPS.JOIN_FORM}>
        <JoinFormPage onPrev={() => setStep(DGU_AUTH_STEPS.JOIN_PROMPT)} />
      </Funnel.Step>
    </Funnel>
  );
}
