import { Block, ButtonPrimary, Text } from '#components';
import { useSelector } from '#src/common';
import { Card } from '#src/components/Card/Card';
import ScreenWrapper from '#src/components/Screen/ScreenWrapper';
import { saveString } from '#src/service/storage';
import { colors, spacing } from '#src/theme';
import { fonts } from '#theme';
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

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

type Answer = {
  question_id: number,
  user_answer: string | number
}

type QuestionCardType = {
  data: Question,
  key?: number,
  index?: number,
  setAnswer: (data: Answer) => void
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: spacing.large,
    paddingHorizontal: spacing.medium,
  },
  cardHeader: {
    ...fonts.bold18,
    textAlign: 'center',
    marginBottom: spacing.large
  },
  input: {
    height: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: spacing.tiny,
    paddingHorizontal: spacing.small
  },
  questionsBlock: {
    flex: 1,
    backgroundColor: colors.green.primary
  },
  buttonSubmit: {
    height: 40,
    marginHorizontal: 0,
  }
})

const QuestionCard = ({ data, setAnswer }: QuestionCardType) => {
  const [value, setValue] = useState("")
  const onChangeText = (text: string) => {
    setValue(text)
    setAnswer({
      question_id: data.id,
      user_answer: text
    })
  }
  return (
    <Card style={styles.card}>
      <Text style={styles.cardHeader}>{data.question}</Text>
      <TextInput
        placeholder={"Your answer"}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </Card>
  )
}

const HomeScreen = ({ }: HomeScreenProps) => {
  const questions = useSelector(state => {
    return state.questionSlice.questions
  })

  const [answers, setAnswers] = useState([])

  const fakeData = [
    {
      id: 152592,
      answer: "Fred Astaire",
      question: "Supporting Actor, 1974, this dancer in 'The Towering Inferno'",
      value: 800,
      airdate: "2015-01-20T12:00:00.000Z",
      created_at: "2015-01-22T02:39:40.233Z",
      updated_at: "2015-01-22T02:39:40.233Z",
      category_id: 18181,
      game_id: 4786,
      invalid_count: null,
      category: {
        id: 18181,
        title: "'a' cademy award nominees",
        created_at: "2015-01-22T02:39:39.275Z",
        updated_at: "2015-01-22T02:39:39.275Z",
        clues_count: 5
      }
    }
  ]

  const handleAnswer = (data: Answer) => {
    let clone = [...answers]
    let index = clone.findIndex(item => item.question_id === data.question_id)
    if (index >= 0) {
      clone[index] = data
    } else {
      clone.push(data)
    }
    saveString('USER_ANSWER', JSON.stringify(clone))
    setAnswers(clone)

  }

  const onSubmit = () => {
    console.log('Answers: ', answers)
  }

  // useEffect(() => {
  //   ApiClient.get(' https://jservice.io/api/random').then((response) => {
  //     console.log('response: ', response)
  //     if (response && response.length > 0) {
  //       dispatch(setQuestions(response))
  //       saveString('Questions', JSON.stringify(response))
  //     }

  //   })
  // }, [])

  return (
    <Block backgroundColor={colors.green.primary} block paddingVertical={spacing.mediumPlush} paddingHorizontal={15}>
      <ScreenWrapper
        scroll
        style={styles.questionsBlock}>
        {fakeData?.map((item, index) => (
          <QuestionCard
            data={item}
            key={index}
            index={index + 1}
            setAnswer={handleAnswer}
          />
        ))}
      </ScreenWrapper>

      <ButtonPrimary
        title={"Submit"}
        style={styles.buttonSubmit}
        onPress={onSubmit}
      />
    </Block>
  );
};

export default HomeScreen;
