FROM openjdk:11.0.4-jre-slim
COPY "./target/images-0.0.1-SNAPSHOT.jar" "images.jar"
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "images.jar"]
