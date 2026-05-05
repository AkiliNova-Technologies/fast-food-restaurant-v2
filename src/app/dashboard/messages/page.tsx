"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DataTable } from "@/components/data-table";
import { ConfirmDeleteDialog } from "@/components/dashboard/shared/confirm-delete-dialog";
import { deleteMessage, getMessages } from "@/services/api/messages";
import { getMessageColumns, type Message } from "./columns";

export default function MessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadMessages() {
    try {
      setLoading(true);
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  const columns = useMemo(
    () =>
      getMessageColumns({
        onView: (message) => router.push(`/dashboard/messages/${message.id}`),
        onDelete: (message) => setSelectedMessage(message),
      }),
    [router]
  );

  async function handleDelete() {
    if (!selectedMessage) return;

    try {
      await deleteMessage(selectedMessage.id);
      toast.success("Message deleted successfully");
      setSelectedMessage(null);
      loadMessages();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete message");
    }
  }

  return (
    <>
      <DataTable
        title="Messages"
        description="View customer inquiries submitted from the contact page."
        data={messages}
        columns={columns}
        searchKey="name"
        loading={loading}
        searchPlaceholder="Search messages..."
      />

      <ConfirmDeleteDialog
        open={!!selectedMessage}
        onOpenChange={(open) => !open && setSelectedMessage(null)}
        title="Delete message?"
        description={`This will permanently delete the message from ${
          selectedMessage?.name ?? "this customer"
        }.`}
        onConfirm={handleDelete}
      />
    </>
  );
}