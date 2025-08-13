class SignUpInput {
  email: string;
  password: string;

  constructor(data: SignUpInput) {
    this.email = data.email;
    this.password = data.password;
  }
}

export default SignUpInput;
