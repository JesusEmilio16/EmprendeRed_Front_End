# 💻 EmprendeRed — Frontend (Angular 20.2.2)

Interfaz web moderna que permite a los usuarios registrarse, iniciar sesión y acceder al contenido del sistema.

---

## 🧱 Tecnologías utilizadas
- Angular CLI 20.2.2
- TypeScript
- TailwindCSS
- RxJS
- Angular Router
- HttpClientModule

---

## 🧰 Requisitos previos
- Node.js (versión 18 o superior)
- Angular CLI instalado globalmente:
  ```bash
  npm install -g @angular/cli
  ```

---

## ⚙️ Instrucciones de instalación y ejecución

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Ejecuta el proyecto:
   ```bash
   ng serve
   ```
3. Abre en tu navegador:
   ```
   http://localhost:4200
   ```

---

## 🔐 Login con token JWT
El login envía una solicitud `POST` al backend:
```typescript
this.authService.login(email, password).subscribe(res => {
  localStorage.setItem('token', res.token ?? '');
  localStorage.setItem('user', JSON.stringify(res));
});
```
Si las credenciales son correctas, el token se guarda en `localStorage` y el usuario es redirigido al inicio.

---

## 🖼️ Capturas del sistema
*(Agrega aquí imágenes del login, home, dashboard, etc.)*

---

## 📁 Estructura de carpetas del frontend
```
frontend/
└── src/
    ├── app/
    │   ├── components/
    │   ├── pages/
    │   │   └── login/
    │   │       ├── login.html
    │   │       ├── login.css
    │   │       └── login.ts
    │   ├── services/
    │   │   └── auth.service.ts
    │   │   └── businnes_post.ts
    │   │   └── user.ts
    │   ├── view/
    │   │   ├── business_post/
    │   │   ├── business_show/
    │   │   ├── footer/
    │   │   ├── header/
    │   │   ├── main-page/
    │   │   └── register/
    │   ├── app.config.ts
    │   ├── app.routes.ts
    │   ├── app.ts
    │   ├── app.html
    │   ├── app.css
    │   └── app.spec.ts
    ├── assets/
    ├── index.html
    ├── main.ts
    └── styles.css
├── package.json
└── package-lock.json
```

## Despliegue del proyecto del front-end en Vercel:

   1. Lo primero es ingresar a Vercel y loguearse.

   2. Lo siguiente es ir al apartado de "Proyect"

   3. Instalar Github en Vercel

   4. Luego se selecciona el repositorio

   5. despues se le da al boton "Import"

   6. Y por ultimo se le da al boton "Deployment" y ya con eso ya estaria el front-end desplegado, despues de todos eso paso encontreras el mensaje de la pagina
