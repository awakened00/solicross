//solicross.js
var imgsrc = "http://deckofcardsapi.com/static/img/";
var   hearts = [["AH",  1], ["2H", 2], ["3H", 3], ["4H", 4], ["5H", 5], ["6H", 6], ["7H", 7], ["8H", 8], ["9H", 9], ["0H", 10], ["JH", 11], ["QH", 12], ["KH", 13]];
var   spades = [["AS", 1], ["2S", 2], ["3S", 3], ["4S", 4], ["5S", 5], ["6S", 6], ["7S", 7], ["8S", 8], ["9S", 9], ["0S", 10], ["JS", 11], ["QS", 12], ["KS", 13]];
var diamonds = [["AD", 1], ["2D", 2], ["3D", 3], ["4D", 4], ["5D", 5], ["6D", 6], ["7D", 7], ["8D", 8], ["9D", 9], ["0D", 10], ["JD", 11], ["QD", 12], ["KD", 13]];
var    clubs = [["AC", 1], ["2C", 2], ["3C", 3], ["4C", 4], ["5C", 5], ["6C", 6], ["7C", 7], ["8C", 8], ["9C", 9], ["0C", 10], ["JC", 11], ["QC", 12], ["KC", 13]];
var   jokers = [["JR", 0], ["JB", 0]];
var     cell = ["s1", "d1", "s2", "d2", "d0", "d3", "s3", "d4", "s4", "s0"];
var    cards =  hearts.concat(spades,  diamonds,  clubs,  jokers);
var        d = [[], [], [], [], [], []];
var        s = [[], [], [], [], [], []];
s[0] = [];
var i = 0;
for (i = 0; i <= 51; i += 1) {s[0].push(i); }


function shuffle(array) {
    "use strict";
    var i;
    for (i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * array.length);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
}
   return array;
}

function pushNextCard(thisid){
    "use strict";
console.log(">>>>> pushNextCard(thisid):"+ thisid)
    var    card = thisid.substr(2);
    var success = false;
    var   value = cards[card][1];
    var   index = thisid.charAt(1);
    var    type = thisid.charAt(0);
    var topcard,   topvalue, len, remaining = 0;
    var thissrc = '';
console.log("type is "+ type + " - index is "+ index +" - card is:" + card+"-"+cards[card][0])
     if (type == "s"){len= s[index].length; topcard = s[index][len-1];}
else if (type == "d"){len= d[index].length; topcard = d[index][len-1];}
    if (len>0){topvalue = cards[topcard][1]}else{topvalue = 0}
console.log("value is "+ value + " - topcard is "+topcard)
    if (type == "s" && topvalue+1 == value){s[index].push(card);success = true}
    else if ((type == "d" && index!= "0")&&(value>1)&&(topvalue+1 == value||topvalue-1 == value||topvalue == 0))
         {d[index].push(card);success= true}
  if (success){
    thissrc = imgsrc + cards[card][0] + ".png";
    document.getElementById(type+index).src = thissrc;
    }
return success;
}

function tryNextCard(tryid){
    "use strict";
    console.log ("tryNextCard *-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-* >")
    var index = tryid.charAt(1);
    var type = tryid.charAt(0);
    var card = 0;
    var nextcard = 0;
    var success = false;
    var len, remaining = 0;
    var thispile, thisid, thissrc, nextsrc = '';
    if(type == "s"){if(s[index].length == 0){return};
      card= s[index].pop();len= s[index].length;nextcard= s[index][len-1]}
    else if(type == "d"){if(d[index].length == 0){return};
      card= d[index].pop();len= d[index].length;nextcard= d[index][len-1]}
    if (card < 0) {return} // if card is 0 ,   get out
      for (var pile= 0; pile < 9; pile++)// try all 9 piles,   except d0
        {thispile = cell[pile];
         if (!(tryid == thispile || thispile == "d0")){// skip the giving pile // skip the garbage pile
                 thisid = cell[pile]+card; if (len == 0){nextcard = 52}
console.log ("tryNextCard-pile:"+cell[pile]+" card:"+card+"-"+cards[card][0]+" nextcard:"+nextcard+"-"+cards[nextcard][0]);
                 success = pushNextCard(thisid); // try it!
                 if(success == true){console.log("Success!");break}
            }
        } // next pile
    if (!success){ // put the card in the garbage pile
console.log("Sorry!"+"tryid:"+tryid+" card:"+cards[card][0]);
        d[0].push(card);
        if (tryid!= "d0"){
        thissrc = imgsrc + cards[card][0] + ".png";
        document.getElementById("d0").src = thissrc;
        }
    }
     nextsrc = imgsrc + cards[nextcard][0] + ".png";      // display the next card
    if (len == 0){nextsrc = "bg-green.png"; }   // nexcard is 0 display the empty box
    if (tryid!= "d0" || (tryid  == "d0" && success))
    {
         document.getElementById(type+index).src = nextsrc;
    }
    remaining = s[0].length;
    //document.getElementById("remaining").innerHTML = remaining;
}


function getNewDeck(){
    "use strict";
console.log("getNewDeck()")
    d = [[],  [],  [],  [],  [],  []];
    s = [[],  [],  [],  [],  [],  []];
    for (var i= 0;i<= 51;i++){s[0].push(i);};s[0] = shuffle(s[0]);
    //deck = []; for (var i= 0;i<= 51;i++){deck.push(cards[s[0][i]][0]);}
    //remaining = s[0].length;
    //document.getElementById("remaining").innerHTML = remaining;
    var thissrc = "bg-green.png";// clear all piles
    for(var pile= 0;pile<9;pile++){document.getElementById(cell[pile]).src= thissrc;}
    thissrc = imgsrc + cards[s[0][s[0].length-1]][0]+".png";
    document.getElementById("s0").src = thissrc; // display the first card
}

function theBoard(){
    /*
    console.log("T H E   B O A R D")
    console.log("s3:"+s[3]);
    console.log("d1:"+d[1]);
    console.log("s2:"+s[2]);

    console.log("d2:"+d[2]);
    console.log("d0:"+d[0]);
    console.log("d3:"+d[3]);

    console.log("s3:"+s[3]);
    console.log("d4:"+d[4]);
    console.log("s4:"+s[4]);

    console.log("s0:"+s[0]);

    */
console.log("T H E   C A R D S")
   for (var pile= 0; pile <10; pile++)
     {
        var thispile = cell[pile];
        var index = thispile.charAt(1);
        var type = thispile.charAt(0);
        var len = 0;
        var card = "";
        var pilecards = []
        if(type == "s"){len= s[index].length}else if(type == "d"){len= d[index].length}
        for (var i= 0;i<len;i++)
            {
                if(type == "s"){card= cards[s[index][i]][0]}else if(type == "d"){card= cards[d[index][i]][0]}
                pilecards.push(card)
            }
console.log(thispile + ":" + pilecards)
     }
}
