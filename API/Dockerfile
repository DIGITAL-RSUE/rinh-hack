ARG ELASTIC_PASSWORD

FROM golang:alpine

ENV ELASTIC_PASSWORD=${ELASTIC_PASSWORD}

WORKDIR /app

COPY src /app

RUN apk update && apk add --no-cache git
RUN go mod download

RUN go build /app

ENTRYPOINT ["./nginx-log"]
