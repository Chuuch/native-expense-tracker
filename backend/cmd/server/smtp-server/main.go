package main

import (
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"path/filepath"
	"strings"
	"time"
)

type SMTPConnection struct {
	conn net.Conn
	from string
	to   []string
	data string
}

func main() {
	// Create emails directory if it doesn't exist
	if err := os.MkdirAll("emails", 0755); err != nil {
		log.Fatalf("Failed to create emails directory: %v", err)
	}

	addr := ":2525"
	log.Printf("🚀 Starting local SMTP server on %s", addr)
	log.Printf("📁 Emails will be saved to: %s", filepath.Join(".", "emails"))

	listener, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
	defer listener.Close()

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Printf("Failed to accept connection: %v", err)
			continue
		}

		go handleConnection(conn)
	}
}

func handleConnection(conn net.Conn) {
	defer conn.Close()

	remoteAddr := conn.RemoteAddr().String()
	log.Printf("📧 New connection from: %s", remoteAddr)

	// Send welcome message
	writeResponse(conn, "220 localhost SMTP server ready")

	connState := &SMTPConnection{conn: conn}

	for {
		line, err := readLine(conn)
		if err != nil {
			if err == io.EOF {
				log.Printf("Client disconnected: %s", remoteAddr)
			} else {
				log.Printf("Read error from %s: %v", remoteAddr, err)
			}
			return
		}

		command := strings.ToUpper(strings.Fields(line)[0])
		args := strings.Fields(line)[1:]

		switch command {
		case "HELO", "EHLO":
			writeResponse(conn, "250 Hello "+args[0]+", pleased to meet you")
		case "MAIL":
			if len(args) > 0 && strings.HasPrefix(args[0], "FROM:") {
				connState.from = strings.TrimPrefix(args[0], "FROM:")
				connState.from = strings.Trim(connState.from, "<>")
				log.Printf("📤 MAIL FROM: %s", connState.from)
				writeResponse(conn, "250 Ok")
			} else {
				writeResponse(conn, "501 Syntax: MAIL FROM:<address>")
			}
		case "RCPT":
			if len(args) > 0 && strings.HasPrefix(args[0], "TO:") {
				to := strings.TrimPrefix(args[0], "TO:")
				to = strings.Trim(to, "<>")
				connState.to = append(connState.to, to)
				log.Printf("📥 RCPT TO: %s", to)
				writeResponse(conn, "250 Ok")
			} else {
				writeResponse(conn, "501 Syntax: RCPT TO:<address>")
			}
		case "DATA":
			writeResponse(conn, "354 End data with <CR><LF>.<CR><LF>")

			// Read email data
			var emailData strings.Builder
			for {
				line, err := readLine(conn)
				if err != nil {
					log.Printf("Error reading email data: %v", err)
					return
				}

				if line == "." {
					break
				}

				emailData.WriteString(line + "\r\n")
			}

			connState.data = emailData.String()

			// Save email to file
			if err := saveEmail(connState); err != nil {
				log.Printf("Failed to save email: %v", err)
				writeResponse(conn, "550 Failed to save email")
			} else {
				log.Printf("💾 Email saved successfully")
				writeResponse(conn, "250 Ok: queued")
			}

			// Reset for next email
			connState.from = ""
			connState.to = nil
			connState.data = ""

		case "QUIT":
			writeResponse(conn, "221 Bye")
			log.Printf("Client quit: %s", remoteAddr)
			return
		case "RSET":
			connState.from = ""
			connState.to = nil
			connState.data = ""
			writeResponse(conn, "250 Ok")
		default:
			writeResponse(conn, "500 Command not recognized")
		}
	}
}

func readLine(conn net.Conn) (string, error) {
	var line strings.Builder
	buf := make([]byte, 1)

	for {
		_, err := conn.Read(buf)
		if err != nil {
			return "", err
		}

		if buf[0] == '\n' {
			break
		}

		if buf[0] != '\r' {
			line.WriteByte(buf[0])
		}
	}

	return line.String(), nil
}

func writeResponse(conn net.Conn, response string) {
	conn.Write([]byte(response + "\r\n"))
}

func saveEmail(connState *SMTPConnection) error {
	if connState.from == "" || len(connState.to) == 0 || connState.data == "" {
		return fmt.Errorf("incomplete email data")
	}

	timestamp := time.Now().Format("2006-01-02_15-04-05")
	filename := fmt.Sprintf("emails/%s_%s.eml", timestamp, strings.ReplaceAll(connState.from, "@", "_at_"))

	emailContent := fmt.Sprintf("From: %s\r\n", connState.from)
	emailContent += fmt.Sprintf("To: %s\r\n", strings.Join(connState.to, ", "))
	emailContent += fmt.Sprintf("Date: %s\r\n", time.Now().Format(time.RFC1123Z))
	emailContent += "Subject: [Local SMTP Test]\r\n"
	emailContent += "\r\n"
	emailContent += connState.data

	return os.WriteFile(filename, []byte(emailContent), 0644)
}
