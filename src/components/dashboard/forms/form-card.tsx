import { Card, CardContent } from "@/components/ui/card";

export function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="rounded-[1.5rem] border-orange-100 bg-white py-0">
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}