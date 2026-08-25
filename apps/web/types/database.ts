export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          avatar_url: string | null;
          native_language: string;
          ui_language: string;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name?: string | null;
          avatar_url?: string | null;
          native_language?: string;
          ui_language?: string;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          username?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          native_language?: string;
          ui_language?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      courses: {
        Row: {
          id: string;
          slug: string;
          title: Json;
          description: Json;
          source_language: string;
          target_language: string;
          cover_image_url: string | null;
          is_published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: Json;
          description?: Json;
          source_language: string;
          target_language: string;
          cover_image_url?: string | null;
          is_published?: boolean;
          created_at?: string;
        };
        Update: {
          slug?: string;
          title?: Json;
          description?: Json;
          cover_image_url?: string | null;
          is_published?: boolean;
        };
        Relationships: [];
      };
      units: {
        Row: {
          id: string;
          course_id: string;
          order_index: number;
          slug: string;
          title: Json;
          description: Json;
          cefr_level: string;
          icon: string | null;
          is_published: boolean;
        };
        Insert: {
          id?: string;
          course_id: string;
          order_index: number;
          slug: string;
          title: Json;
          description?: Json;
          cefr_level: string;
          icon?: string | null;
          is_published?: boolean;
        };
        Update: {
          order_index?: number;
          title?: Json;
          description?: Json;
          cefr_level?: string;
          icon?: string | null;
          is_published?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "units_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ];
      };
      lessons: {
        Row: {
          id: string;
          unit_id: string | null;
          module_id: string | null;
          order_index: number;
          slug: string;
          title: Json;
          description: Json;
          lesson_type: string;
          xp_reward: number;
          estimated_minutes: number;
          theory_content: Json | null;
          is_published: boolean;
        };
        Insert: {
          id?: string;
          unit_id?: string | null;
          module_id?: string | null;
          order_index: number;
          slug: string;
          title: Json;
          description?: Json;
          lesson_type: string;
          xp_reward?: number;
          estimated_minutes?: number;
          theory_content?: Json | null;
          is_published?: boolean;
        };
        Update: {
          unit_id?: string | null;
          module_id?: string | null;
          order_index?: number;
          slug?: string;
          title?: Json;
          description?: Json;
          lesson_type?: string;
          xp_reward?: number;
          estimated_minutes?: number;
          theory_content?: Json | null;
          is_published?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "lessons_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          }
        ];
      };
      modules: {
        Row: {
          id: string;
          unit_id: string | null;
          domain_id: string | null;
          order_index: number;
          slug: string;
          title: Json;
          description: Json;
          can_do_statements: Json;
          is_published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          unit_id?: string | null;
          domain_id?: string | null;
          order_index: number;
          slug: string;
          title: Json;
          description?: Json;
          can_do_statements?: Json;
          is_published?: boolean;
          created_at?: string;
        };
        Update: {
          unit_id?: string | null;
          domain_id?: string | null;
          order_index?: number;
          slug?: string;
          title?: Json;
          description?: Json;
          can_do_statements?: Json;
          is_published?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "modules_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "modules_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "domains"
            referencedColumns: ["id"]
          }
        ];
      };
      domains: {
        Row: {
          id: string;
          slug: string;
          title: Json;
          description: Json;
          icon: string;
          order_index: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: Json;
          description?: Json;
          icon: string;
          order_index: number;
          is_published?: boolean;
          created_at?: string;
        };
        Update: {
          slug?: string;
          title?: Json;
          description?: Json;
          icon?: string;
          order_index?: number;
          is_published?: boolean;
        };
        Relationships: [];
      };
      user_domains: {
        Row: {
          user_id: string;
          domain_id: string;
          selected_at: string;
        };
        Insert: {
          user_id: string;
          domain_id: string;
          selected_at?: string;
        };
        Update: never;
        Relationships: [
          {
            foreignKeyName: "user_domains_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_domains_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "domains"
            referencedColumns: ["id"]
          }
        ];
      };
      exercises: {
        Row: {
          id: string;
          lesson_id: string;
          order_index: number;
          exercise_type: ExerciseType;
          prompt: Json;
          correct_answer: Json;
          distractors: Json | null;
          explanation: Json | null;
          hint: string | null;
          media_url: string | null;
          difficulty: number;
          tags: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          order_index: number;
          exercise_type: ExerciseType;
          prompt: Json;
          correct_answer: Json;
          distractors?: Json | null;
          explanation?: Json | null;
          hint?: string | null;
          media_url?: string | null;
          difficulty?: number;
          tags?: string[];
          created_at?: string;
        };
        Update: {
          lesson_id?: string;
          order_index?: number;
          exercise_type?: ExerciseType;
          prompt?: Json;
          correct_answer?: Json;
          distractors?: Json | null;
          explanation?: Json | null;
          hint?: string | null;
          media_url?: string | null;
          difficulty?: number;
          tags?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "exercises_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          }
        ];
      };
      vocabulary: {
        Row: {
          id: string;
          course_id: string;
          word: string;
          translation: Json;
          phonetic: string | null;
          audio_url: string | null;
          image_url: string | null;
          part_of_speech: string | null;
          cefr_level: string;
          example_sentence: Json | null;
          tags: string[];
        };
        Insert: {
          id?: string;
          course_id: string;
          word: string;
          translation: Json;
          phonetic?: string | null;
          audio_url?: string | null;
          image_url?: string | null;
          part_of_speech?: string | null;
          cefr_level: string;
          example_sentence?: Json | null;
          tags?: string[];
        };
        Update: {
          word?: string;
          translation?: Json;
          phonetic?: string | null;
          audio_url?: string | null;
          image_url?: string | null;
          part_of_speech?: string | null;
          cefr_level?: string;
          example_sentence?: Json | null;
          tags?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "vocabulary_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ];
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          status: ProgressStatus;
          score: number;
          attempts: number;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          status?: ProgressStatus;
          score?: number;
          attempts?: number;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: ProgressStatus;
          score?: number;
          attempts?: number;
          completed_at?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          }
        ];
      };
      user_exercise_history: {
        Row: {
          id: string;
          user_id: string;
          exercise_id: string;
          vocabulary_id: string | null;
          was_correct: boolean;
          response_time_ms: number;
          answered_at: string;
          ease_factor: number;
          interval_days: number;
          next_review_at: string;
          repetitions: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          exercise_id: string;
          vocabulary_id?: string | null;
          was_correct: boolean;
          response_time_ms?: number;
          answered_at?: string;
          ease_factor?: number;
          interval_days?: number;
          next_review_at?: string;
          repetitions?: number;
        };
        Update: {
          was_correct?: boolean;
          answered_at?: string;
          ease_factor?: number;
          interval_days?: number;
          next_review_at?: string;
          repetitions?: number;
        };
        Relationships: [
          {
            foreignKeyName: "user_exercise_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_exercise_history_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_exercise_history_vocabulary_id_fkey"
            columns: ["vocabulary_id"]
            isOneToOne: false
            referencedRelation: "vocabulary"
            referencedColumns: ["id"]
          }
        ];
      };
      user_stats: {
        Row: {
          user_id: string;
          total_xp: number;
          current_streak: number;
          longest_streak: number;
          last_activity_date: string | null;
          total_lessons_completed: number;
          total_words_learned: number;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          total_xp?: number;
          current_streak?: number;
          longest_streak?: number;
          last_activity_date?: string | null;
          total_lessons_completed?: number;
          total_words_learned?: number;
          updated_at?: string;
        };
        Update: {
          total_xp?: number;
          current_streak?: number;
          longest_streak?: number;
          last_activity_date?: string | null;
          total_lessons_completed?: number;
          total_words_learned?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ];
      };
      achievements: {
        Row: {
          id: string;
          slug: string;
          title: Json;
          description: Json;
          icon: string;
          condition_type: string;
          condition_value: number;
        };
        Insert: {
          id?: string;
          slug: string;
          title: Json;
          description: Json;
          icon: string;
          condition_type: string;
          condition_value: number;
        };
        Update: {
          title?: Json;
          description?: Json;
          icon?: string;
          condition_type?: string;
          condition_value?: number;
        };
        Relationships: [];
      };
      user_achievements: {
        Row: {
          user_id: string;
          achievement_id: string;
          earned_at: string;
        };
        Insert: {
          user_id: string;
          achievement_id: string;
          earned_at?: string;
        };
        Update: never;
        Relationships: [
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      record_answer: {
        Args: {
          p_exercise_id: string;
          p_was_correct: boolean;
          p_ease_factor: number;
          p_interval_days: number;
          p_repetitions: number;
          p_next_review_at: string;
          p_response_time_ms?: number;
          p_vocabulary_id?: string | null;
        };
        Returns: undefined;
      };
      complete_lesson_secure: {
        Args: { p_lesson_id: string; p_score: number };
        Returns: undefined;
      };
      update_streak: {
        Args: { p_user_id: string };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
  };
}

export type ExerciseType =
  | "multiple_choice"
  | "fill_blank"
  | "word_match"
  | "listening"
  | "speaking"
  | "translation"
  | "flashcard"
  | "reorder_words"
  | "dictation"
  | "reverse_translation"
  | "word_bank_fill"
  | "error_correction"
  | "dialogue_fill"
  | "minimal_pairs";

export type ProgressStatus = "not_started" | "in_progress" | "completed";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
