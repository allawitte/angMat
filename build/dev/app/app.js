'use strict';

angular.module('appModule', ['ngMaterial'])
	.config(function($mdIconProvider){
        $mdIconProvider.defaultIconSet('./svg/avatars.svg', 256);
        $mdIconProvider.icon('share','./svg/share.svg', 24);
    })
	.service('usersService', usersService)
    .controller('MainCtrl', MainController);


    
        function usersService($q) {
     
     
        /**
         * Users DataService
         * Uses embedded, hard-coded data model; acts asynchronously to simulate
         * remote data service call(s).
         *
         * @returns {{loadAll: Function}}
         * @constructor
         */
     
        var users = [
            {
                name: 'Lia Lugo',
                avatar: 'avatar-1',
                content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
            },
            {
                name: 'George Duke',
                avatar: 'avatar-2',
                content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
            },
            {
                name: 'Gener Delosreyes',
                avatar: 'avatar-3',
                content: 'Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeneys blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS.'
            },
            {
                name: 'Lawrence Ray',
                avatar: 'avatar-4',
                content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
            },
            {
                name: 'Ernesto Urbina',
                avatar: 'avatar-5',
                content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
            },
            {
                name: 'Gani Ferrer',
                avatar: 'avatar-6',
                content: 'Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new drivers license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You dont go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada.'
            }
        ];
     
        // Promise-based API
        return {
            loadAll : function() {
                // Simulate async nature of real remote calls
                return $q.when(users);
            }
        };
    
}
//@ngInject    
MainController.$inject = ['$scope', 'usersService', '$mdBottomSheet'];

function MainController($scope, usersService, $mdBottomSheet) {
	var self = this;
    $scope.selectedUser = null;
	self.users = [];
   

    
    self.selected = null;
    //self.selectUsers = selectUsers;
    //self.share = share;
    usersService
    .loadAll()
    .then(function(users){
    	self.users = [].concat(users);
    	self.selected = users[0];
    })

    self.selectUsers = function(u){
    	
    	self.selected = u;
        $scope.selectedUser = self.selected;
    	
    	
    }

    self.share = function(selectedUser){
        $mdBottomSheet.show({
            controller: userSheetController,
            controllerAs: 'usc',
            templateUrl: './app/bottomsheet.html',
            parent: angular.element(document.querySelector('#content'))
        });
        console.log(selectedUser);

        function userSheetController(){
            var sl = this;
            sl.user = $scope.selectedUser;
            console.log(sl.user);
            sl.items = [
            {name: 'Phone', icon:"phone", icon_url:"./svg/phone.svg"},
            {name: 'Twitter', icon:"twitter", icon_url:"./svg/twitter.svg"},
            {name: 'Google', icon:"google", icon_url:"./svg/google-plus.svg"},
            {name: 'Hangout', icon:"hangout", icon_url:"./svg/line.svg"},
            ];        

            this.performAction = function(action){
                $mdBottomSheet.hide();
            }
        }

    }


}
