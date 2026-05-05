"use client";

import {
  MailIcon,
  PhoneIcon,
  SaveIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";

import { FormCard } from "@/components/dashboard/forms/form-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type MessageDetailsData = {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  message: string;
  status: "new" | "read" | "resolved";
  createdAt: string;
};

type MessageDetailsProps = {
  message: MessageDetailsData;
  status: MessageDetailsData["status"];
  onStatusChange: (status: MessageDetailsData["status"]) => void;
  onSaveStatus: () => void;
  onDelete: () => void;
};

function statusClass(status: MessageDetailsData["status"]) {
  switch (status) {
    case "resolved":
      return "bg-green-50 text-green-700";
    case "read":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-red-50 text-red-700";
  }
}

function formatDate(value?: string | null) {
  if (!value) return "No expiry";

  return new Intl.DateTimeFormat("en-UG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function MessageDetails({
  message,
  status,
  onStatusChange,
  onSaveStatus,
  onDelete,
}: MessageDetailsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <FormCard>
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 border-b border-orange-100 pb-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold text-stone-500">
                Message #{message.id}
              </p>
              <h2 className="mt-1 text-2xl font-bold text-stone-950">
                {message.subject || "General Message"}
              </h2>
            </div>

            <Badge className={`w-fit rounded-full px-3 py-1 ${statusClass(message.status)}`}>
              {message.status}
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-orange-100 bg-orange-50/50 p-4">
              <UserIcon className="size-5 text-orange-500" />
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                Name
              </p>
              <p className="mt-1 font-bold text-stone-950">{message.name}</p>
            </div>

            <div className="rounded-lg border border-orange-100 bg-orange-50/50 p-4">
              <MailIcon className="size-5 text-orange-500" />
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                Email
              </p>
              <p className="mt-1 break-all font-bold text-stone-950">
                {message.email || "Not provided"}
              </p>
            </div>

            <div className="rounded-lg border border-orange-100 bg-orange-50/50 p-4">
              <PhoneIcon className="size-5 text-orange-500" />
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                Phone
              </p>
              <p className="mt-1 font-bold text-stone-950">
                {message.phone || "Not provided"}
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-orange-100 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
              Customer Message
            </p>
            <p className="mt-4 whitespace-pre-wrap leading-7 text-stone-700">
              {message.message}
            </p>
          </div>

          <p className="text-sm text-stone-500">
            Received on {formatDate(message.createdAt)}
          </p>
        </div>
      </FormCard>

      <div className="space-y-6">
        <FormCard>
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-stone-950">
                Message Status
              </h3>
              <p className="mt-1 text-sm text-stone-500">
                Mark this inquiry as read or resolved.
              </p>
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-stone-700">Status</Label>
              <Select value={status} onValueChange={onStatusChange}>
                <SelectTrigger className="min-h-12 w-full rounded-2xl border-orange-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-md p-2">
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={onSaveStatus}
              className="h-12 w-full rounded-2xl bg-red-600 font-bold text-white hover:bg-red-700"
            >
              <SaveIcon className="mr-2 size-4" />
              Save Status
            </Button>
          </div>
        </FormCard>

        <FormCard>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-stone-950">Danger Zone</h3>
            <p className="text-sm text-stone-500">
              Delete this message only when it is no longer needed.
            </p>

            <Button
              onClick={onDelete}
              variant="outline"
              className="h-12 w-full rounded-2xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2Icon className="mr-2 size-4" />
              Delete Message
            </Button>
          </div>
        </FormCard>
      </div>
    </div>
  );
}