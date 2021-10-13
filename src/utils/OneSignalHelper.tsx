import OneSignal from 'react-native-onesignal';

const onReceived = (notification: any) => {
  console.log('Notification received: ', notification);
};

const onOpened = (openResult: any) => {
  console.log('Message: ', openResult.notification.payload.body);
  console.log('Data: ', openResult.notification.payload.additionalData);
  console.log('isActive: ', openResult.notification.isAppInFocus);
  console.log('openResult: ', openResult);
};

const onIds = (device: string) => {
  console.log('Device info: ', device);
};

const initialization = (appId: string) => {
  OneSignal.init(appId);
  OneSignal.addEventListener('received', onReceived);
  OneSignal.addEventListener('opened', onOpened);
  OneSignal.addEventListener('ids', onIds);
};

const destruction = () => {
  OneSignal.removeEventListener('received', onReceived);
  OneSignal.removeEventListener('opened', onOpened);
  OneSignal.removeEventListener('ids', onIds);
};

const OneSignalHelper = { initialization, destruction };

export default OneSignalHelper;
