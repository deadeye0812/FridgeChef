FROM eclipse-temurin:21-jdk
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} EurekaServer.jar
ENTRYPOINT ["java", "-jar", "/EurekaServer.jar"]