<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
## Descripción
E
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
## Arquitectura
Antes de ejecutar cualquier acción para crear y/o modificar dentro del proyecto es necesario tener en cuenta las politicas y metodologias que estan descritas en el documento establecido para este proposito, [ver mas](https://sistecredito.sharepoint.com/:w:/s/ServiciosTI-Arquitectura/EaGXl2sCObxLj5OXB6q3wZoBcfNNkZwKUfsGuMIt30HiFA?e=khxcmQ), adicionalmente la estructura implementada se puede visuzalizar en este diagrama ![Arquitectura](https://sistecredito.sharepoint.com/sites/ServiciosTI-Arquitectura/Documentos%20compartidos/Arquitectura/Recursos/Frontend/Frontend-architecture-model-template-Structure.jpg).
### Estructura del proyecto
La distribución de las carpetas es en su mayoria definida por nest-js pero es importante tener en cuenta la estructura dentro de la carpeta app antes de crear cualquier componente.
```json
📁src/
  |
  ├─📁Api/ // Todos los modulos que se creen con relacion a una ruta deben estar aqui (endpoints)
  ├─📁Common/  // Todos los elementos compartidos de los modules que son unicos dentro de la aplicacion en construccion (modulos reutilizables, Interceptores, Enumeradores/enum, models, resolvers, decorators, filters, gateways, guards, interceptors, middlewares, pipes, interfaces)
```
## Uso
Dependiendo de la version de la plantilla que se use necesitara los siguientes recursos:
- Nestjs
- Node
- Typescript
**Nota:**  Se recomienda el uso de VSCode como el editor para el desarrollo de cualquier proyecto nestjs haciendo uso de las extenciones que se recomiendan [aquí](https://sistecredito.sharepoint.com/:w:/s/ServiciosTI-Arquitectura/ERvie0zLJl5DncSu7OqwdTYBpAg6jfusKg1_xRdewZXh9Q?e=Jnh6Sm).
## Instalación de dependencias
El comando a continuación permitirá al usuario instalar las dependencias relacionadas con el proyecto correspondientes a la versión `16.16.0 LTS` de `Node.js`, previamente especificadas dentro de archivo `package.json`
```bash
$ npm install
```
## Herramientas Pre-constuidas
### Generacion de codigo
[Nestjs](https://nestjs.com/) cuenta con una herramienta de generacion de codigo con los comandos `ng generate app|library|class|controller|decorator|filter|gateway|guard|interface|interceptor|middleware|module|pipe|provider|resolver|service`. Para esta particular estructura es importante tener en cuenta los siguientes comandos para logar una eficiencia alta a la hora de desarrollar con el uso de esta plantilla:
**Generar un modulo para aun api:**
```sh
# crear un nuevo modulo dentro de la aplicacion en el directorio api/ 
nest generate resource api/[new-module-name] 
# forma corta
nest g res api/[new-module-name]
# Pregunta (Despalzarse con las flechas y seleccionar la opcion  deseada) 
? What transport layer do you use? (Use arrow keys)
> REST API
  GraphQL (code first)
  GraphQL (schema first)
  Microservice (non-HTTP)
  WebSockets
#nota (para el caso de bff seleccionar Rest Api)
#Pregunta (si para la necesidad se requiere generar un CRUD Escribir  'Y', en caso contrario 'n')
? Would you like to generate CRUD entry points? (Y/n) 
```
**Generar un decorador:**
```sh
# crear un nuevo modulo dentro de la aplicacion en el directorio api/ 
nest generate decorator common/decorators/[new-decorator-name] 
# forma corta
nest g d common/decorators/[new-decorator-name]
```
**Generar un filter:**
```sh
# crear un nuevo filter dentro de la aplicacion en el directorio common/filters/ 
nest generate filter common/filters/[new-filter-name] 
# forma corta
nest g f common/filters/[new-filter-name]
```
**Generar un gateway:**
```sh
# crear un nuevo gateway dentro de la aplicacion en el directorio common/gateways/ 
nest generate gateway common/gateways/[new-gateway-name] 
# forma corta
nest g ga common/gateways/[new-gateways-name]
```
**Generar un guard:**
```sh
# crear un nuevo guard dentro de la aplicacion en el directorio common/guards/ 
nest generate guard common/guards/[new-guard-name] 
# forma corta
nest g gu common/guards/[new-guard-name]
```
**Generar un interceptor:**
```sh
# crear un nuevo interceptor dentro de la aplicacion en el directorio common/interceptors/ 
nest generate interceptor common/interceptors/[new-interceptor-name] 
# forma corta
nest g itc common/interceptors/[new-interceptor-name]
```
**Generar un middleware:**
```sh
# crear un nuevo middleware dentro de la aplicacion en el directorio common/middleware/ 
nest generate middleware common/middlewares/[new-middleware-name] 
# forma corta
nest g mi common/middlewares/[new-middleware-name]
```
**Generar un pipe:**
```sh
# crear un nuevo pipe dentro de la aplicacion en el directorio common/pipes/ 
nest generate pipe common/pipes/[new-pipe-name] 
# forma corta
nest g itc common/pipes/[new-pipe-name]
```
**Generar un provider:**
```sh
# crear un nuevo providers dentro de la aplicacion en el directorio common/providers/ 
nest generate provider common/providers/[new-provider-name] 
# forma corta
nest g pr common/providers/[new-provider-name]
```
**Generar un resolver:**
```sh
# crear un nuevo resolver dentro de la aplicacion en el directorio common/resolvers/ 
nest generate resolver common/resolvers/[new-resolver-name] 
# forma corta
nest g pr common/resolvers/[new-resolver-name]
```
## Ejecución de código
```bash
# ejecutar desarrollo en modo desarrollo
$ npm run start
# ejecutar desarrollo en modo desarrollo con cambios en tiempo real
$ npm run start:dev
# ejecutar desarrollo en modo productivo
$ npm run start:prod
```
**Nota:**   Para arrancar este proyecto, se utiliza el comando `npm run start:watch` en un entorno local de desarrollo, por defecto se habilitara la url `http://localhost:3000/`. con esto todos los cambios que se realizen dentro de los archivos del proyecto se veran reflejados con la recarga automatica provista por el entorno.
### CI/CD
Dentro del archivo `package.json` se podrán observar un comando pre-construido para ejecutar el proceso de empaquetamiento del proyecto `npm run build`, este generará un paquete configurado con el ambiente al cual corresponde conforme al entorno desplegado basado en la [librería de variables de Azure](https://docs.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=yaml).
Este proyecto cuenta con un pipeline a través del cual se hace la construcción del proyecto, una carpeta `dist/` y dentro de esta los recursos que deben ser publicados en el server utilizando la imagen generada, este tambien genera en la raíz del proyecto un archivo `appsettings.json` a partir de la construcción de las variables almacenadas en la librería, este anterior se utilizara para la ejecución de la aplicación.
## Pruebas unitarias
La herramienta de pruebas unitarias con las que cuenta nestjs estan basadas en el framework [Jest](https://jestjs.io/). Cada vez que se cree un elemento con el `nest generate` es posible que se genere un archivo sufijado con `*.spec.ts` de pruebas, Para correr una prueba unitaria se debe ejecutar el comando de `npm run test:watch | npm run test ` esto lanzara un navegador donde se mostrara el estado de las pruebas, para ver la covertura de codigo es necesario ejecutar el siguente comando `npm run test:cov`
## Soporte
Nest es un proyecto de código abierto con licencia del MIT. Puede crecer gracias a los patrocinadores y al apoyo de los increíbles patrocinadores. [Leer mas](https://docs.nestjs.com/support).