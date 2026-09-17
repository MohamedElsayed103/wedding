import { listOrders } from "@/lib/admin/store";
import type { Order } from "@/lib/admin/types";
import { LeadsManager } from "./LeadsManager";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  let orders: Order[] = [];
  let tableMissing = false;
  try {
    orders = await listOrders();
  } catch {
    // orders table not created yet
    tableMissing = true;
  }
  return <LeadsManager orders={orders} tableMissing={tableMissing} />;
}
