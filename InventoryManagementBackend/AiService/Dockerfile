FROM eclipse-temurin:21-jdk
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} AiService.jar
ENTRYPOINT ["java", "-jar", "/AiService.jar"]