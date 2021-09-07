# TFG Serverless
### Este es el repositorio para mi TFG: Evaluación de las políticas de orquestación en el rendimiento de aplicaciones serverless.

El contenido del repositorio es el siguiente:

- ### /functions
  Funciones Serverless. 
  
  - #### /code 
    Código Python de las funciones.

  - #### /deployments
    Manifiestos de despliegue OpenFaas de las funciones.
 
- ### /images-front
  Frontend de la aplicación en Angular.

- ### /images
  Microservicio Spring-Boot para la gestión de las imagenes de la aplicación, con soporte para las funcionalidades: Publicar imagen y CRUD de imagen. 

- ### /kubernetes
  Manifiestos de configuración del clúster de Kubernetes.
  
  - #### /Grafana 
    Configuración Grafana.
    
  - #### /HPA
    Configuración HPAs creados para escalar las funciones.
    
  - #### /Lets-encrypt
    Configuración Lets-encrypt.
    
  - #### /Mongo
    Configuración Mongo.
  
  - #### /OpenFaas
    Configuración OpenFaas.
 
  - #### /Prometheus-Adapter
    Configuración del Prometheus Adapter.
    
- ### /users
  Microservicio Spring-Boot para la gestión de los usuarios de la aplicación, con soporte para las funcionalidades: Registrar usuario, acreditar usuario, 
  obtener los usuarios seguidos, seguir a un usuario, dejar de seguir a un usuario y CRUD de usuario. 

