import React from "react";
import { TextInputProps } from "react-native";

import * as S from "./styles";

type Props = TextInputProps & {
  size: string;
};

export function InputPrice({ size, ...rest }: Props) {
  return (
    <S.Container>
      <S.Size>
        <S.Label>{size}</S.Label>
      </S.Size>

      <S.Label>R$</S.Label>

      <S.Input keyboardType="numeric" {...rest} />
    </S.Container>
  );
}
