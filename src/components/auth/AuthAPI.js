// const API_URL = 'https://api.example.com';

// export const loginUser = async (email, password) => {
//     try {
//         const response = await fetch(`${API_URL}/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//         });

//         if (!response.ok) {
//             throw new Error('Login failed');
//         }

//         const data = await response.json();
//         return data.user;
//     } catch (error) {
//         throw new Error(error.message || 'An error occurred during login');
//     }
// };

// export const registerUser = async (email, password) => {
//     try {
//         const response = await fetch(`${API_URL}/register`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//         });

//         if (!response.ok) {
//             throw new Error('Registration failed');
//         }

//         const data = await response.json();
//         return data.user;
//     } catch (error) {
//         throw new Error(error.message || 'An error occurred during registration');
//     }
// };


// Dummy user data
const dummyUsers = [
    {
        id: 1,
        email: "gaurav.shresth2000@gmail.com",
        password: "123",
        full_name: "Test User",
        username: "testuser",
        registration_number: "1234567890"
    }
];

export const loginUser = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = dummyUsers.find(u => u.email === email && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    } else {
        throw new Error('Invalid email or password');
    }
};

export const registerUser = async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (dummyUsers.some(u => u.email === userData.email)) {
        throw new Error('User with this email already exists');
    }
    const newUser = { id: dummyUsers.length + 1, ...userData };
    dummyUsers.push(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
};