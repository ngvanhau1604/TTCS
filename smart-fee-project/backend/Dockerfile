FROM maven:3.9.4-eclipse-temurin-17 AS builder
WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /build/target/*smart-fee-backend*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "if [ -z \"$PAYMENT_WEBHOOK_SECRET\" ]; then echo \"ERROR: PAYMENT_WEBHOOK_SECRET is not set. Set it before running the container.\"; exit 1; fi; java -Dpayment.webhook.secret=$PAYMENT_WEBHOOK_SECRET -jar /app/app.jar"]
