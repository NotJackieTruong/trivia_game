export type Category = {
  id: number,
  title: string,
  created_at: string,
  updated_at: string,
  clues_count: number
}

export type Question = {
  id: number,
  answer: string | number,
  question: string,
  value: number,
  airdate?: string,
  created_at?: string,
  updated_at?: string,
  category_id: number,
  game_id?: any,
  invalid_count?: number,
  category: Category
}

export type Answer = {
  question_id: number,
  user_answer: string | number
}

export type QuestionCardType = {
  userAnswers: string | undefined,
  setUserAnswers: (data: string) => void,
  data: Question
}