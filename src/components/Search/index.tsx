import React from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";

import { Feather } from "@expo/vector-icons";

import * as S from "./styles";

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
};

export function Search({ onSearch, onClear, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <S.Container>
      <S.InputArea>
        <S.Input placeholder="pesquisar..." {...rest} />

        <S.ButtonClear onPress={onClear}>
          <Feather name="x" size={16} />
        </S.ButtonClear>
      </S.InputArea>

      <S.Button onPress={onSearch}>
        <Feather name="search" size={16} color={COLORS.TITLE} />
      </S.Button>
    </S.Container>
  );
}
