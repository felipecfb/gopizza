import React from "react";

import * as S from "./styles";

type Props = {
  uri: string | null;
};

export function Photo({ uri }: Props) {
  if (uri) {
    return <S.Image source={{ uri }} />;
  }

  return (
    <S.Placeholder>
      <S.PlaceholderTitle>Nenhuma foto {"\n"}carregada</S.PlaceholderTitle>
    </S.Placeholder>
  );
}
