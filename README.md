# 🚀 EmprendeRed

Plataforma web que conecta emprendedores con oportunidades de negocio, recursos y una red colaborativa para impulsar sus proyectos.
El sistema incluye un **backend en Spring Boot**, un **frontend en Angular 20** y una **base de datos PostgreSQL**.

---

## 👥 Integrantes del equipo
- Jesús Emilio Osorio Pérez
- Maicol eduardo Robles Salazar
- Jhonatan David Quiroga Perez

---

##  Objetivo del proyecto
El objetivo de **EmprendeRed** es ofrecer un entorno digital donde los usuarios puedan registrarse, iniciar sesión y gestionar información relacionada con sus emprendimientos.
Busca fomentar la colaboración entre emprendedores mediante herramientas tecnológicas modernas.

---

##  Descripción general del sistema
El sistema está dividido en tres capas principales:

1. **Frontend (Angular 20.2.2):** interfaz amigable que permite al usuario registrarse, iniciar sesión y navegar por la plataforma.
2. **Backend (Spring Boot 3.5.7):** gestiona la lógica del negocio, el registro, autenticación mediante JWT y conexión con la base de datos.
3. **Base de datos (PostgreSQL):** almacena los usuarios, credenciales cifradas y datos de emprendimientos.

---

## 🏗️ Arquitectura general

┌────────────────────────┐
│ Frontend │
│ Angular 20.2.2 │
│ HTML / CSS / TypeScript│
└──────────┬─────────────┘
│ HTTP (REST)
┌──────────▼─────────────┐
│ Backend │
│ Spring Boot + JPA │
│ Autenticación con JWT │
└──────────┬─────────────┘
│ JDBC
┌──────────▼─────────────┐
│ Base de Datos │
│ PostgreSQL │
└────────────────────────┘

---

## ⚙️ Tecnologías utilizadas
| Módulo | Tecnologías principales |
|--------|--------------------------|
| **Frontend** | Angular 20.2.2, TypeScript, TailwindCSS |
| **Backend** | Java 21, Spring Boot 3.5.7, Spring Data JPA, JWT |
| **Base de Datos** | PostgreSQL |
| **Herramientas** | Postman, VS Code, IntelliJ IDEA |

---

## Capturas del sistema

Las capturas seran agregadas al documento word de la rubrica de evaluacion



## Despliegue del proyecto de la base de datos

    1. Lo primero es ingresar a supabase y loguerse.

    2. Lo segundo es hace un backup de la base de datos:
        * asegurarse que antes de guardarse este archivo termine en .sql, ejemplo : "nombre_del_archivo.sql".
        * Despues de haber colocado el archivo .sql en el formato del archivo se debe colocar fomat tipo "plain".
        * En la parte de encoding se debe colocar: UTF8.
        * En la parte de Role name seleccione Postgres.

    3. Despues de eso en el de eso en supabase debe crear un dashboard con el nombre de donde se guardara el despliegue de la base de datos (coloque el nombre que quiera en el dashboard).

    4. Una vez tenga el dashboard arriba en la parte donde se ve la ruta del dashboard hay un boton con el icono de un enchufe y el boton dice : "Connect", dele chick en ese boton.

    5. Una vez hecho esto se podra ver el icono de internet con una "X" ya que uno tiene que seleccionar como es el comando del archivo que se subira la base de datos, osea el backup.sql.
    Arriba de ese icono se podra visualizar 3 selectores que se llaman "Type" "Source" "Method" donde se debe colocar:

        * Type: PSQL.
        * Source: Primary Database
        * Method: Session pooler

    una vez hecho esto el icono del internet saldra en verde.

    6. Arriba del icono del internet en verde esta en letra pequeña algo que dice: "> View Parameters", una vez le de click a eso le saldra los datos para hacer la conexion para subir la base de datos:

        * host: "contenido del host"
        * port: 5432 (puerto predeterminado de postgresql)
        * database: postgres
        * user: "mas contenido"
        * pool_model: session

    con estos datos ya solo seria ejecutar en un comando en powershell como administrador

    7. una ves hecho esto se ejecuta el siguiente comando en el powershell como administrador:

    "postgresql://[TU_USER_SUPABASE]:[TU_CONTRASEÑA_POSTGRESQL]@[TU_HOST_SUPABASE]:5432/postgres?sslmode=require" -f "C:\[RUTA_DEL_BACKUP.SQL]"

    ya con esto solo seria esperar a que se suba la base de datos en supabase, puede ver como carga en el navegador que este utilizando

    8. Una vez se suba todo en la izquierda en el drawer seleccione donde dice "Database", despues en arriba donde dice "schema", seleccione el esquema que se llama su base de datos postgresql que subio y listo ya tiene su base de datos lista para usar en supabase.
