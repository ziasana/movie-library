FROM eclipse-temurin:21-jdk
EXPOSE 8080
COPY backend/target/movie-library.jar movie-library.jar
ENTRYPOINT ["java", "-jar", "movie-library.jar"]