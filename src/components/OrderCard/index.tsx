import React from "react";
import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

export type OrderProps = {
  id: string;
  pizza: string;
  image: string;
  status: S.StatusTypesProps;
  table_number: string;
  quantity: string;
};

type Props = TouchableOpacityProps & {
  index: number;
  data: OrderProps;
};

export function OrderCard({ index, data, ...rest }: Props) {
  return (
    <S.Container index={index} {...rest}>
      <S.Image source={{ uri: data.image }} />

      <S.Description>
        Mesa {data.table_number} 🞄 Qnt: {data.quantity}
      </S.Description>

      <S.StatusContainer status={data.status}>
        <S.StatusLabel status={data.status}>{data.status}</S.StatusLabel>
      </S.StatusContainer>
    </S.Container>
  );
}
