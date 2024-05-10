FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY ./frontend/package.json .
COPY ./frontend/pnpm-lock.yaml .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build FE
FROM base AS build
COPY ./frontend /app
COPY --from=base /app/node_modules /app/node_modules
WORKDIR /app
RUN pnpm run build

# Build BE
FROM golang:1.22.2-alpine3.19 AS go-build

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY ./backend ./backend
COPY --from=build /app/dist /app/backend/server/dist
RUN go build -o server ./backend/server

# Final product
FROM alpine:3.19
WORKDIR /app
COPY --from=go-build /app/server /app/
EXPOSE 8080
CMD ["./server"]