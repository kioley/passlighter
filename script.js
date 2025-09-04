async function generateSecureHash(site, salt, outputLength = 30, algorithm = 'SHA-512') {
    const encoder = new TextEncoder();
    const data = encoder.encode(site + salt);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?~';
    let result = '';
    
    for (let i = 0; i < outputLength; i++) {
        const byte = hashArray[i % hashArray.length];
        result += chars[byte % chars.length];
    }
    
    return result;
}
