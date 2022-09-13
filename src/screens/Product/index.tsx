import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import * as S from './styles';

export function Product() {
  return (
    <S.Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <S.Header>
        <S.Title>
          Cadastrar
        </S.Title>
        <TouchableOpacity>
          <S.DeleteLabel>Deletar</S.DeleteLabel>
        </TouchableOpacity>
      </S.Header>
    </S.Container>
  );
}