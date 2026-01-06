FROM eclipse-temurin:21-jdk
ARG JARFILE=target/*.jar
COPY ${JARFILE} InventoryService.jar
ENTRYPOINT ["java", "-jar", "/InventoryService.jar"]