import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";

import { OrderCard, OrderProps } from "@components/OrderCard";
import { ItemSeparator } from "@components/ItemSeparator";

import * as S from "./styles";
import { useAuth } from "@hooks/auth";

export function Orders() {
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const subscribe = firestore()
      .collection("orders")
      .where("waiter_id", "==", user?.id)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as OrderProps[];
        setOrders(data);
      });

    return () => subscribe();
  }, []);
  return (
    <S.Container>
      <S.Header>
        <S.Title>Pedidos feitos</S.Title>
      </S.Header>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <OrderCard index={index} data={item} />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </S.Container>
  );
}
