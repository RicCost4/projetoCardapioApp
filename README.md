# projetoCardapioApp
> Projeto de faculdade Estacio de Sá, da materia Programação para Dispositivo Móveis em Android.

> Grupo: Ana Elisa, Leonardo Amaral, Nicoly Guedes, Richard Artur, Thalles Henrique, Vanessa Cristina

> Prof: Bruno Rafael de Oliveira

Link do [App](https://expo.dev/artifacts/eas/q9vdpsRefoMhiTND6RJKQb.apk) para baixar.

* Projeto do Zero
```
    npm install -g expo-cli
    npx create-expo-app app
```

* Projeto clonado
```
    npm install
    npx expo start
```

* Criar apk
```
    npm install -g eas-cli
    eas build:configure
    eas login 
    eas build -p android --profile preview
```

* Configurar o `eas.json` para gerar um apk
```eas.json
    {
        "cli": {
            "version": ">= 3.13.3"
        },
        "build": {
            "preview": {
                "android": {
                    "buildType": "apk"
                }
            },
            "preview2": {
                "android": {
                    "gradleCommand": ":app:assembleRelease"
                }
            },
            "preview3": {
                "developmentClient": true
                },
            "production": {}
        }
    }
``` 