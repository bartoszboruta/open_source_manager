import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Idea } from "../../store/internal/types";
import {IdeaDetailsProps} from '../../screens/MainStack/IdeasStack/IdeaDetails'

type Props = {
  idea?: Idea
}

const IdeaForm = (props: Props) => {
  const {idea} = props

  return (
    <View>
      <Text>{ idea ? `Edit Form of ${idea?.name}` : 'New Idea Form'}</Text>
    </View>
  )
}

export default IdeaForm

