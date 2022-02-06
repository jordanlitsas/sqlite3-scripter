var expect = require("chai").expect;
var request = require("request");


var url = 'http://localhost:1010/test/';


describe("create unique combination of username/database name", function(){

    //test case 1
    it ("returns a user instance just created in database", function(done){
        request(url + 1, function(error, res, body){
            body = JSON.parse(body);
            body = body.newUser;
            expect(body.username).to.equal("test");
            expect(body.databaseName).to.equal("test");
            expect(body.tables.length).to.equal(0);
            done();
        })
    })

    //test case 2
    it("status code 200 if user/database has been created", function(done){
        request(url + 2, function(error, res, body){
            expect(res.statusCode).to.equal(200);
            done();
        })
    })

    //test case 2
    it("status code 400 if user/database is taken", function(done){
        request(url + 2, function(error, res, body){
            expect(res.statusCode).to.equal(400);
            done();
        })
    })

    //test case 2
    it("result = used if user/database is taken", function(done){
        request(url + 2, function(error, res, body){
            body = JSON.parse(body);
            expect(body.result).to.equal("used");
            done();
        })
    })
});

describe("user can save the table elements they create to mongoDB", function(){
    

    it("status code = 200, upload/update was successful", function(done){
        request(url + 3, function(error, res, body){
            expect(res.statusCode).to.equal(200);
            done();
        })
    }) 
    it("status code = 400, upload/update was unsuccessful", function(done){
        request(url + 4, function(error, res, body){
            expect(res.statusCode).to.equal(400);
            done();
        })
    })

    
})


describe("user can login with user and database names", function(){
    it ("returns a status code of 200 when the input information equals the retrieved database instance", function(done){
        request(url + 5, function(error, res, body){
            expect(res.statusCode).to.equal(200);
            done;
        })
    })

    it ("returns a status code of 400 when the input information returns no database instance", function(done){
        request(url + 6, function(error, res, body){
            expect(res.statusCode).to.equal(400);
            done;
        })
    })
})