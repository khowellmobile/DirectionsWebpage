// Base rest url. Methods include setLookup (store), getLookup (return history)
var restURL="http://howellk3.aws.csi.miamioh.edu/final.php?method=";
// Base MapQuest URL
var mapURL ="http://www.mapquestapi.com/directions/v2/route?key=qCM5zneBDwgAACfOXdHEBr7JUHpMAALp&from=";

function printMans(data) {
        for (var i = 0; i < data.route.legs[0].maneuvers.length; i++) {
		$("#log").append("<div class=row style=margin-top:20px>"); //starting row div

		// saving needed information
		var narr = data.route.legs[0].maneuvers[i].narrative;
		var dist = data.route.legs[0].maneuvers[i].distance;
		var time = data.route.legs[0].maneuvers[i].formattedTime;

		// last  maneuver has no map icon
		if (i < data.route.legs[0].maneuvers.length - 1) {
			var imgSrc = data.route.legs[0].maneuvers[i].mapUrl;
		} else {
			var imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeyxQVhEJiWdNCYmv4fGb-daj4dAAEYGw0OA&usqp=CAU";
		}

		$("#log").append("<div class=col-sm-6><p>" + narr  +
			 "</p><p>Distance: " + dist + " mi</p><p>Time: " + time + "</p></div>");

                $("#log").append("<div class=col-sm-6><img src=" + imgSrc + "></div></div>"); //ending row div
	}
}

function getDirections() {
        fromStreet = $("#fromStreet").val();
        fromCity = $("#fromCity").val();
        fromState = $("#fromState").val();
        fromPostal = $("#fromPostal").val();
        toStreet = $("#toStreet").val();
        toCity = $("#toCity").val();
        toState = $("#toState").val();
        toPostal = $("#toPostal").val();
        a=$.ajax({
                url: "https://www.mapquestapi.com/directions/v2/route",
                method: "GET",
                data: {
                        key: "qCM5zneBDwgAACfOXdHEBr7JUHpMAALp",
                        from: fromStreet + ", " + fromCity + ", " + fromState + " " + fromPostal,
                        to: toStreet + ", " + toCity + ", " + toState + " " + toPostal,
                }
        }).done(function(data) {
                $("#hello").html("success");
		printMans(data);
        }).fail(function(error) {
                $("#hello").html("Error");
		console.log("error",error.statusText);
        });
}

function testerFunc() {
        $("#hello").html("this is a test. if this works then the functions is runnig");
}
