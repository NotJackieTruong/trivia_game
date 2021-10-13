# SanKoi VN - Mobile App

## Tech stack

- React Natvie v0.64.2
- Typescript
- Eslint
- Notification: [OneSignal](https://onesignal.com/)
- Manage Bug: [Sentry](https://sentry.io/)
- [Codepush](https://github.com/microsoft/react-native-code-push): CodePush is a cloud service that enables Cordova and React Native developers to deploy mobile app updates directly to their users’ devices

## Environment

- Node version 14.x.x
- Pod version 1.10.1 (for MacOS)
- Yarn
- Xcode (for MacOS)
- Android Studio

## Start project from local

```sh
yarn
yarn start
yarn pod ##For MacOS
yarn ios ##Run simulator in MacOS or run script for Android: yarn android
````

## Notes

Local image added have format `.png`example:

- Icon: `ic_calendar.png`, `ic_clock.png`
- Image: `img_background.png`, `img_header.png`
After adding local image to folder `/src/assets/images` then execute script `yarn li`, the image is reference using follow call `R.images.ic_calendar`

Using multi language need define on the file `vi.ts` and `en.ts` then execute script `yarn li`, the image is reference using follow call `R.strings().<key_object_define>`
Example: In file `en.ts` define `account: 'Account'`, after running script `yarn li` to use new declared variable call `R.strings().account`

Format code before pushing to git run script:

```sh
yarn format
yarn check-code
yarn lint
```

Hot fix in product environment by run script `yarn cp_all`
