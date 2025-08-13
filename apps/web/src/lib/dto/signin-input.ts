class SignInInput {
  email: string;
  password: string;

  constructor(data: SignInInput) {
    this.email = data.email;
    this.password = data.password;
  }
}

export default SignInInput;
