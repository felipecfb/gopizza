import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type Props = TouchableOpacityProps & {
  index: number;
}

export function OrderCard({ index, ...rest }: Props) {
  return (
    <S.Container index={index} {...rest}>
      <S.Image source={{ uri: "https://github.com/felipecfb.png" }} />

      <S.Description>
        Mesa 5 🞄 Qnt: 1
      </S.Description>

      <S.StatusContainer status="Preparando">
        <S.StatusLabel status="Preparando">
          Preparando
        </S.StatusLabel>
      </S.StatusContainer>
    </S.Container>
  );
}