async function hashPassword(password) {
    // 1. Convert the password string to an array of bytes.
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    // 2. Use crypto.subtle.digest to generate the hash (SHA-256).
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    // 3. Convert the ArrayBuffer to a byte array, then to a hex string.
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
window.hashPassword = hashPassword;