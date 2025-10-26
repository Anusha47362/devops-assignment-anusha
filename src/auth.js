// User Authentication Module
// This is a sample implementation for demonstrating branching workflow

class UserAuth {
    constructor() {
        this.users = [];
        this.sessions = new Map();
    }

    /**
     * Register a new user
     * @param {string} username - User's username
     * @param {string} password - User's password
     * @param {string} email - User's email
     * @returns {Object} Result of registration
     */
    register(username, password, email) {
        // Basic validation
        if (!username || !password || !email) {
            return { success: false, message: 'All fields are required' };
        }

        // Check if user already exists
        const existingUser = this.users.find(user => user.username === username || user.email === email);
        if (existingUser) {
            return { success: false, message: 'User already exists' };
        }

        // Create new user (in real app, password should be hashed)
        const newUser = {
            id: Date.now().toString(),
            username,
            password, // TODO: Hash password before storing
            email,
            createdAt: new Date()
        };

        this.users.push(newUser);
        return { success: true, message: 'User registered successfully', userId: newUser.id };
    }

    /**
     * Authenticate user login
     * @param {string} username - Username or email
     * @param {string} password - User's password
     * @returns {Object} Authentication result
     */
    login(username, password) {
        const user = this.users.find(u => 
            (u.username === username || u.email === username) && u.password === password
        );

        if (!user) {
            return { success: false, message: 'Invalid credentials' };
        }

        // Create session token (simplified)
        const sessionToken = `session_${Date.now()}_${Math.random()}`;
        this.sessions.set(sessionToken, {
            userId: user.id,
            username: user.username,
            loginTime: new Date()
        });

        return {
            success: true,
            message: 'Login successful',
            token: sessionToken,
            user: { id: user.id, username: user.username, email: user.email }
        };
    }

    /**
     * Verify session token
     * @param {string} token - Session token to verify
     * @returns {Object} Session verification result
     */
    verifySession(token) {
        const session = this.sessions.get(token);
        if (!session) {
            return { success: false, message: 'Invalid session' };
        }

        return { success: true, session };
    }

    /**
     * Logout user
     * @param {string} token - Session token to invalidate
     * @returns {Object} Logout result
     */
    logout(token) {
        if (this.sessions.has(token)) {
            this.sessions.delete(token);
            return { success: true, message: 'Logged out successfully' };
        }
        return { success: false, message: 'Invalid session' };
    }
}

module.exports = UserAuth;