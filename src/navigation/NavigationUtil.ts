import { StackActions, CommonActions, StackActionType } from '@react-navigation/core';

let navigator: { dispatch: (arg0: CommonActions.Action | StackActionType) => void };

export interface RouteProps {
  key: string;
  name: any;
  params: any;
}

function setTopLevelNavigator(navigatorRef: any) {
  navigator = navigatorRef;
}

function navigate(name: string, params?: any) {
  if (navigator) {
    navigator.dispatch(CommonActions.navigate(name, params));
  }
}
function replace(name: string, params?: any) {
  if (navigator) {
    navigator.dispatch(StackActions.replace(name, params));
  }
}
function push(name: string, params?: any) {
  if (navigator) {
    navigator.dispatch(StackActions.push(name, params));
  }
}
function goBack() {
  if (navigator) {
    navigator.dispatch(CommonActions.goBack());
  }
}
function pop(count: number) {
  if (navigator) {
    navigator.dispatch(StackActions.pop(count || 1));
  }
}
function dismiss() {
  if (navigator) {
    navigator.dispatch(StackActions.popToTop());
    goBack();
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  dismiss,
  navigate,
  setTopLevelNavigator,
  goBack,
  push,
  replace,
  pop
};
