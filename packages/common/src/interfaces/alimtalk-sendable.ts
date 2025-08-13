interface AlimtalkSendable<T> {
  templateId: string;
  to: string;
  params: T;

  get message(): Record<string, unknown>;
}

export default AlimtalkSendable;
