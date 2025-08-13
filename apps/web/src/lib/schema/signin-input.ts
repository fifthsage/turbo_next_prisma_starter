import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식을 입력해 주세요." }),
  password: z.string().min(1, { message: "필수 입력값입니다." }),
});

export default schema;
