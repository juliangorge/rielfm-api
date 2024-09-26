import { type SupabaseClient, createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

let supabase: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (!supabase) {
    supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  }
  return supabase;
};
