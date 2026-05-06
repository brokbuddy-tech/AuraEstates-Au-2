# AuraEstates-Au-2

Standalone Next.js public template for client deployments.

Required env vars:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_ORG_SLUG`
- `TEMPLATE_HEX_CODE`

Deployment contract:

- Data loads from `/api/public/templates/:slug/:templateHexCode`
- `:slug` must match the organization slug
- `:templateHexCode` must match the organization template code

Checks before deploy:

- `npm run typecheck`
- `npm run build`

Reference:

- See [templates/README.md](../../README.md) for the shared deployment contract
