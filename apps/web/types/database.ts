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
      };
      lessons: {
        Row: {
          id: string;
          unit_id: string;
          order_index: number;
          slug: string;
          title: Json;
          description: Json;
          lesson_type: string;
          xp_reward: number;
          estimated_minutes: number;
          is_published: boolean;
        };
        Insert: {
          id?: string;
          unit_id: string;
          order_index: number;
          slug: string;
          title: Json;
          description?: Json;
          lesson_type: string;
          xp_reward?: number;
          estimated_minutes?: number;
          is_published?: boolean;
        };
        Update: {
          order_index?: number;
          title?: Json;
          description?: Json;
          lesson_type?: string;
          xp_reward?: number;
          estimated_minutes?: number;
          is_published?: boolean;
        };
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
          ease_factor?: number;
          interval_days?: number;
          next_review_at?: string;
          repetitions?: number;
        };
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
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
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
  | "reverse_translation";

export type ProgressStatus = "not_started" | "in_progress" | "completed";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
