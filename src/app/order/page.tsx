import type { Metadata } from "next";
import { PRICING } from "@/lib/brand";
import { DESIGN_META } from "@/components/designs/meta";
import { OrderForm } from "./OrderForm";

export const metadata: Metadata = {
  title: "Order your invitation — Zifaf",
  description:
    "Choose a plan and a template, tell us about your day, and we'll craft your wedding invitation film.",
};

export default function OrderPage() {
  return <OrderForm plans={PRICING} templates={DESIGN_META} />;
}
