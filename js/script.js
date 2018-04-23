$(function () {

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
            var $columnSetCardName = $('<form>').addClass('set-card-name').hide();

            $columnSetCardName.append('<input type="text" class="card-name" id="js-card-name">');
            $columnSetCardName.append('<input type="button" class="card-name-btn" value="Add">');

            $columnDelete.on('click', function() {
                self.removeColumn();
            });

            $columnAddCard.on('click', function() {
                $columnSetCardName.slideToggle();

                $('.card-name-btn').on('click', function() {
                    var cardName = document.getElementById('js-card-name').value;
                    self.addCard(new Card(cardName));
                    $columnSetCardName.slideToggle();
                });
            });

            $column.append($columnTitle)
                .append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnSetCardName)
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
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');

            $cardDelete.on('click', function() {
                self.removeCard();
            });

            $card.append($cardDelete)
                .append($cardDescription);
            return $card;
        }
    }

    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    }

    var board = {
        name: "Kanban Board",
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    }

    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    $('.set-column-name').hide();

    $('.create-column').on('click', function() {
        $('.set-column-name').slideToggle();
    });

    $('.column-name-btn').on('click', function() {
        var name = document.getElementById('column-name').value;
        var column = new Column(name);

        board.addColumn(column);
        $('.set-column-name').slideToggle();
    })

    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');


    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);


    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');


    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
})