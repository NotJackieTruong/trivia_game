import { PERMISSIONS, Permission, RESULTS, check, request } from 'react-native-permissions';

import { Platform } from 'react-native';

type Result = 'unavailable' | 'denied' | 'blocked' | 'granted' | 'limited';

export async function useCameraPermission() {
  const per =
    Platform.select({
      android: PERMISSIONS.ANDROID.CAMERA,
      ios: PERMISSIONS.IOS.CAMERA
    }) || PERMISSIONS.IOS.CAMERA;
  const status = await request(per);
  return status;
}
export async function useMediaPermission() {
  const perRead =
    Platform.select({
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ios: PERMISSIONS.IOS.MEDIA_LIBRARY
    }) || PERMISSIONS.IOS.MEDIA_LIBRARY;
  const perWrite =
    Platform.select({
      android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ios: PERMISSIONS.IOS.MEDIA_LIBRARY
    }) || PERMISSIONS.IOS.MEDIA_LIBRARY;
  const statusRead = await request(perRead);
  const statusWrite = await request(perWrite);
  return { statusRead, statusWrite };
}
export async function useLocationPermission() {
  const per =
    Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    }) || PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  const status = await request(per);
  return status;
}
export function checkPermission(
  permission: Permission,
  onUnAvailable?: Function,
  onDenied?: Function,
  onGranted?: Function,
  onBlocked?: Function
) {
  check(permission).then((result: Result) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        /*
       This feature is not available (on this device / in this context)
       */
        onUnAvailable && onUnAvailable();
        break;
      case RESULTS.DENIED:
        /*
       The permission has not been requested / is denied but requestable
       */
        onDenied && onDenied();
        break;
      case RESULTS.GRANTED:
        /*
      The permission is granted
       */
        onGranted && onGranted();
        break;
      case RESULTS.BLOCKED:
        /*
      The permission is denied and not requestable anymore
       */
        onBlocked && onBlocked();
        break;
    }
  });
}
