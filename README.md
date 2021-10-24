# ![kukulhan](/sources/logo.png)
La crisis sanitaria del SARS-Cov2 detonó y aceleró el uso de la tecnología en diversos sectores, tales como la educación a distancia, el trabajo remoto, la agilización de servicios a domicilio, entre otros. Sin embargo, la banca digital en México presenció una transformación de servicio a necesidad; pues el confinamiento motivó e incrementó el uso de operaciones financieras vía remota, al simplemente abrir una cuenta desde una super App. Estas nuevas prácticas de los usuarios mexicanos propició que diversas instituciones bancarias invirtieran e innovaran en sus tecnologías. Dejando entrever que bajo el contexto tecnológico financiero, es fundamental estar a la vanguardia en el sector digital. 

Gracias a la presencia de los múltiples asistentes de voz  en la cotidianidad de los usuarios, provistos por Google, Amazon, IBM, entre otros; hoy en día, es posible optimizar actividades que van desde  conocer el tráfico y determinar la mejor ruta, hasta acondicionar nuestros hogares a través de la calidez de las luces y la apertura de persianas. Basados en la comodidad y eficiencia que estos servicios aportan a nuestras rutinas, Iknelia se propuso diseñar e implementar un **amigo financiero**, a través del cual, nuestros usuarios tengan la facilidad de realizar sus transacciones financieras con solo hacer una petición por voz. Sin embargo, no buscamos realizar el típico chatbot aburrido, en donde nos limitamos a escribir y  esperar un sí o no como respuesta. Iknelia les presentará a un amigo que dará a los usuarios  consejos y/o sugerencias a fin de  mejorar su relación con las finanzas personales. 

## Nuestra motivación

En la actualidad, la sociedad ha prestado particular interés en la vivencia de experiencias disruptivas que les permitan descubrir un nuevo estilo de vida. Razón por la cual, múltiples empresas han enfocado sus esfuerzos en la oferta de éstas. Iknelia se suma a esta tendencia, volviéndose pionero en el sector de experiencias financieras; siendo nuestro valor agregado la confidencialidad, confianza y fraternidad con nuestros usuarios, mismo que aportamos a través de un **amigo financiero virtual** con el que podamos platicar de manera natural y poder preguntarle o indicarle que realice alguna transacción financiera y que nos acompañe en nuestro journey del día a día.


## Nuestra misión

Iknelia no se limita a un target particular, pues gracias a su inclusividad, permite que cualquier persona pueda utilizar el asistente financiero a través de un comando de voz. Siendo únicamente necesario emplear un teclado, al registrar las credenciales para ingresar a la banca digital. 

Nuestros indicadores de éxito consistirán en el monitoreo de clientes que estén dispuestos a vivir  esta experiencia. Mismos que fidelizamos a través de la apertura de nuevos productos financieros y los consejos y/o asesorías  brindadas. 

## Arquitectura de la aplicación de Iknelia en Amazon Web Services
# ![kukulhan](/sources/arquitectura.png)

La arquitectura la visualizamos de la siguiente manera:
1. Para el Front-End, estamos utilizando el framework **React Native**, el cual nos
permite construir aplicaciones para dispositivos móviles basados en javascript.
2. Esta aplicación se conecta mediante un **AWS API Gateway**, el cual es nuestro canal
de comunicación con el Back-End.
3. Estas APIs se conectan a un **AWS Lambda** que corre código **NodeJS**. Estamos
desacoplando funcionalidades al utilizar las APIs ya que cada una de estas cumple
una funcionalidad en especifico.
4. **AWS Lex** es nuestro “gran orquestador”, nos ayudamos de él para poder realizar
todas las peticiones del usuario, como realizar una trasferencia, solicitar el historial
de movimientos, etc. Para poder realizar todas estas operaciones, Amazon Lex está
asociado a un lambda el cual tiene toda la lógica de la orquestación de los intentos
que el usuario pueda solicitar.
5. Tanto las Lambdas de las APIs como la Lambda de AWS Lex, se conectan a **AWS DynamoDB**, 
para poder solicitar y/o guardar información referente a las peticiones
del cliente.
6. Nuestro motor Back-End está funcionando en un proyecto Lambda el cual estamos
desplegando en **AWS CloudFormation**, el cual nos ayuda a tener agrupada nuestra
Lambda con todos sus funcionalidades que ésta tiene.
7. Es importante tener un control sobre el funcionamiento de nuestro Back-End, es por
eso que nos apoyamos de **AWS CloudWatch** para poder monitorear las ejecuciones
o posibles errores que se presenten en las ejecuciones de nuestras Lambdas.
8. En AWS no están disponibles ciertas funcionalidades en ciertas regiones de la
nube, pero esto no es problema gracias a **AWS Data Transfer**, pues nos ayuda a
poder tener corriendo nuestras Lambdas en una región y poder consultar datos en
otra de forma transparente para el cliente.

## Arquitectura Amazon Web Services sobre el equipo de Iknelia
# ![kukulhan](/sources/arquitectura2.png)

En nuestro equipo de desarrolladores nos era necesario poder trabajar sobre los mismos
servicios de AWS para poder aprovechar el tiempo en este reto, esto nos llevó a utilizar el
servicio de **AWS Organizations** el cual nos permite poder gestionar y compartir los
servicios de AWS entre nosotros.
Una vez teniendo nuestra organización, necesitábamos crear usuarios, para esto nos
apoyamos en el servicio de **AWS IAM** con el cual pudimos utilizar usuarios y grupos de
usuarios para los diferentes servicios que estamos utilizando. AWS IAM también nos ayuda
a crear roles y políticas de seguridad para que los usuarios sólo tuvieran acceso a los
componentes que realmente iban a estar trabajando y no a todos los servicios disponibles.
Lamentablemente uno de nuestros miembros del del equipo no cuenta con una buena
computadora, y nos dimos cuenta de otra bondad de AWS, el **AWS Cloud9**, este servicio
nos ayuda a poder programar y deployar nuestros lambdas sin la necesidad de instalar
nada ya que es una herramienta web que podemos utilizar en cualquier navegador. Con
esta herramienta también estamos utilizando otros servicios, como son el **AWS ECS** y **AWS S3**, 
en donde estamos creando una instancia y se despliega nuestro entorno virtual de
desarrollo. También nos ayudamos del **AWS VPC**, el cual nos ayuda a crear una red privada
virtual la cual nos ayuda a poder conectarnos con internet y con los demás servicios de
AWS.