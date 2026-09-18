# CloudOps Dashboard - AWS Architecture & Management

## Descripcion del Proyecto
Este proyecto es un panel de control interactivo (Dashboard) diseñado para planificar, visualizar y gestionar arquitecturas en la nube basadas en Amazon Web Services (AWS). Permite a los arquitectos cloud y estudiantes comprender de manera practica como interactuan los diferentes servicios, estimar costos en tiempo real, visualizar topologias de red y monitorear el estado de seguridad de una infraestructura simulada.

El desarrollo se enfoco en cumplir estrictamente con los lineamientos de diseno de interfaces modernas, implementando un diseno totalmente adaptable a dispositivos moviles (Responsive Design) y manteniendo la persistencia de datos en el navegador del cliente.

## Tecnologias Utilizadas
* React 18: Biblioteca principal para la construccion de la interfaz de usuario.
* TypeScript: Superconjunto de JavaScript que anade tipado estatico para mayor robustez en el codigo.
* Vite: Entorno de desarrollo rapido y empaquetador de modulos.
* Tailwind CSS (v4): Framework de CSS de utilidad para el diseno y estilizado de interfaces.
* React Router DOM: Enrutamiento del lado del cliente para la navegacion entre pantallas.
* Recharts: Biblioteca de graficos para la visualizacion de metricas financieras y de uso.
* Lucide React: Coleccion de iconos vectoriales integrados.
* LocalStorage API: Persistencia de datos nativa del navegador para guardar los proyectos de planificacion y los presupuestos de costos.

## Modulos Principales
El sistema se compone de multiples modulos accesibles mediante el menu de navegacion:

1. Centro de Mando (Dashboard)
Panel principal que concentra las metricas globales: cantidad de servicios, costos sincronizados en tiempo real, estado de salud de la arquitectura y un centro de notificaciones dividido en alertas de seguridad, infraestructura y facturacion.

2. Planificacion
Herramienta de diseno de propuestas. Permite al usuario definir variables criticas como el objetivo de la migracion, tipo de aplicacion, disponibilidad (SLA) y seleccion de servicios. Las propuestas se guardan en el sistema y pueden explorarse en vista de tarjetas o tabla de datos.

3. Costos
Calculadora dinamica para la estimacion financiera. Muestra el desglose tecnico por servicio, cantidad, horas y proyeccion mensual/anual. Incluye interactividad para agregar o eliminar servicios, reflejando los cambios inmediatamente en graficos estadisticos y sincronizandose con el Dashboard.

4. Infraestructura
Representacion visual de la presencia global de la aplicacion. Cumple la funcion de listar ordenadamente las regiones activas, su ubicacion geografica exacta, los servicios desplegados y su estado de salud operativo.

5. Seguridad
Modulo de simulacion enfocado en IAM y politicas de control de acceso. Identifica y cataloga vulnerabilidades comunes de AWS, afectando el semaforo de seguridad global del sistema.

6. Red
Lienzo interactivo que diagrama la topologia dentro de una Amazon VPC. Incluye un Inspector de Nodos que permite al usuario interactuar con la infraestructura (EC2, RDS) para revisar metricas, asi como simular escenarios de estres en la red.

7. Servicios
Catalogo de referencia tecnica de los componentes cloud utilizados en el proyecto.

## Instalacion y Ejecucion
1. Abrir la terminal en el directorio del proyecto.
2. Instalar las dependencias necesarias: `npm install`
3. Iniciar el servidor de desarrollo: `npm run dev`
4. Acceder al enlace local proporcionado por Vite en el navegador.
