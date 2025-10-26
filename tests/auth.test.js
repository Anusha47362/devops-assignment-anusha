// Test file for User Authentication Module
const UserAuth = require('../src/auth');

describe('UserAuth', () => {
    let auth;

    beforeEach(() => {
        auth = new UserAuth();
    });

    describe('User Registration', () => {
        test('should register a new user successfully', () => {
            const result = auth.register('testuser', 'password123', 'test@example.com');
            
            expect(result.success).toBe(true);
            expect(result.message).toBe('User registered successfully');
            expect(result.userId).toBeDefined();
        });

        test('should fail registration with missing fields', () => {
            const result = auth.register('testuser', '', 'test@example.com');
            
            expect(result.success).toBe(false);
            expect(result.message).toBe('All fields are required');
        });

        test('should prevent duplicate user registration', () => {
            // Register user first time
            auth.register('testuser', 'password123', 'test@example.com');
            
            // Try to register again
            const result = auth.register('testuser', 'password456', 'different@example.com');
            
            expect(result.success).toBe(false);
            expect(result.message).toBe('User already exists');
        });
    });

    describe('User Login', () => {
        beforeEach(() => {
            // Register a test user
            auth.register('testuser', 'password123', 'test@example.com');
        });

        test('should login with valid credentials', () => {
            const result = auth.login('testuser', 'password123');
            
            expect(result.success).toBe(true);
            expect(result.message).toBe('Login successful');
            expect(result.token).toBeDefined();
            expect(result.user.username).toBe('testuser');
        });

        test('should fail login with invalid credentials', () => {
            const result = auth.login('testuser', 'wrongpassword');
            
            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid credentials');
        });

        test('should login with email instead of username', () => {
            const result = auth.login('test@example.com', 'password123');
            
            expect(result.success).toBe(true);
            expect(result.user.username).toBe('testuser');
        });
    });

    describe('Session Management', () => {
        let sessionToken;

        beforeEach(() => {
            // Register and login a user
            auth.register('testuser', 'password123', 'test@example.com');
            const loginResult = auth.login('testuser', 'password123');
            sessionToken = loginResult.token;
        });

        test('should verify valid session', () => {
            const result = auth.verifySession(sessionToken);
            
            expect(result.success).toBe(true);
            expect(result.session.username).toBe('testuser');
        });

        test('should fail verification for invalid session', () => {
            const result = auth.verifySession('invalid_token');
            
            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid session');
        });

        test('should logout successfully', () => {
            const result = auth.logout(sessionToken);
            
            expect(result.success).toBe(true);
            expect(result.message).toBe('Logged out successfully');
            
            // Verify session is invalidated
            const verifyResult = auth.verifySession(sessionToken);
            expect(verifyResult.success).toBe(false);
        });
    });
});