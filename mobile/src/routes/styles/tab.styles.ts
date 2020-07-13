import styled, {css} from 'styled-components/native';

interface IconWrapperProps {
  focused?: boolean;
}

export const IconWrapper = styled.View<IconWrapperProps>`
  border-radius: 24px;

  ${(props) =>
    props.focused &&
    css`
      border: 1.4px solid #000;
    `}
`;

export const Avatar = styled.Image`
  margin: 4px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;
