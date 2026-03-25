/* ============================================================
   Supabase Database Types for ToolMind
   ============================================================ */

// ─── Row Types ───────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  created_at: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  url: string;
  image_url: string | null;
  category_id: string | null;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Open Source';
  is_featured: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

// ─── Joined Types (for queries with relations) ───────────────

export interface ToolWithCategory extends Tool {
  category: Category | null;
}

// ─── Insert / Update Types ───────────────────────────────────

export type CategoryInsert = Omit<Category, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string;
};

export type CategoryUpdate = Partial<CategoryInsert>;

export type ToolInsert = Omit<Tool, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type ToolUpdate = Partial<ToolInsert>;

// ─── Database Schema Type ────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: CategoryInsert;
        Update: CategoryUpdate;
      };
      tools: {
        Row: Tool;
        Insert: ToolInsert;
        Update: ToolUpdate;
      };
    };
  };
}
