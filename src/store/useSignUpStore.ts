import { create } from "zustand";

type VerificationMessage = {
  text: string;
  type: "success" | "error";
} | null;

type SignUpStore = {
  email: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
  userName: string;
  verificationMessage: VerificationMessage;
  verificationToken: string;

  setEmail: (value: string) => void;
  setVerificationCode: (value: string) => void;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  setUserName: (value: string) => void;
  setVerificationMessage: (value: VerificationMessage) => void;
  setVerificationToken: (value: string) => void;

  clearEmail: () => void;
  clearVerificationCode: () => void;
  reset: () => void;
};

const initialState = {
  email: "",
  verificationCode: "",
  password: "",
  confirmPassword: "",
  userName: "",
  verificationMessage: null as VerificationMessage,
  verificationToken: "",
};

export const useSignUpStore = create<SignUpStore>((set) => ({
  ...initialState,

  setEmail: (value) =>
    set({
      email: value,
      verificationMessage: null,
    }),

  setVerificationCode: (value) =>
    set({
      verificationCode: value,
      verificationMessage: null,
    }),

  setPassword: (value) => set({ password: value }),
  setConfirmPassword: (value) => set({ confirmPassword: value }),
  setUserName: (value) => set({ userName: value }),
  setVerificationMessage: (value) => set({ verificationMessage: value }),
  setVerificationToken: (value) => set({ verificationToken: value }),

  clearEmail: () =>
    set({
      email: "",
      verificationMessage: null,
    }),

  clearVerificationCode: () =>
    set({
      verificationCode: "",
      verificationMessage: null,
    }),

  reset: () => set(initialState),
}));