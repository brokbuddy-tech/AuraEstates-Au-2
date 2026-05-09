import { NextResponse } from "next/server";
import { getListings } from "@/lib/api";
import { getRequestAgencySlug } from "@/lib/server-agency";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());
  const agencySlug = await getRequestAgencySlug();
  const results = await getListings(params, agencySlug);

  return NextResponse.json(results, {
    headers: {
      "Cache-Control": "s-maxage=120, stale-while-revalidate=300",
    },
  });
}
