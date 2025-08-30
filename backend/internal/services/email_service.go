package services

import (
	"fmt"
	"money-mate/internal/models"
	"money-mate/pkg/config"
	"strconv"

	"gopkg.in/mail.v2"
)

type EmailService struct {
	dialer   *mail.Dialer
	from     string
	fromName string
}

func NewEmailService(cfg *config.Config) *EmailService {
	port, err := strconv.Atoi(cfg.SMTPPort)
	if err != nil {
		// Log the error and use default port
		fmt.Printf("Failed to parse SMTP port '%s': %v, using default port 2525\n", cfg.SMTPPort, err)
		port = 2525
	}

	fmt.Printf("Creating email service with SMTP config: Host=%s, Port=%d, Username=%s, FromEmail=%s\n",
		cfg.SMTPHost, port, cfg.SMTPUsername, cfg.FromEmail)

	dialer := mail.NewDialer(cfg.SMTPHost, port, cfg.SMTPUsername, cfg.SMTPPassword)

	// For local development without authentication
	if cfg.SMTPUsername == "" && cfg.SMTPPassword == "" {
		dialer = mail.NewDialer(cfg.SMTPHost, port, "", "")
	}

	return &EmailService{
		dialer:   dialer,
		from:     cfg.FromEmail,
		fromName: cfg.FromName,
	}
}

func (s *EmailService) SendVerificationEmail(user *models.User, code string) error {
	fmt.Printf("Attempting to send verification email to: %s with code: %s\n", user.Email, code)
	fmt.Printf("Using SMTP dialer: Host=%s, From=%s <%s>\n", s.dialer.Host, s.fromName, s.from)

	m := mail.NewMessage()

	// Set headers
	m.SetHeader("From", fmt.Sprintf("%s <%s>", s.fromName, s.from))
	m.SetHeader("To", user.Email)
	m.SetHeader("Subject", "Verify your email - Money Mate")

	// Set body
	htmlContent := fmt.Sprintf(`
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<title>Verify Your Email - Money Mate</title>
			<style>
				body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
					.container { max-width: 600px; margin: 0 auto; padding: 20px; }
					.header { background: #CBFD03; padding: 20px; text-align: center; }
					.content { padding: 20px; background: #f9f9f9; }
					.verification-code {
						background: #333;
						color: #CBFD03;
						padding: 15px;
						text-align: center;
						font-size: 24px;
						font-weight: bold;
						margin: 20px 0;
						border-radius: 8px;
					}
					.footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
				</style>
			</head>
			<body>
			<div class="container">
				<div class="header">
					<h1>🎯 Money Mate</h1>
				</div>
				<div class="content">
					<h2>Verify Your Email Address</h2>
					<p>Hi %s,</p>
					<p>Welcome to Money Mate! To complete your registration, please use the verification code below:</p>
					
					<div class="verification-code">%s</div>
					
					<p>This code will expire in 10 minutes.</p>
					<p>If you didn't create an account with Money Mate, you can safely ignore this email.</p>
					
					<p>Best regards,<br>The Money Mate Team</p>
				</div>
				<div class="footer">
					<p>© 2024 Money Mate. All rights reserved.</p>
				</div>
			</div>
		</body>
		</html>

	`, user.Fullname, code)

	plainTextContent := fmt.Sprintf(`
		Verify Your Email - Money Mate

		Hi %s,

		Welcome to Money Mate! To complete your registration, please use the verification code: %s

		This code will expire in 10 minutes.

		Best regards,
		The Money Mate Team
	`, user.Fullname, code)

	m.SetBody("text/html", htmlContent)
	m.AddAlternative("text/plain", plainTextContent)

	err := s.dialer.DialAndSend(m)
	if err != nil {
		fmt.Printf("Failed to send email: %v\n", err)
		return err
	}

	fmt.Printf("Email sent successfully to %s\n", user.Email)
	return nil
}

