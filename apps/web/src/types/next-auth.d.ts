import "next-auth/jwt";

export type {
  Account,
  DefaultSession,
  Profile,
  Session,
  User,
} from "@auth/core/types";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    contact?: string;
    profileImageUrl?: string;
  }
  interface Account {
    provider: string;
    type: string;
    providerAccointId: string;
    token_type: string;
    expires_at: number;
    refresh_token_expires_in: number;
    scope: string;
  }
  interface Profile {
    id: number;
    connected_at: string;
    properties: {
      nickname: string;
    };
    kakao_account: {
      profile_nickName_needs_argreement: boolean;
      profile: Record<string, unknown>;
      has_email: boolean;
      email_needs_agreement: boolean;
      is_email_valid: boolean;
      is_email_verified: boolean;
      email: string;
      has_phone_number: boolean;
      phone_number_needs_agreement: boolean;
      phone_number: string;
      birthday_needs_agreement: boolean;
      birthday?: string;
      gender_needs_agreement: boolean;
      gender?: string;
    };
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
