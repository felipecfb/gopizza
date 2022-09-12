import * as S from "./styles";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  return (
    <S.Container>
      <Input
        placeholder="Email address"
        type="secondary"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Input placeholder="Password" type="secondary" secureTextEntry />

      <Button title="Entrar" type="secondary" />
    </S.Container>
  );
}
