const assert = require('assert');
const request = require('request');
const URL = 'http://localhost:5000/';



//user account test
describe('User', function() {

    //test for user account creaction
  describe('User Account Creation', function() {
    let form ={
        email : "peterpaul@gmail.com",
      password :"peter"
      }
    it('should return an object', function(done) {
request.post({url:URL + 'create', form}, function(err, response, body){
    if (err) {
        return console.error('user creation failed:', err);
      }
assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(typeof(body.data), 'object');
done();
   })
        }
    );
  });


   

      describe('secure routes', function() {

        const id = '';
        const token = '';
        before(function() {
           //login user
    describe('User Authentication', function(done) {
        let form ={
            email : "peterpaul@gmail.com",
          password :"peter"
          }
        it('should return an object', function() {
   request.post({url:URL + 'login', form}, function(err, response, body){
        if (err) {
            return console.error('user login failed:', err);
          }
    assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(typeof(body.data), 'object');
        id = body.data.id;
        token = body.data.token;
    done();
       })
            }
        );
      });

        });
      
        // test cases
           //get user
    describe('get a user', function(done) {
        
        it('should return an object', function() {
  request.get({url:URL + 'user/'+id, headers: {
        'authorization': token
      }}, function(err, response, body){
        if (err) {
            return console.error('failed to get user account:', err);
          }
    assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(typeof(body.data), 'object');
    done();
       })
            }
        );
      });


           //get all users
           describe('get all user', function(done) {
        
            it('should return an object', function() {
    request.get({url:URL + 'user/'+id, headers: {
            'authorization': token
          }}, function(err, response, body){
            if (err) {
                return console.error('failed to get users:', err);
              }
        assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(typeof(body.data), 'object');
        done();
           })
                }
            );
          });
          
            //modify user account
            describe('Modify user account', function(done) {
                let form ={
                name: "peter2"
                  }
                it('should return an object', function() {
          request.put({url:URL + 'login/'+id, form}, function(err, response, body){
                if (err) {
                    return console.error('user acount modification failed:', err);
                  }
            assert.strictEqual(response.statusCode, 200);
                assert.strictEqual(typeof(body.data), 'object');
       
            done();
               })
                    }
                );
              });

      });
      
     
           //delete user account
           describe('Delete user', function(done) {
        
            it('should return an object', function() {
    request.delete({url:URL + 'user/'+id, headers: {
            'authorization': token
          }}, function(err, response, body){
            if (err) {
                return console.error('failed to delete user:', err);
              }
        assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(typeof(body.data), 'object');
        done();
           })
                }
            );
          });   

});



//Events test
describe('Event Creation', function() {

      describe('secure routes', function() {

        const id = '';
        const token = '';
        before(function() {
           //login user
    describe('User Authentication', function(done) {
        let form ={
            email : "peterpaul@gmail.com",
          password :"peter"
          }
        it('should return an object', function() {
     request.post({url:URL + 'login', form}, function(err, response, body){
        if (err) {
            return console.error('user login failed:', err);
          }
    assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(typeof(body.data), 'object');
        id = body.data.id;
        token = body.data.token;
    done();
       })
            }
        );
      });

        });
      
        // test cases
        
    //test for Event creaction
  describe('Event Creation', function() {
    let form ={
        name : "Geek Party",
    venue :"The Martrix",
    date: "10:10:2020"
      }
    it('should return an object', function(done) {
request.post({url:URL + 'event', form}, function(err, response, body){
    if (err) {
        return console.error('Event creation failed:', err);
      }
assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(typeof(body.data), 'object');
done();
   })
        }
    );
  });
           //get an Event
    describe('get an event', function(done) {
        
        it('should return an object', function() {
request.get({url:URL + 'event/'+id}, function(err, response, body){
        if (err) {
            return console.error('failed to get event:', err);
          }
    assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(typeof(body.data), 'object');
    done();
       })
            }
        );
      });


           //get all events
           describe('get all events', function(done) {
        
            it('should return an object', function() {
        request.get({url:URL + 'events/'}, function(err, response, body){
            if (err) {
                return console.error('failed to get events:', err);
              }
        assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(typeof(body.data), 'object');
        done();
           })
                }
            );
          });
          
            //modify an event
            describe('Modify an event', function(done) {
                let form ={
                name: "Geek party",
                venue: "Real worl",
                date: "12:22:2020"
                  }
                it('should return an object', function() {
              request.put({url:URL + 'event' + id, form}, function(err, response, body){
                if (err) {
                    return console.error('Event modification failed:', err);
                  }
            assert.strictEqual(response.statusCode, 200);
                assert.strictEqual(typeof(body.data), 'object');
          
            done();
               })
                    }
                );
              });

      });
      
     
           //delete Event
           describe('Delete Event', function(done) {
        
            it('should return an object', function() {
           request.delete({url:URL + 'event/'+id, headers: {
            'authorization': token
          }}, function(err, response, body){
            if (err) {
                return console.error('failed to delete event:', err);
              }
        assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(typeof(body.data), 'object');
        done();
           })
                }
            );
          });   

});



//Tecket booking test
describe('Book ticket', function() {


      describe('secure routes', function() {

        const id = '';
        const token = '';
        const eventId = ''
        before(function() {
           //login user
    describe('User Authentication', function(done) {
        let form ={
            email : "peterpaul@gmail.com",
          password :"peter"
          }
        it('should return an object', function() {
     request.post({url:URL + 'login', form}, function(err, response, body){
        if (err) {
            return console.error('user login failed:', err);
          }
    assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(typeof(body.data), 'object');
        id = body.data.id;
        token = body.data.token;
    done();
       })
            }
        );
      });



      describe('Event Creation', function() {
        let form ={
            name : "Geek Party",
        venue :"The Martrix",
        date: "10:10:2020"
          }
        it('should return an object', function(done) {
      request.post({url:URL + 'event', form}, function(err, response, body){
        if (err) {
            return console.error('Event creation failed:', err);
          }
    assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(typeof(body.data), 'object');
        eventId = body.data.id
    done();
       })
            }
        );
      });

        });
      
        // test cases

   //test for ticket creaction
   describe('ticket Creation', function() {
    let form ={
        eventId,
        quantity:"1"
      }
    it('should return an object', function(done) {
request.post({url:URL + 'ticket'+id, form, headers: {
    'authorization': token
  }}, function(err, response, body){
    if (err) {
        return console.error('ticket creation failed:', err);
      }
assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(typeof(body.data), 'object');
done();
   })
        }
    );
  });


         //get ticket
    describe('get a ticket', function(done) {
        
        it('should return an object', function() {
 request.get({url:URL + 'ticket/'+id, headers: {
        'authorization': token
      }}, function(err, response, body){
        if (err) {
            return console.error('failed to get user account:', err);
          }
    assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(typeof(body.data), 'object');
    done();
       })
            }
        );
      });


           //get all tickets
           describe('get all tickets', function(done) {
        
            it('should return an object', function() {
       request.get({url:URL + 'ticket/'+id, headers: {
            'authorization': token
          }}, function(err, response, body){
            if (err) {
                return console.error('failed to get all tickets:', err);
              }
        assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(typeof(body.data), 'object');
        done();
           })
                }
            );
          });
          
          

      });
      
    

           //delete ticket
           describe('Delete ticket', function(done) {
        
            it('should return an object', function() {
         request.delete({url:URL + 'ticket/'+id, headers: {
            'authorization': token
          }}, function(err, response, body){
            if (err) {
                return console.error('failed to delete ticket:', err);
              }
        assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(typeof(body.data), 'object');
        done();
           })
                }
            );
          }); 

});