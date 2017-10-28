const app = require('../dist/app').default;

let user = {}

//looking for name and password in arguments
for (let i = process.argv.length; i--;) {
    let current = process.argv[i];
    if (current.startsWith('name')) {
        user.name = current.split(':')[1];
    } else if (current.startsWith('password')) {
        user.password = current.split(':')[1];
    }
}

//name and password are required
if (!(user.name && user.password)) {
    console.error('\x1b[31m', 'name and password are required example: name:user1 password:123456')
    process.exit(1);
}

//creating the user
(async () => {
    try {
        let userDB = await app.models.UserModel.create(user);
        console.info('\x1b[34m', 'User created successfully data:', userDB.toJSON());    
    } catch (e) {
        console.error('\x1b[31m', e);
    }
})()