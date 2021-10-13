console.log('Generating...');
const Hjson = require('hjson');
const fs = require('fs');

function genStringResource() {
  try {
    const data = fs.readFileSync('./src/i18n/locales/vi.ts', 'utf8');
    const json = Hjson.parse(data.replace('export default', '').replace(';', ''));
    const stringName = Object.keys(json);
    fs.writeFileSync(
      './src/assets/strings.ts',
      `import I18n from '#src/i18n/i18n';
function strings(){
    return{${stringName.map((string, index) => {
      let path = '';
      if (typeof json[string] === 'string') {
        path = `
        ${string}: I18n.t("${string}", { defaultValue: "" })`;
      } else {
        const keys = Object.keys(json[string]);
        keys.map((val, i) => {
          path += `
          ${string}_${val}: I18n.t("${string}.${val}",{ defaultValue: "" })${i !== keys.length - 1 ? ',' : ''}`;
        });
      }
      return path;
    })}
}}
export default strings
        `
    );
    console.log(`============== Linked ${stringName.length} string ==============`);
  } catch (err) {
    console.error(err);
  }
}

function genImageResource() {
  fs.readdir('./src/assets/images/', function (err, fileName) {
    if (err) {
      console.log(err);
      return;
    }
    fs.writeFileSync(
      './src/assets/imagesAsset.ts',
      `const images = {
    ${fileName.map(iconName => {
      const path = `
    ${iconName.replace('.png', '')}: require("./images/${iconName}")`;
      return path;
    })}
    }
export default images`,
      { encoding: 'utf8', flag: 'w' }
    );
    console.log(`============== Linked ${fileName.length} images ==============`);
  });
}

// genStr = () => {
//   try {
//     const data = fs.readFileSync("./src/i18n/locales/vi.js", "utf8");
//     const json = Hjson.parse(
//       data.replace("export default", "").replace(";", "")
//     );
//     const stringName = Object.keys(json);
//     fs.writeFileSync(
//       "./src/assets/str.js",
//       `import i18 from '@i18';
// const strLang = {${stringName.map(string => {
//         path = `
//         ${string}: "${string}"`;
//         return path;
//       })}
// }
// export default strLang
//         `
//     );
//     console.log(
//       `============== Linked ${stringName.length} str ==============`
//     );
//   } catch (err) {
//     console.error(err);
//   }
// };

genImageResource();
genStringResource();
// genStr();
