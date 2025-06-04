import { auth as authMiddleware } from "@/app/_lib/auth";

export { authMiddleware as middleware };  // Forma correcta de exportar

export const config = {
  matcher: ["/account"],
};