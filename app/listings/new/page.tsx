import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CreateListingForm from "@/components/CreateListingForm";

export const dynamic = "force-dynamic";

export default async function NewListingPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?return=/listings/new");

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-manrope text-3xl font-bold text-product-charcoal mb-2">Create a Listing</h1>
        <p className="font-source-sans text-sm text-product-charcoal/50 mb-8">List an item for your neighbors to find.</p>
        <CreateListingForm />
      </div>
    </div>
  );
}