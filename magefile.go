//go:build mage

package main

import (
	"os"
	"os/exec"

	"github.com/magefile/mage/mg"
)

const dbURL = "postgresql://postgres:password@localhost?sslmode=disable"

func Generate() error {
	cmd := exec.Command("buf", "generate")
	cmd.Dir = "backend"
	return runCommand(cmd)
}

func Migrate(schema_name string) error {
	cmd := exec.Command("sqlc", "generate")
	cmd.Dir = "backend"
	if err := runCommand(cmd); err != nil {
		return err
	}
	cmd = exec.Command("atlas", "migrate", "diff", schema_name, "--dir", "file://migrations", "--to", "file://schema.sql", "--dev-url", "docker://postgres/16/dev")
	cmd.Dir = "backend"
	if err := runCommand(cmd); err != nil {
		return err
	}
	cmd = exec.Command("atlas", "migrate", "apply", "--dir", "file://migrations", "--url", dbURL)
	cmd.Dir = "backend"
	return runCommand(cmd)
}

func StartServer() error {
	cmd := exec.Command("go", "run", "backend/server/main.go")
	return runCommand(cmd)
}

func StartClient() error {
	cmd := exec.Command("pnpm", "dev")
	cmd.Dir = "frontend"
	return runCommand(cmd)
}

func Start() {
	mg.Deps(StartServer, StartClient)
}

func runCommand(command *exec.Cmd) error {
	command.Stdout = os.Stdout
	command.Stderr = os.Stderr
	return command.Run()
}
