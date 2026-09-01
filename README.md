# VIP_CLUB

Sitio web de VIP_CLUB, un club privado de experiencias exclusivas.

## Desarrollo local

```sh
npm install
npm run dev
```

## Compilación

```sh
npm run build
npm run build:deployment
```

## Despliegue en GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` compila con el modo `deployment`
y usa la base dinámica a partir de `GITHUB_REPOSITORY`. También puedes publicar
localmente con `npm run deploy`.
