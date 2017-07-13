
var knexFile = require('./knexfile');
var knex = require('knex')(knexFile);

function testCreate() {


    //Parce qu'on est connecté sans database, on peut en créer une sur notre serveur SQL
    knex.raw('CREATE DATABASE test2')
        .then(function(){
            //On se déconnecte ensuite en détruisant l'objet knex.
            knex.destroy();

            // On ajoute une clé database à l'objet de knexfile.
            knexFile.database = 'test2';

            //Et on se reconnecte
            knex = require('knex')(knexFile);

            //Pour vérifier qu'on est bien connecté, on crée une table dans la database.
            knex.schema.createTable('my_table', function (table) {
                table.string('my_field');
            })
        });
}

function testDrop(){
    /*Pour droper la database, on devra sans doute suivre le même processus, étant donné
    qu'il n'y a pas de clé database dans knexfile actuellement, un simple raw suffira,
    dans la fonction suivante, on sera par contre obligé de se déconnecter de la database.*/
    knex.raw('DROP DATABASE test2').then(function(err, res){
        console.log("test2 est supprimée !");
    });
}

function testBoth(){

    //Parce qu'on est connecté sans database, on peut en créer une sur notre serveur SQL
    knex.raw('CREATE DATABASE test2')
        .then(function(){
            console.log("test2 crée !");
            //On se déconnecte ensuite en détruisant l'objet knex.
            knex.destroy();

            // On ajoute une clé database à l'objet de knexfile.
            knexFile.database = 'test2';

            //Et on se reconnecte
            knex = require('knex')(knexFile);

            //Pour vérifier qu'on est bien connecté, on crée une table dans la database.
            knex.schema.createTable('my_table', function (table) {
                table.string('my_field');
            })
        });

    /*Pour droper la database, on devra sans doute suivre le même processus, étant donné
     qu'il y a une clé database dans knexfile actuellement, on sera obligé de se déconnecter
     de la database.*/

    knex.destroy();
    knexFile.database = '';
    knex = require('knex')(knexFile);

    setTimeout(function(){ //Dix secondes pour vérifier que test2 a bien été crée avant destruction
        knex.raw('DROP DATABASE test2').then(function(err, res){
            console.log("test2 est supprimée !");
        });
    }, 10000)
}

testBoth();


