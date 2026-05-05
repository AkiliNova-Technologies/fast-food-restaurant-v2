"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { PageHeader } from "@/components/dashboard/shared/page-header";
import { ConfirmDeleteDialog } from "@/components/dashboard/shared/confirm-delete-dialog";
import {
  MessageDetails,
  type MessageDetailsData,
} from "@/app/dashboard/messages/message-details";
import {
  deleteMessage,
  getMessage,
  updateMessageStatus,
} from "@/services/api/messages";

export default function MessageDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [message, setMessage] = useState<MessageDetailsData | null>(null);
  const [status, setStatus] =
    useState<MessageDetailsData["status"]>("new");
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    async function loadMessage() {
      try {
        const data = await getMessage(params.id);
        setMessage(data);
        setStatus(data.status);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load message");
      }
    }

    loadMessage();
  }, [params.id]);

  async function handleSaveStatus() {
    if (!message) return;

    try {
      await updateMessageStatus(message.id, status);
      toast.success("Message status updated successfully");
      router.push("/dashboard/messages");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update message");
    }
  }

  async function handleDelete() {
    if (!message) return;

    try {
      await deleteMessage(message.id);
      toast.success("Message deleted successfully");
      setDeleteOpen(false);
      router.push("/dashboard/messages");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete message");
    }
  }

  if (!message) {
    return <p className="text-sm text-stone-500">Loading message...</p>;
  }

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title={`Message #${message.id}`}
          description="View customer contact details, inquiry content and update response status."
          backHref="/dashboard/messages"
        />

        <MessageDetails
          message={message}
          status={status}
          onStatusChange={setStatus}
          onSaveStatus={handleSaveStatus}
          onDelete={() => setDeleteOpen(true)}
        />
      </div>

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete message?"
        description={`This will permanently delete the message from ${message.name}.`}
        onConfirm={handleDelete}
      />
    </>
  );
}