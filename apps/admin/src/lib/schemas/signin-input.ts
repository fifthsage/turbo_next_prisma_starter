import { object, string } from "zod";

const schema = object({
  email: string().email("올바른 이메일 형식으로 입력해 주세요."),
  password: string()
    .min(4, "비밀번호는 최소 4자리 이상입니다.")
    .max(12, "비밀번호는 최소 12자리 이하입니다."),
});

export default schema;
