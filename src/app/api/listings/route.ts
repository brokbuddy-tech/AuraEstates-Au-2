import { NextResponse } from "next/server";
import { getListings } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());
  const results = await getListings(params);

  return NextResponse.json(results, {
    headers: {
      "Cache-Control": "s-maxage=120, stale-while-revalidate=300",
    },
  });
}
