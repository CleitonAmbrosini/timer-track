import styled from 'styled-components';

export type ButtonVariants = 'primary' | 'secondary' | 'danger' | 'sucess';

interface ButtonContainerProps {
  variant: ButtonVariants;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  border-radius: 10px;
  border: none;
  padding: 10px;
  margin: 5px;
  background-color: ${(props) => props.theme[props.variant]};
  color: ${(props) => props.theme.white};
`;
