import { apiClient } from "@/lib/api-client";

export type MessageStatus = "new" | "read" | "resolved";

export type ContactMessage = {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  message: string;
  status: MessageStatus;
  createdAt: string;
  created_at?: string;
};

export type CreateMessagePayload = {
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
};

export async function getMessages(status?: MessageStatus) {
  const endpoint = status ? `/api/messages?status=${status}` : "/api/messages";

  const res = await apiClient<ContactMessage[]>(endpoint, {
    auth: true,
  });

  return res.data;
}

export async function getMessage(id: string | number) {
  if (!id || id === "undefined" || id === "null") {
    throw new Error("Message ID is missing.");
  }

  const res = await apiClient<ContactMessage>(`/api/messages/${id}`, {
    auth: true,
  });

  return res.data;
}

export async function createMessage(payload: CreateMessagePayload) {
  return apiClient<{ id: number }>("/api/messages", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateMessageStatus(
  id: string | number,
  status: MessageStatus
) {
  if (!id || id === "undefined" || id === "null") {
    throw new Error("Message ID is missing.");
  }

  return apiClient<null>(`/api/messages/${id}`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify({ status }),
  });
}

export async function deleteMessage(id: string | number) {
  if (!id || id === "undefined" || id === "null") {
    throw new Error("Message ID is missing.");
  }

  return apiClient<null>(`/api/messages/${id}`, {
    method: "DELETE",
    auth: true,
  });
}