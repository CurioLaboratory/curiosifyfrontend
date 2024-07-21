// // const dummyUsers = [
// //     {
// //         id: 1,
// //         email: "gaurav.shresth2000@gmail.com",
// //         password: "123",
// //         full_name: "Test User",
// //         username: "testuser",
// //         registration_number: "1234567890"
// //     }
// // ];

// export const loginUser = async (email, password) => {
//     await new Promise(resolve => setTimeout(resolve, 500));
//     const user = dummyUsers.find(u => u.email === email && u.password === password);
//     if (user) {
//         const { password, ...userWithoutPassword } = user;
//         return userWithoutPassword;
//     } else {
//         throw new Error('Invalid email or password');
//     }
// };

// export const registerUser = async (userData) => {
//     await new Promise(resolve => setTimeout(resolve, 500));
//     if (dummyUsers.some(u => u.email === userData.email)) {
//         throw new Error('User with this email already exists');
//     }
//     const newUser = { id: dummyUsers.length + 1, ...userData };
//     dummyUsers.push(newUser);
//     const { password, ...userWithoutPassword } = newUser;
//     return userWithoutPassword;
// };