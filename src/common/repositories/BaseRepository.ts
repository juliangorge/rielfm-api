import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseClient } from "../clients/supabaseClient";

export class BaseRepository<T> {
  private client: SupabaseClient;

  constructor(private tableName: string) {
    this.client = getSupabaseClient();
  }

  async findAll(): Promise<T[]> {
    const { data, error } = await this.client.from(this.tableName).select("*");
    if (error) throw new Error(error.message);
    return data || [];
  }

  async findById(id: number): Promise<T | null> {
    const { data, error } = await this.client.from(this.tableName).select("*").eq("id", id).maybeSingle();
    if (error) throw new Error(error.message);
    return data || null;
  }
}
