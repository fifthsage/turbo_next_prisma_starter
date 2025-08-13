/* eslint-disable turbo/no-undeclared-env-vars */
import { getBasicAuthFromSecret } from "../lib/crypto";

type PaymentCardResponse = {
  amount: number;
  issuerCode: string;
  acquirerCode?: string | null;
  number: string;
  installmentPlanMonths: number;
  approveNo: string;
  useCardPoint: boolean;
  cardType: string;
  ownerType: string;
  acquireStatus:
    | "READY"
    | "REQUESTED"
    | "COMPLETED"
    | "CANCEL_REQUESTED"
    | "CANCELED";
  isInterestFree: boolean;
  interestPayer?: string | null;
};

type PaymentVirtualAccountResponse = {
  accountType: string;
  accountNumber: string;
  bankCode: string;
  customerName: string;
  dueDate: string;
  refundStatus: "NONE" | "PENDING" | "FAILED" | "PARTIAL_FAILED" | "COMPLETED";
  expired: boolean;
  settlementStatus: string;
  refundReceiveAccount: {
    bankCode: string;
    accountNumber: string;
    holderName: string;
  };
};

type PaymentCancelResponse = {
  cancelAmount: number;
  cancelReason: string;
  taxFreeAmount: number;
  taxExemptionAmount: number;
  refundableAmount: number;
  easyPayDiscountAmount: number;
  canceledAt: string;
  transactionKey: string;
  receiptKey?: string | null;
  cancelStatus: string;
  cancelRequestId?: string | null;
};

type PaymentFailureResponse = {
  code: string;
  message: string;
};

type PaymentResponse = {
  version: string;
  paymentKey: string;
  type: "NORMAL" | "BILLING" | "BRANDPAY";
  orderId: string;
  orderName: string;
  mId: string;
  currency: string;
  method: string;
  totalAmount: number;
  balanceAmount: number;
  status:
    | "READY"
    | "IN_PROGRESS"
    | "WAITING_FOR_DEPOSIT"
    | "DONE"
    | "CANCELED"
    | "PARTIAL_CANCELED"
    | "ABORTED"
    | "EXPIRED";
  requestedAt: string;
  approvedAt: string;
  useEscrow: boolean;
  lastTransactionKey?: string | null;
  suppliedAmount: number;
  vat: number;
  cultureExpense: boolean;
  taxFreeAmount: number;
  taxExemptionAmount: number;
  cancels?: PaymentCancelResponse | null;
  isPartialCancelable: boolean;
  card?: PaymentCardResponse | null;
  virtualAccount?: PaymentVirtualAccountResponse | null;
  secret?: string | null;
  mobilePhone?: {
    customerMobilePhone: string;
    settlementStatus: string;
    receiptUrl: string;
  } | null;
  giftCertificate?: {
    approveNo: string;
    settlementStatus: string;
  } | null;
  transfer?: { bankCode: string; settlementStatus: string } | null;
  receipt?: { url: string } | null;
  checkout?: { url: string } | null;
  easyPay?: { provider: string; amount: number; discountAmount: number };
  country: string;
  failure?: PaymentFailureResponse;
  cashReceipt?: {
    type: string;
    receiptKey: string;
    issueNumber: string;
    receiptUrl: string;
    amount: number;
    taxFreeAmount: number;
  };
  cashReceipts?: {
    receiptKey: string;
    orderId: string;
    orderName: string;
    type: string;
    issueNumber: string;
    receiptUrl: string;
    businessNumber: string;
    transactionType: "CONFIRM" | "CANCEL";
    amount: number;
    taxFreeAmount: number;
    issueStatus: string;
    failure: PaymentFailureResponse;
    customerIdentityNumber: string;
    requestedAt: string;
  };
  discount?: { amount: number };
};

const URL = "https://api.tosspayments.com/v1/payments";

export default function tossPayment() {
  return {
    confirm: async <T>(input: T) => {
      const response = await fetch(`${URL}/confirm`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          Authorization: getBasicAuthFromSecret(
            process.env.TOSS_PAYMENT_SECRET,
          ),
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.code) {
        const { message, code } = data as PaymentFailureResponse;
        throw new Error(`${message} (${code})`);
      }

      return data as PaymentResponse;
    },
    cancel: async <T>(paymentKey: string, input: T) => {
      const response = await fetch(`${URL}/${paymentKey}/cancel`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          Authorization: getBasicAuthFromSecret(
            process.env.TOSS_PAYMENT_SECRET,
          ),
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.code) {
        const { message, code } = data as PaymentFailureResponse;
        throw new Error(`${message} (${code})`);
      }

      return data as PaymentResponse;
    },
  };
}
