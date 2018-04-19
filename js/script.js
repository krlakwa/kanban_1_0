$(function() {

    function randomString() {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

            //removes column
            $columnDelete.on('click', function() {
                self.removeColumn();
            });

            //create a card after clicking on a button
            $columnAddCard.on('click', function() {
                self.addCard(new Card(prompt("Enter the name of the card")));
            });

            $column.append($columnTitle)
                .append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
            return $column;
        }
    }

    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    }

    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            
        }
    }
})