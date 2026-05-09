import { NextResponse } from "next/server";
import { getPropertyById } from "@/lib/api";
import { getRequestAgencySlug } from "@/lib/server-agency";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const agencySlug = await getRequestAgencySlug();
  const property = await getPropertyById(id, agencySlug);

  if (!property) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }

  return NextResponse.json(property, {
    headers: {
      "Cache-Control": "s-maxage=120, stale-while-revalidate=300",
    },
  });
}
