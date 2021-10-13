import { SCREEN_ROUTER_AUTH } from '#config/screenType';
import ForgotPassword from '#screens/auth/ForgotPasswordScreen';
import LoginScreen from '#screens/auth/LoginScreen';
import RegisterScreen from '#screens/auth/RegisterScreen';

const { LOGIN, FORGOT_PASS, REGISTER } = SCREEN_ROUTER_AUTH;
const AUTH_SCREEN = {
  [LOGIN]: LoginScreen,
  [FORGOT_PASS]: ForgotPassword,
  [REGISTER]: RegisterScreen
};

export default AUTH_SCREEN;
