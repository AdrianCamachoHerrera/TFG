FROM openjdk:11.0.4-jre-slim
COPY "./target/users-0.0.1-SNAPSHOT.jar" "users.jar"
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "users.jar"]