func (s *EmailService) SendPasswordResetEmail(user *models.User, resetToken string) error {
	m := mail.NewMessage()

	// Set headers
	m.SetHeader("From", fmt.Sprintf("%s <%s>", s.fromName, s.from))
	m.SetHeader("To", user.Email)
	m.SetHeader("Subject", "Reset Your Password - Money Mate")

	resetLink := fmt.Sprintf("%s/reset-password?token=%s", "http://localhost:3000", resetToken)

	htmlContent := fmt.Sprintf(`
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<title>Reset Your Password</title>
			<style>
				body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
				.container { max-width: 600px; margin: 0 auto; padding: 20px; }
				.header { background: #CBFD03; padding: 20px; text-align: center; }
				.content { padding: 20px; background: #f9f9f9; }
				.reset-button { 
					display: inline-block; 
					background: #CBFD03; 
					color: #333; 
					padding: 12px 24px; 
					text-decoration: none; 
					border-radius: 6px; 
					font-weight: bold; 
					margin: 20px 0; 
				}
				.footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
			</style>
		</head>
		<body>
			<div class="container">
				<div class="header">
					<h1>🔐 Money Mate</h1>
				</div>
				<div class="content">
					<h2>Reset Your Password</h2>
					<p>Hi %s,</p>
					<p>We received a request to reset your password. Click the button below to create a new password:</p>
					
					<a href="%s" class="reset-button">Reset Password</a>
					
					<p>This link will expire in 1 hour.</p>
					<p>If you didn't request a password reset, you can safely ignore this email.</p>
					
					<p>Best regards,<br>The Money Mate Team</p>
				</div>
				<div class="footer">
					<p>© 2024 Money Mate. All rights reserved.</p>
				</div>
			</div>
		</body>
		</html>
	`, user.Fullname, resetLink)

	plainTextContent := fmt.Sprintf(`
		Reset Your Password - Money Mate
		
		Hi %s,
		
		We received a request to reset your password. Click the link below to create a new password:
		
		%s
		
		This link will expire in 1 hour.
		
		Best regards,
		The Money Mate Team
	`, user.Fullname, resetLink)

	m.SetBody("text/html", htmlContent)
	m.AddAlternative("text/plain", plainTextContent)

	return s.dialer.DialAndSend(m)
}

func (s *EmailService) SendWelcomeEmail(user *models.User) error {
	m := mail.NewMessage()

	// Set headers
	m.SetHeader("From", fmt.Sprintf("%s <%s>", s.fromName, s.from))
	m.SetHeader("To", user.Email)
	m.SetHeader("Subject", "Welcome to Money Mate!")

	htmlContent := fmt.Sprintf(`
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<title>Welcome to Money Mate</title>
			<style>
				body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
				.container { max-width: 600px; margin: 0 auto; padding: 20px; }
				.header { background: #CBFD03; padding: 20px; text-align: center; }
				.content { padding: 20px; background: #f9f9f9; }
				.feature { margin: 15px 0; padding: 10px; background: white; border-radius: 6px; }
				.footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
			</style>
		</head>
		<body>
			<div class="container">
				<div class="header">
					<h1>🎯 Money Mate</h1>
				</div>
				<div class="content">
					<h2>Welcome to Money Mate!</h2>
					<p>Hi %s,</p>
					<p>Thank you for joining Money Mate! We're excited to help you take control of your finances.</p>
					
					<h3>What you can do with Money Mate:</h3>
					<div class="feature">
						<strong>📊 Track Expenses:</strong> Monitor your spending with detailed categories
					</div>
					<div class="feature">
						<strong>🎯 Set Savings Goals:</strong> Create and track progress on your financial goals
					</div>
					<div class="feature">
						<strong>Analytics:</strong> Get insights into your spending patterns
					</div>
					<div class="feature">
						<strong>💰 Budget Management:</strong> Set budgets and stay on track
					</div>
					
					<p>Ready to get started? Log in to your account and begin tracking your finances!</p>
					
					<p>Best regards,<br>The Money Mate Team</p>
				</div>
				<div class="footer">
					<p>© 2024 Money Mate. All rights reserved.</p>
				</div>
			</div>
		</body>
		</html>
	`, user.Fullname)

	plainTextContent := fmt.Sprintf(`
		Welcome to Money Mate!
		
		Hi %s,
		
		Thank you for joining Money Mate! We're excited to help you take control of your finances.
		
		What you can do with Money Mate:
		- Track Expenses: Monitor your spending with detailed categories
		- Set Savings Goals: Create and track progress on your financial goals
		- Analytics: Get insights into your spending patterns
		- Budget Management: Set budgets and stay on track
		
		Ready to get started? Log in to your account and begin tracking your finances!
		
		Best regards,
		The Money Mate Team
	`, user.Fullname)

	m.SetBody("text/html", htmlContent)
	m.AddAlternative("text/plain", plainTextContent)

	return s.dialer.DialAndSend(m)
}
