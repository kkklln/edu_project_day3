const crypto = require('crypto');
require('dotenv').config();

// 암호화 알고리즘 설정
const ALGORITHM = 'aes-256-cbc';
// 환경 변수에서 키를 가져오고, 없거나 길이가 맞지 않으면 에러 방지를 위해 해시 처리하여 32바이트 생성
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY 
  ? crypto.createHash('sha256').update(process.env.ENCRYPTION_KEY).digest() 
  : crypto.randomBytes(32); 
const IV_LENGTH = 16; // AES 블록 사이즈

/**
 * 텍스트를 암호화합니다.
 * @param {string} text 암호화할 평문
 * @returns {string} 암호화된 문자열 (iv:encryptedData 형식)
 */
function encrypt(text) {
  if (!text) return text;
  
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // IV를 함께 저장해야 나중에 복호화가 가능합니다.
  return iv.toString('hex') + ':' + encrypted;
}

/**
 * 암호화된 텍스트를 복호화합니다.
 * @param {string} text 암호화된 문자열 (iv:encryptedData 형식)
 * @returns {string} 복호화된 평문
 */
function decrypt(text) {
  if (!text || !text.includes(':')) return text;

  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

module.exports = { encrypt, decrypt };
