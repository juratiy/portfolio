import { imageRedirect } from '@/lib/supabase';
import { apiError } from '@/lib/api-response';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  try { return await imageRedirect(request); }
  catch (error) { return apiError(error); }
}
