/* eslint-disable turbo/no-undeclared-env-vars */
import { getBasicAuthFromSecret } from "../lib/crypto";
const URL = "https://api.tosspayments.com/v1/payments";
export default function tossPayment() {
    return {
        confirm: async (input) => {
            const response = await fetch(`${URL}/confirm`, {
                method: "POST",
                body: JSON.stringify(input),
                headers: {
                    Authorization: getBasicAuthFromSecret(process.env.TOSS_PAYMENT_SECRET),
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.code) {
                const { message, code } = data;
                throw new Error(`${message} (${code})`);
            }
            return data;
        },
        cancel: async (paymentKey, input) => {
            const response = await fetch(`${URL}/${paymentKey}/cancel`, {
                method: "POST",
                body: JSON.stringify(input),
                headers: {
                    Authorization: getBasicAuthFromSecret(process.env.TOSS_PAYMENT_SECRET),
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.code) {
                const { message, code } = data;
                throw new Error(`${message} (${code})`);
            }
            return data;
        },
    };
}
