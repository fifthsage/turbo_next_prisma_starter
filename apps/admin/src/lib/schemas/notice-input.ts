import { object, string } from "zod";

const schema = object({
  title: string({ message: "필수 입력값입니다." }),
  content: string({ message: "필수 입력값입니다." }),
  top: string({ message: "필수 입력값입니다." }),
});

export default schema;
