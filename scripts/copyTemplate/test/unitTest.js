/**
 * Created by jerry on 16/5/17.
 */
var copyTemplate  = require('../copyTemplate');
var fs = require('fs');
var path = require('path');


copyTemplate.unzipTemplate('todo', function (flag) {
    var dir = path.resolve(__dirname,'..','tmp/template/ReactEngine-master');
    console.log(dir);
    fs.exists(dir, function (exists) {
        console.log("**  exists : "+ exists +"  **");
    });
});
describe('#unzipTemplate', function () {
    it('should be find dir in tmp dir', function () {
        copyTemplate.unzipTemplate('todo', function (flag) {
           var dir = path.resolve(__dirname,'..','tmp/template/ReactEngine-master');
            console.log("**  flag : "+ flag +"  **");
            fs.exists(dir, function (exists) {
                console.log(exists);
                expect(exists).to.equal(true);
            });
        });
    });
});
