FROM eclipse-temurin:21-jdk
ARG JARFILE=target/*.jar
COPY ${JARFILE} Gateway.jar
ENTRYPOINT ["java", "-jar", "/Gateway.jar"]