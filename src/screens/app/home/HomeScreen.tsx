import { Block, Text } from '#components';
import { dispatch, useSelector } from '#src/common';
import { Card } from '#src/components/Card/Card';
import { setQuestions } from '#src/redux/slices/questionSlice';
import { ApiClient } from '#src/service/network/ApiService';
import { saveString } from '#src/service/storage';
import React, { useEffect } from 'react';

interface HomeScreenProps { }

type Category = {
  id: number,
  title: string,
  created_at: string,
  updated_at: string,
  clues_count: number
}

type Question = {
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

type QuestionCardType = {
  data: Question,
  key?: number
}

const QuestionCard = ({ data, key }: QuestionCardType) => {
  return (
    <Card>
      <Text>Question {key ? key + 1 : 0}:</Text>
      <Text>{data.question}</Text>
    </Card>
  )
}

const HomeScreen = ({ }: HomeScreenProps) => {
  const questions = useSelector(state => {
    return state.questionSlice.questions
  })

  useEffect(() => {
    ApiClient.get(' https://jservice.io/api/random').then((response) => {
      console.log('response: ', response)
      if (response && response.length > 0) {
        dispatch(setQuestions(response))
        saveString('Questions', JSON.stringify(response))
      }

    })
  }, [])

  return (
    <Block block paddingTop={0} paddingHorizontal={15}>
      {questions?.map((item, index) => (
        <QuestionCard
          data={item}
          key={index}
        />
      ))}
    </Block>
  );
};

export default HomeScreen;
