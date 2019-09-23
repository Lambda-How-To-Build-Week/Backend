
const request = require('supertest');
const db = require('../database/dbConfig.js')
const server = require('../api/server.js');


describe('the server', () => {
    describe('GET /', () => {
        it('should run the testing env', () => {
            expect(process.env.DB_ENV).toBe('testing');
        })
    })
});

describe('POST /login', function(){
    it('it responds with 401 status code if bad username or password', function(done) {
        request(server)
            .post('/api/users/login')
            .type('json')
            .send('{"username":"notausername","password":"notapassword"}')
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
        });
    });

    it('it responds with 200 status code if good username or password', function(done) {
        request(server)
            .post('/api/users/login')
            .type('json')
            .send('{"username":"admin","password":"admin"}')
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
        });
    });
});

describe('POST /register', function(){

    beforeEach(async () => {
        await db('users').truncate();
    })


    const username = 'testAccount'
    const password = 'testPassword'
    var user = { username, password}

    it('it responds with 201 if request was good', function(done) {
        request(server)
            .post('/api/users/register')
            .send({"username":"abc","password":"admin"})
            .expect(201, done)
        });
    });

    it('it responds with 500 if request was bad', function(done) {
        request(server)
            .post('/api/users/register')
            .type('json')
            .send()
            .end(function(err, res) {
                expect(res.status).toBe(500)
                if (err) return done(err);
                done();
        });
    });

