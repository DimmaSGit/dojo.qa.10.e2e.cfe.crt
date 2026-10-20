export function getRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

export function generateUser() {
    const userName = `user-${getRandomString(8)}`;
    return { 
        userName,
        email: `${userName}${getRandomString(3)}@example.com`,
        password: '123test'
     };
}

