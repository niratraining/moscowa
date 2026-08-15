import { OrderDetailView, getAccountOrder } from "@/components/panel/OrderDetailView";

export default async function AccountOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getAccountOrder(id);
  return <OrderDetailView order={order} backHref="/account/orders" />;
}
