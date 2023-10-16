import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HandPalm, Play } from 'phosphor-react';
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import * as zod from 'zod';
import { Countdown } from './components/Countdown';
import { zodResolver } from '@hookform/resolvers/zod';
import { CyclesContext } from '../../context/CyclesContext';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(3, 'Informe a tarefa.'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo deve ser de no mínimo 05 minutos.')
    .max(60, 'O ciclo deve ser de no máximo 60 minutos.'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const Home = () => {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });
  const { handleSubmit, watch, reset } = newCycleForm;
  const taskWatch = watch('task');
  const minutesAmountWatch = watch('minutesAmount');
  const isSubmitDisabled = !taskWatch || minutesAmountWatch < 1;

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data);
    reset();
  };

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
};
