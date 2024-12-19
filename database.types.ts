export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      quiz_question_options: {
        Row: {
          created_at: string
          id: string
          order: number | null
          quiz_question_id: string | null
          value: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          order?: number | null
          quiz_question_id?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          order?: number | null
          quiz_question_id?: string | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_question_options_quiz_question_id_fkey"
            columns: ["quiz_question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          answer: string | null
          created_at: string
          expected_duration: number | null
          id: string
          order: number | null
          point_value: number | null
          question: string | null
          resource_id: string | null
          type: string | null
        }
        Insert: {
          answer?: string | null
          created_at?: string
          expected_duration?: number | null
          id?: string
          order?: number | null
          point_value?: number | null
          question?: string | null
          resource_id?: string | null
          type?: string | null
        }
        Update: {
          answer?: string | null
          created_at?: string
          expected_duration?: number | null
          id?: string
          order?: number | null
          point_value?: number | null
          question?: string | null
          resource_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_references: {
        Row: {
          created_at: string
          generated_resource_id: string | null
          id: string
          library_resource_id: string | null
        }
        Insert: {
          created_at?: string
          generated_resource_id?: string | null
          id?: string
          library_resource_id?: string | null
        }
        Update: {
          created_at?: string
          generated_resource_id?: string | null
          id?: string
          library_resource_id?: string | null
        }
        Relationships: []
      }
      resource_tags: {
        Row: {
          created_at: string
          id: string
          resource_id: string | null
          value: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          resource_id?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          resource_id?: string | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resource_tags_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          archived: boolean
          created_at: string
          description: string | null
          expected_duration: number | null
          grade_level: string | null
          id: string
          last_modified: string | null
          name: string | null
          origin: string
          type: string | null
          url: string | null
          value: string | null
        }
        Insert: {
          archived?: boolean
          created_at?: string
          description?: string | null
          expected_duration?: number | null
          grade_level?: string | null
          id?: string
          last_modified?: string | null
          name?: string | null
          origin?: string
          type?: string | null
          url?: string | null
          value?: string | null
        }
        Update: {
          archived?: boolean
          created_at?: string
          description?: string | null
          expected_duration?: number | null
          grade_level?: string | null
          id?: string
          last_modified?: string | null
          name?: string | null
          origin?: string
          type?: string | null
          url?: string | null
          value?: string | null
        }
        Relationships: []
      }
      user_resources: {
        Row: {
          created_at: string
          id: number
          resource_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          resource_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          resource_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_resources_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_resources_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          complete: boolean | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          title: string | null
        }
        Insert: {
          complete?: boolean | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          title?: string | null
        }
        Update: {
          complete?: boolean | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
