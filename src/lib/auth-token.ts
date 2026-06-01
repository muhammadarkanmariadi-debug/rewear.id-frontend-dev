"use server";
import { BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD, ENCRYPT_SECRET } from "@/global";
import CryptoJS from "crypto-js";
import { getCookies } from "./cookies";

export const encodeBasicAuth = async (): Promise<string> => {

  const credentials = `${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`;
  return Buffer.from(credentials).toString("base64");
};

export const decryptClientPayload = async (encrypted: string): Promise<string> => {

  const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPT_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const encryptClientPayload = async (payload: string): Promise<string> => {

  const bytes = CryptoJS.AES.encrypt(payload, ENCRYPT_SECRET);
  return bytes.toString();
};

export const resolveAuthHeader = async (credential?: string): Promise<string> => {
  if (!credential) return "";

  if (credential === "Basic") return `Basic ${await encodeBasicAuth()}`;

  const token = await getCookies(credential);
  return `Bearer ${token}`;
};
