FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY ./frontend /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Build BE
FROM golang:1.22.2-alpine3.19 AS go-build

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY ./backend ./backend
COPY --from=build /app/dist /app/backend/server/dist
RUN go build -o server ./backend/server

FROM alpine:3.19
WORKDIR /app
COPY --from=go-build /app/server /app/
EXPOSE 8080
CMD ["./server"]