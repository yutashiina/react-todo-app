export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  completedAt?: string; // ISO文字列で保存
}