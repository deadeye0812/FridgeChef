FROM eclipse-temurin:21-jdk
ARG JARFILE=target/*.jar
COPY ${JARFILE} OpenFoodFactsService.jar
ENTRYPOINT ["java", "-jar", "/OpenFoodFactsService.jar"]