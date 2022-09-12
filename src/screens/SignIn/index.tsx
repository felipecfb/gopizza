import { KeyboardAvoidingView, Platform } from "react-native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import brandImg from "@assets/brand.png";

import * as S from "./styles";

export function SignIn() {
  return (
    <S.Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <S.Content>
          <S.Brand source={brandImg} />

          <S.Title>Login</S.Title>
          <Input
            placeholder="Email address"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Input placeholder="Password" type="secondary" secureTextEntry />

          <S.ForgotPasswordButton>
            <S.ForgotPasswordLabel>Esqueci minha senha</S.ForgotPasswordLabel>
          </S.ForgotPasswordButton>

          <Button title="Entrar" type="secondary" />
        </S.Content>
      </KeyboardAvoidingView>
    </S.Container>
  );
}
