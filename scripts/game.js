let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id) {

       let card = this.cards.filter(card=>card.id===id)[0];
       console.log(card);
       if (card.flipped || this.lockMode) {
         return false;
       }
    
       if(!this.firstCard) {
        this.firstCard = card;
        this.firstCard.flipped = true;
        return true;
       }else{
        this.secondCard = card;
        this.secondCard.flipped = true;
        this.lockMode = true;
        return true;
       }

    },

    checkMatch:function(){
        if(!this.firstCard || !this.secondCard) {
           return false; 
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCard: function(){
       this.firstCard = null;
       this.secondCard =null;
       this.lockMode = false;

    },
    unflipCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped =false;
        this.clearCard();

    },
    checkGameOver(){

       return this.cards.filter(card => !card.flipped).length == 0;
        
    },


    tech: ['bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mango',
        'node',
        'react'],

    cards: null,

     createCardsFromTech: function () {

         this.cards = [];
    
         this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        })
    
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();

    },
    
    createPairFromTech: function (tech) {
        return [
            {
                id: this.createIdWithTech(tech),
                icon: tech,
                flipped: false,
            },
            {
                id: this.createIdWithTech(tech), // Correção aqui
                icon: tech,
                flipped: false,
            }]
    },
    
    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    }
}


shuffleCards: function () {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        [this.cards[randomIndex], this.cards[currentIndex - 1]] = [this.cards[currentIndex - 1], this.cards[randomIndex]];
        currentIndex--;
    }
}