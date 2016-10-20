function removeDuplicates(data){
	var unique = [];
    for(var i in data){
        if(unique.indexOf(data[i]) === -1){
        	 if (!(data[i] === undefined || data[i] === null)) {
        	 	 unique.push(data[i]);
        	 }
           
        }
    }
    return unique;
}

function notIn(src,dest){
	var unique = [];
	var j =0;
	var flag = true;
    for(var i in src){
    	flag = true;
    	for(j in dest) {
        	if(src[i] == dest[j]){
        		flag = false;
        		break;
        	}
        }
        if(flag)
        unique.push(src[i]);
    }
    console.log("not in results"+unique);
    return unique;
}

function pivotPointCalucator(hlc){
   // console.log("Before HLC "+JSON.stringify(hlc));
    var Pivot, R3,R2,R1,S3,S2,S1;
    var RS ={};
    Pivot = (hlc.H + hlc.C + hlc.L) / 3 ;
    R3 = hlc.H + 2 * ( Pivot - hlc.L ) ;
    R1 = 2 * Pivot - hlc.L;
    S1 = 2 * Pivot - hlc.H  ;
    R2 = Pivot + ( R1 - S1 ) ;
    S2 = Pivot - ( R1 - S1 );
    S3 = hlc.L - 2 * ( hlc.H - Pivot ) ;

    RS.pivot = Pivot;
    RS.R1 = R1;
    RS.R2 = R2;
    RS.R3 = R3;
    RS.S1 = S1;
    RS.S2 = S2;
    RS.S3 = S3;
//console.log("HLC "+JSON.stringify(RS));
    return RS
}
module.exports.removeDuplicates = removeDuplicates;
module.exports.notIn = notIn;
module.exports.pivotPointCalucator = pivotPointCalucator;