# API TypeScript + NestJS + TypeORM + Keycloak :seedling:

> :information_source: Este proyecto fue creado con el CLI de NestJS mediante el comando `nest new`, y por lo tanto toda la [documentación del sitio oficial](https://docs.nestjs.com/) también puede consultarse para saber más.

¡Bienvenida/o! En este repositorio encontrarás una plantilla (de las infinitas posibles) para crear una API utilizando NodeJS y TypeScript. Las principales tecnologías que utilizamos son:

- [NodeJS](https://nodejs.org/es/): entorno de ejecución para JavaScript.
- [NestJS](https://nestjs.com/): framework para crear aplicaciones web.
- [TypeORM](https://typeorm.io/): ORM (object-relational mapping) para interactuar con una base SQL desde objetos JavaScript.
- [PostgreSQL](https://www.postgresql.org/): base de datos SQL.
- [Jest](https://jestjs.io/): framework para escribir tests.

## :point_up: Prerrequisitos - para instalar antes de empezar

Vas a necesitar un IDE o al menos un editor de texto que coloree la sintaxis. Recomendamos utilizar [Visual Studio Code](https://code.visualstudio.com/) - que se lleva muy bien con proyectos TypeScript - enriquecido con los siguientes plugins:

- [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)

Para ejecutar el código es necesario tener NodeJS en su versión 18 (`lts/hydrogen`). Para instalarlo recomendamos utilizar el manejador de versiones [`nvm`](https://github.com/nvm-sh/nvm), aunque también podés hacerlo manualmente siguiendo las instrucciones adecuadas para tu sistema operativo.

Por último, se incluye un archivo de [Docker Compose](https://docs.docker.com/compose/) con todo lo necesario para instalar y configurar las bases de datos en PostgreSQL (una para desarrollo y otra para test). Si por algún motivo no querés usar Docker, vas a tener que instalar PostgreSQL y luego ejecutar el script `docker/init/crear-db.sh` en tu entorno.

## :ballot_box_with_check: Configuración inicial del proyecto

Asumiendo que ya configuraste todos los prerrequisitos y que vas a utilizar Docker, estos son los comandos que deberías ejecutar la primera vez que trabajes en el proyecto:

```shell
# Instala, configura y levanta las bases de datos.
# El flag -d (daemon) hace que la ejecución continue incluso luego de reiniciar la máquina.
docker-compose up -d

# Instala las dependencias Node del proyecto.
npm install

# Ejecuta las migraciones iniciales para las bases de dev y test.
npm run db:migrate
NODE_ENV=test npm run db:migrate
```

De manera opcional, también podés cargar unos datos de prueba, llamados _seeders_, que vienen incluidos. A medida que el desarrollo continue, se podrían seguir agregando más datos que ayuden en las pruebas manuales. Para cargar los _seeders_, ejecutar el siguiente comando:

```shell
# (Opcional) Carga los datos de prueba en la base de desarrollo.
npm run db:seed
```

## 🔑 Keycloak local

En el `docker-compose` viene incluida la configuración para levantar un servidor de Keycloak local con todo lo necesario para ejecutar tanto este proyecto como el frontend.

Lo único que hay que hacer para que funcione correctamente es crear un archivo `.env` con el siguiente contenido:

```shell
KEYCLOAK_CLIENT_SECRET=HHZE4G98EMAlNMD3UrMBBjPJS3DLfhPc
```

Vienen además dos usuarios, uno para la consola de administrador (accesible desde http://localhost:8080) y otro para usar en la aplicación:

👨 **Usuario para la aplicación:** usuario@flux.com.ar // 1qaz!QAZ

👮 **Usuario para la consola de admin:** admin // admin1234

🚀 el real configurado dentro de keycloak se llama **fluxit** y el cliente se llama **api-flux-nest**

Se deja habilitado el flujo grand_type=**password** para que puedan solicitar facilmente un token para pegarle a la api.

Para pedir un token ejecutar el siguiente curl

```
curl --location 'http://localhost:8080/realms/fluxit/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'username=usuario@flux.com.ar' \
--data-urlencode 'password=1qaz!QAZ' \
--data-urlencode 'client_id=api-flux-nest' \
--data-urlencode 'client_secret=HHZE4G98EMAlNMD3UrMBBjPJS3DLfhPc'
```

Finalmente para llamara a la api hay que pasarle el token obtenido previamente.

```
curl --location --globoff 'http://localhost:4000/contactos' \
--header 'Authorization: Bearer {token obtenido}'
```

## :file_folder: Estructura de directorios

Breve descripción de qué se puede encontrar en cada uno de los directorios del proyecto:

```shell
.
├── docker              # Configuración de Docker para desarrollo
├── src
│   ├── common          # Componentes comunes - guardas, filtros, interceptores, etc
│   ├── config          # Configuraciones de la API (base de datos, puerto, etc)
│   ├── resources       # Endpoints y modelos de la aplicación
│   └── database
│      ├── migrations   # Migraciones de la base de datos
│      └── seeders      # Datos de prueba para la base de datos
└── test                # Tests de integración (e2e)
```

## :woman_technologist: :man_technologist: Comandos útiles para el día a día

A continuación, algunos comandos necesarios para el desarrollo diario en este proyecto.

### Código

```shell
# Levanta el proyecto y recarga automáticamente si hay cambios.
npm start

# Ejecuta los tests una sola vez.
npm test

# Ejecuta los tests y se queda esperando por cambios.
npm test:watch

# Ejecuta los tests de integración (e2e).
npm test:e2e
```

### NestJS

Para no tener que instalarse el [CLI de NestJS](https://docs.nestjs.com/cli/overview) de forma global, ni tener problemas con las versiones, viene incluido como `devDependency` en el proyecto.

Puede ejecutarse cualquiera de los comandos del CLI anteponiendo `npm run nest`:

```shell
# Crea un recurso
npm run nest g resource

# Crea un interceptor
npm run nest g interceptor
```

Recomendamos consultar la [documentación oficial](https://docs.nestjs.com/cli/usages#cli-command-reference) para ver los comandos disponibles.

### Base de datos

```shell
# Ejecuta las migraciones.
npm run db:migrate

# Carga los datos de prueba.
npm run db:seed

# Genera automáticamente una migración a partir de los cambios en los modelos.
# NOTA: es recomendable generar una migración por cada cambio, lo más granulares posibles.
npm run migration:generate src/database/migrations/AddCorreoElectronicoToContacto

# Crea una migración vacía para completar manualmente.
npm run migration:create src/database/migrations/CreateUsuario

# Deshace la última migración ejecutada.
npm run migration:revert

# Muestra cuáles migraciones fueron ejecutadas y cuáles no.
npm run migration:show
```

## :bookmark_tabs: OpenAPI (Swagger)

Se incluye un módulo que levanta automáticamente una instancia de [Swagger](https://swagger.io/) en la ruta `/api`, por defecto disponible en http://localhost:4000/api, que sirve tanto para documentar la API como para hacer pruebas rápidas.

Para conocer más sobre la forma de documentar los endpoints, ver la [documentación oficial de NestJS](https://docs.nestjs.com/openapi/introduction).
