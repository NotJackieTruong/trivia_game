import { Text } from '#components';
import { Card } from '#src/components/Card/Card';
import { colors, spacing } from '#src/theme';
import { fonts } from '#theme';
import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { QuestionCardType } from "../QuestionType";

const styles = StyleSheet.create({
  card: {
    paddingVertical: spacing.large,
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.medium
  },
  cardHeader: {
    ...fonts.bold18,
    textAlign: 'center',
    marginBottom: spacing.large,
    color: colors.green.primary
  },
  input: {
    height: 40,
    borderColor: colors.green.light,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: spacing.tiny,
    paddingHorizontal: spacing.small,
  },
})

const QuestionCard = ({ userAnswers, setUserAnswers, data }: QuestionCardType) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.cardHeader}>{data.question}</Text>
      <TextInput
        placeholder={"Your answer"}
        style={styles.input}
        value={userAnswers}
        onChangeText={setUserAnswers}
      />
    </Card>
  )
}

export default QuestionCard
