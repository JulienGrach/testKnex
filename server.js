
var knexFile = require('./knexfile');
var knex = require('knex')(knexFile);


function testCreate(){

    //Parce qu'on est connecté sans database, on peut en créer une sur notre serveur SQL
    return knex.raw('CREATE DATABASE test2')
        .then(function(){
            console.log("test2 created !");

            //On se déconnecte ensuite du serveur en détruisant l'objet knex.
            knex.destroy();
            // On ajoute une clé database à l'objet de knexfile.
            knexFile.connection.database = 'test2';
            //Et on se reconnecte
            knex = require('knex')(knexFile);

            console.log('test2 connected');

            //Pour tester si la connection à la database est effective, on lui insère une table.
            knex.schema.createTable('my_table_test', function (table) {
                table.string('my_field');
            }).then(function(){
                console.log("my_table_test created !");
            })
        });
}

function testDrop(){
    /*Pour droper la database, on devra sans doute suivre le même processus, étant donné
     qu'il n'y a pas de clé database dans knexfile actuellement, un simple raw suffira,
     dans la fonction suivante, on sera par contre obligé de se déconnecter de la database.*/
    knex.raw('DROP DATABASE test2')
        .then(function(err, res){
            console.log("test2 dropped !");
        });
}


function testBoth(){
    testCreate().then(function(){

        //On se déconnecte de la database.
        knex.destroy();
        knexFile.connection.database = '';
        knex = require('knex')(knexFile);
        console.log('test2 disconnected');

        //On laisse 10 seconds avant le drop pour laisser un temps de vérification
        console.log('10 seconds to see if table created');
        setTimeout(function (){
            testDrop();
        }, 10000);
    });
}



testBoth();


