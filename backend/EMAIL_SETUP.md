# Server Configuration
PORT=8080
ENVIRONMENT=development

# Database Configuration
DATABASE_URL=root:@tcp(localhost:3306)/money_mate?charset=utf8mb4&parseTime=True&loc=Local

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# SMTP Configuration for Email Service
SMTP_HOST=localhost
SMTP_PORT=2525
SMTP_USERNAME=
SMTP_PASSWORD=
FROM_EMAIL=noreply@moneymate.dev
FROM_NAME=Money Mate