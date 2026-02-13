// 비밀번호 해시 만들어서 DB에 수동으로 넣을 때 사용
import bcrypt from 'bcryptjs';

const password = process.argv[2] || 'test1234';
const salt = bcrypt.genSaltSync(8);
const hash = bcrypt.hashSync(password, salt);

console.log('Password:', password);
console.log('Hash:', hash);
