import { OrderDetailView, getAdminOrder } from "@/components/panel/OrderDetailView";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getAdminOrder(id);
  return <OrderDetailView order={order} backHref="/admin/orders" admin />;
}
