
// Domoticz ids for the parts of the coffee machine
var coffeeMachineStatusIdx = 8
var smallCoffeeIdx = 10
var largeCoffeeIdx = 11
var powerIdx = 9

var status = 'nc'
var lastSeen = 'nc'

/*function coffeeBlock() {
    updateCoffeeStatus()
    //var html= getHTML();
    //$('.row.dashboard:first').prepend(html);
}*/

/*function getHTML() {
    var html='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="coffee-machine">';
    html+='<div class="panel panel-default">';
        html+='<div class="panel-heading">';
            html+='<div class="row">';
                html+='<div class="col-xs-8 text-left">';
                    html+='<div class="huge">Coffee</div>';
                    html+='<div>' + status + '</div>';
                html+='</div>';
                html+='<div class="col-xs-4 text-right icon">';
                        html+='<a href="javascript:togglePower();">';
                            html+='<img src="apps/coffee/'+ status.toLowerCase() +'.png" height="60" width="60"/>';
                        html+='</a>';
                html+='</div>';
            html+='</div>';
        html+='</div>';
        html+='<div class="panel-footer">';
            html+='<a href="javascript:makeLargeCoffee();">';
                html+='<span class="pull-left"><img src="apps/coffee/coffee_large.png" height="50" width="50"/></span>';
            html+='</a>';
            html+='<a href="javascript:makeSmallCoffee();">';
                html+='<span class="pull-right"><img src="apps/coffee/coffee_small.png" height="50" width="50"/></span>';
            html+='</a>';
        html+='</div>';
    html+='</div>';
    return html;
}*/

function coffeeStatus() {
    var status = "err"
    $.ajax({
	    url: _HOST_DOMOTICZ+'/json.htm?type=devices&rid='+coffeeMachineStatusIdx+'&jsoncallback=?',
	    type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
        success: function(data) {
            status = data.result[0]['Data'];
        },        
    });
    return status;
}

function makeLargeCoffee() {
    switchDevice(largeCoffeeIdx, 'On');
}

function makeSmallCoffee() {
    switchDevice(smallCoffeeIdx, 'On');
}

function togglePower() {
    if (coffeeStatus() == "off") {
        switchDevice(powerIdx, 'On');
    } else {
        switchDevice(powerIdx, 'Off');
    }
}

function switchDevice(device, status) {
    console.log(_HOST_DOMOTICZ+'/json.htm?type=command&param=switchlight&idx=' + device + '&switchcmd=' + status+'&jsoncallback=?')
    $.ajax({
	    url: _HOST_DOMOTICZ+'/json.htm?type=command&param=switchlight&idx=' + device + '&switchcmd=' + status+'&jsoncallback=?',
	    type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
	     error: function(XMLHttpRequest, textStatus, errorThrown) { 
        alert("Status: " + textStatus); alert("Error: " + errorThrown); 

    },
    success: function(data) {
            console.log(data)
        }           
	    
    });
}

/*
blocks['switch']='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="device[IDX]">';
	blocks['switch']+='<div class="panel panel-block panel-default panel-switch [DEVICEACTIVE]" data-idx="[IDX]">';
		blocks['switch']+='<div class="panel-heading [HEADERCLASS]">';
			blocks['switch']+='<div class="row">';
				blocks['switch']+='<div class="col-xs-8">';
					blocks['switch']+='<div class="huge">[CURRENT]</div>';
					blocks['switch']+='<div>[NAME]</div>';
				blocks['switch']+='</div>';
				blocks['switch']+='<div class="col-xs-4 text-right icon">';
					blocks['switch']+='<i class="mainicon [ICON] [ICONCLASS]"></i>';
				blocks['switch']+='</div>';
			blocks['switch']+='</div>';
		blocks['switch']+='</div>';

		blocks['switch']+='<a href="javascript:[SWITCH_FUNCTION]([IDX]);">';
			blocks['switch']+='<div class="panel-footer">';
				blocks['switch']+='<span class="pull-left">[LANG_SWITCH][CURRENT_DATE]</span>';
				blocks['switch']+='<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>';
				blocks['switch']+='<div class="clearfix"></div>';
			blocks['switch']+='</div>';
		blocks['switch']+='</a>';
		
	blocks['switch']+='</div>';
blocks['switch']+='</div>';*/
