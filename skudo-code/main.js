var easyLevelQueArray = ['','',6,'',5,4,9,'','',1,'','','',6,'','',4,2,7,'','','',8,9,'',
                         '','','',7,'','','',5,'',8,1,'',5,'',3,4,'',6,'','',4,'',2,'','','',
                         '','','','',3,4,'','','',1,'','',9,'','',8,'','','',5,'','','', '',4,
                         '','',3,6,7]

var easyLeveAnswerArray = [2,8,6,1,5,4,9,7,3,1,9,5,7,6,3,8,4,2,7,4,3,2,8,9,5,1,6,3,7,9,6,2,5,4,8,1,
                           8,5,1,3,4,7,6,2,9,4,6,2,9,1,8,7,3,5,6,3,4,5,7,2,1,9,8,9,1,7,8,3,6,2,5,4,5,
                           2,8,4,9,1,3,6,7]

var midumLvelQueArray = ['','','','',2,'','',4,7,'','',4,'','','',2,'','',1,'',5,3,'','',6,'','','',3,'',2,
                          4,'','','','',7,'','','','','','',6,'','','','',6,'','',4,'','','','',7,'','','','',
                          1,'',5,'','','',6,3,'','','','','',8,5,'','','','','']

var midumLvelAnswerArray = [6,8,3,9,2,5,1,4,7,9,7,4,8,1,6,2,3,5,1,2,5,3,7,4,6,8,9,8,3,6,2,
                          4,7,9,5,1,7,4,9,1,5,8,3,6,2,2,5,1,6,3,9,4,7,8,3,9,7,4,8,2,5,1
                          ,6,5,1,2,7,6,3,8,9,4,4,6,8,5,9,1,7,2,3]

var hardLvelQueArray = ['',8,'','','','',5,'',2,'','',4,'','',5,'','','',3,'','','',4,'',8,'','','','','',
                          '','',6,'','','','','','','','','','',6,9,'','','',2,'','','','','','',1,'','',5,'',2
                          ,'',8,7,6,'','','','','','','',2,'','',9,'','',1,'','']

var hardLvelAnswerArray = [1,8,7,3,6,9,5,4,2,9,2,4,7,8,5,6,1,3,3,5,6,1,4,2,8,9,7,8,4,3,5,9,6,7,2,1,5,7,2,4,1,8,
                           3,6,9,6,9,1,2,3,7,4,8,5,4,1,9,6,5,3,2
                           ,7,8,7,6,5,8,2,1,9,3,4,2,3,8,9,7,4,1,5,6]


var queArray = []
var sulutionArray = []



var score = 15;
var movesCounter = 0;
var movesLimit = 10;
var playerNumberChoice = 0;
var playerPositionChoice = 0;

$(document).ready(()=>{
alert('Choose Difficulty Level First Then Start Game')
init()
levelFunction(queArray ,sulutionArray)
$('.resetButton').hide()
$('.number').hide()
$('.statrButton').hide()


})

function init(){

//start game 
$('.statrButton').on('click',()=> {
levelFunction()   
uploadArray()
$('.number').show()
$('.statrButton').hide()
$('.resetButton').show()
$('.cells').css('pointer-events', 'auto')
$('.radioButtons').css('pointer-events', 'none')

})

  //take number
$('.number').click( function (evt){
    playerNumberChoice = parseInt($(evt.currentTarget).text())
    $('.number').removeClass('change-color-grey')
    $(evt.currentTarget).addClass('change-color-grey')
    $('#message').text('')
    

})

//return all changes
$('.resetButton').click(function () {
    uploadArray ()
    $('.cells').css('pointer-events', 'auto')
    movesCounter = 0
    score = 15
    $('#score').text(score)
    $('#counter').text(movesCounter)
    $('#message').text('')

})

//take board index of the player click 
$('.cells').click(function(evt){
    playerPositionChoice = parseInt($(evt.currentTarget).index())
    play(evt);
    gameFinished();
    $('.number').removeClass('change-color-grey')
})

}

function levelFunction() {
    $('#easy').change(function(){
        if(this.checked){
           $('.statrButton').show()
           queArray = Array.from(easyLevelQueArray)
           sulutionArray = Array.from (easyLeveAnswerArray)
        }
    })
    $('#medium').change(function(){
        if(this.checked){
           $('.statrButton').show()
           queArray = Array.from(midumLvelQueArray)
           sulutionArray = Array.from (midumLvelAnswerArray)
        }
    })
    $('#hard').change(function(){
        if(this.checked){
           $('.statrButton').show()
           queArray = Array.from(hardLvelQueArray)
           sulutionArray = Array.from (hardLvelAnswerArray)       
         }
    })
   
    
}

function uploadArray (){
    
    for(let i =0 ; i<queArray.length;i++){
        document.getElementsByClassName('cells')[i].textContent=queArray[i]
    }
    
}


function play(evt) {
    if(playerNumberChoice !== 0){ 
        if ( sulutionArray[playerPositionChoice] === playerNumberChoice){
        $(evt.currentTarget).text(playerNumberChoice);
        playerNumberChoice = 0;
        playerPositionChoice = 0;
        //
        score = score + 5;
        $('#score').text(score)
        blockedCells ()
        if(areAllCellsFull() == true){
            alert("YOU WON WIH "+score +" BOINTS")
        }
    } else {
        $('#message').text('Worng Number Try Again You Lost 5 Points')
        movesCounter++
        $('#counter').text(movesCounter)
        playerNumberChoice = 0;
        playerPositionChoice = 0;
        score = score - 5;
        $('#score').text(score)

    }
}else {
    playerPositionChoice = 0;
    playerNumberChoice = 0;
    alert("Choose a Number First and then Position")

    }
}


// count attempts Number
function gameFinished (){
if(movesCounter === movesLimit || score == 0){
    alert('you loose')
    movesCounter =0 
    score = 15
    $('#counter').text(movesCounter)
    $( ".cells" ).text('')
    $('#score').text(score)
    $('.number').removeClass('change-color-grey')
    $('#message').text('')


}

}


//
function areAllCellsFull(empty){
    var empty = true
    $('.cells').each(function() {
        if($(this).text() == ''){
            empty = false
        }
    });
    return empty
}



//blocked cells if player input right number
function blockedCells (){
    $('.cells').each(function() {
        if($(this).text() !== ''){
            $(this).css('pointer-events', 'none')
        }
    });
}
