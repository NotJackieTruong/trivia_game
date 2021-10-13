import { SCREEN_ROUTER_APP } from '#config/screenType';
import HomeScreen from '#screens/app/home/HomeScreen';
import UserScreen from '#screens/app/user/UserScreen';

const { HOME, USER } = SCREEN_ROUTER_APP;

export default {
  [HOME]: HomeScreen,
  [USER]: UserScreen
};

export const STACK_BOTTOM_UN_AUTH = {
  [HOME]: HomeScreen,
  [USER]: UserScreen
};
