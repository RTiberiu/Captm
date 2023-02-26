gsap.registerPlugin(MotionPathPlugin);


let interestPoints = {
    'port1': [0, 3, "Port 1"],
    'port2': [5, 8, "Port 2"],
    'port3': [12, 1, "Port 3"],
    'oilrig1': [2, 6, "Oil Rig 1"],
    'oilrig2': [3, 2, "Oil Rig 2"],
    'oilrig3': [6, 4, "Oil Rig 3"],
    'oilrig4': [9, 7, "Oil Rig 4"],
    'oilrig5': [11, 3, "Oil Rig 5"],
}


var routes = [] // the routes will be saved here
var nrOfRows = 0

function addNewRow() {
    nrOfRows++;  
}





$(document).ready(function () {
    $(".fillWithPlatforms").each(function () {
        if ($(this).hasClass("only-one")) {
            $(this).append(`<option value="none">End</option>`);
        } else {
            $(this).append(`<option value="none">Start</option>`);
        }

        for (let key in interestPoints) {
            $(this).append(`<option value="${key}">${interestPoints[key][2]}</option>`);
        }
    });

    setCloudOnGrid(2,6);



     setCloudOnGrid(3,4);
     setCloudOnGrid(5,6);

     setInterval(toggleClouds, 1000);
    $("#add-trip").click(addNewInputToForm);

    addNewInputToForm();

    $("#start-trip").click(startTrip);

    for (let point in interestPoints) {
        if (Object.hasOwn(interestPoints, point)) {
            setItemOnGrid(interestPoints[point][0], interestPoints[point][1], interestPoints[point][2]);
        }
    }

    //sendShipFromTo("port2", "oilrig5");
});

function setShipCargo(cargoCount) {
    const cargo = $("#ship-cargo");

    // clear the cargo
    cargo.html("");

    // add 1 div per cargoCount
    for (let i = 0; i < cargoCount; i++) {
        cargo.append(`<div></div>`);
    }

}

let lastSidebarStats = null;

function setSidebarStats(data) {
    let {total, clientData, trip} = data;

    // count up to new total over time
    gsap.to("#total-emissions-count", {
        duration: 3,
        value: total,
        onUpdate: function () {
            $("#total-emissions-count").html(Math.floor(this.target.value));
        },
    });

    for (let i = 0; i < clientData.length; i++) {
        const client = clientData[i];

        // check if element already exists
        if ($(`#client-${i}`).length === 0) {
            $("#stats-client-values").append(`<div class="stats-client-value" id="client-${i}">
                <p class="stats-sidebar-header">Client Value 1</p>
                <p class="stats-sidebar-value"><span class="value1"></span></p>
                <p class="stats-sidebar-header">Client Value 2</p>
                <p class="stats-sidebar-value"><span class="value2"></span></p>
            </div>`);
        }

        // count up to new total over time
        gsap.to(`#client-${i}>.value1`, {
            duration: 3,
            value: client[0],
            onUpdate: function () {
                $(`#client-${i}>.value1`).html(Math.floor(this.target.value));
            },
        });

        gsap.to(`#client-${i}>.value2`, {
            duration: 3,
            value: client[1],
            onUpdate: function () {
                $(`#client-${i}>.value1`).html(Math.floor(this.target.value));
            },
        });
    }

    $("#current-trip").text(trip);
}

function startTrip() {
    const all = $(".routing-info-all");

    const allForms = all.find(".routing-info:not(.hidden)");

    let data = [];

    for (let i = 0; i < allForms.length; i++) {
        const form = allForms.eq(i);

        const start = form.find(".start").val();
        const end = form.find(".end").val();
        const quantity = parseInt(form.find(".quantity").val());

        if (start === "none" || end === "none" || quantity === 0) {
            alert("Please fill out all fields");
            return;
        }

        if (quantity % 10 !== 0) {
            alert("Quantity must be a multiple of 10");
            return;
        }

        let distance = Math.sqrt((Math.abs(interestPoints[end][0] - interestPoints[start][0])) ** 2 + (Math.abs(interestPoints[end][1] - interestPoints[end][0])) ** 2)


        data.push({
            start: start,
            quantity: quantity,
            end: end,
            distance: distance,
            emissions: distance * quantity * 0.5
        });
    }

    // todo hook this up to the calculation part
    console.log(JSON.stringify(data));
}

function setItemOnGrid(x, y, item) {
    const grid = $(".map-inner");

    // grid starts from bottom left (0, 0) to top right (12, 8)
    // position item absolutely and set the top and left to the correct position using percentage
    const newCell = $(`<div class="map-cell ${item.toLowerCase().replaceAll(" ", "-")}" style="top: ${y * 95 / 8}%; left: ${x * 95 / 12}%;">
         ${item.includes("Port") ? `<img src="Port.png" alt="Port" />` : `<img src="Rig.png" alt="Rig" />` }
    </div>`);

    grid.append(newCell);
}

function getItemPositionOnGrid(x, y) {
    // return x, y coords corresponding to that position on the grid
    return [x * 95 / 12, y * 95 / 8];
}

// Given two interestPoints (start and end), show a box that covers the area between them
function sendShipFromTo(start, end, sidebarStats) {
    const startCoords = interestPoints[start];
    const endCoords = interestPoints[end];

    const startXY = getItemPositionOnGrid(startCoords[0], startCoords[1]);
    const endXY = getItemPositionOnGrid(endCoords[0], endCoords[1]);

    // need to work out which one comes first in the x and y-axis
    // then set the top and left to the start position
    // then set the width and height to the difference between the two
    const top = Math.min(startXY[1], endXY[1]);
    const left = Math.min(startXY[0], endXY[0]);
    const width = Math.abs(startXY[0] - endXY[0]);
    const height = Math.abs(startXY[1] - endXY[1]);

    // need to work out which way the svg needs to have the curve going. One of the following:
    // Up and then left
    // Up and then right
    // Down and then left
    // Down and then right
    const direction = startXY[0] < endXY[0] ? "right" : "left";
    const curve = startXY[1] < endXY[1] ? "down" : "up";

    // apply this to #animation-container
    const animationContainer = $("#animation-container");
    animationContainer.css("top", top + "%");
    animationContainer.css("left", left + "%");
    animationContainer.css("width", width + "%");
    animationContainer.css("height", height + "%");

    const svgName = "./Paths/" + curve + direction + ".svg";

    if (direction === "left") {
        // flip ship horizontally
        $("#ship").css("transform", "scaleX(-1)");
    } else {
        $("#ship").css("transform", "scaleX(1)");
    }

    // load the correct svg into a variable
    $.get(svgName, function (data) {
        // Get the path tag, ignore the rest
        const svg = $(data).find('path');

        svg.id = "path";

        $("#svg-path").html(svg);

        animationContainer.css("display", "block");

        gsap.to("#ship", {
            duration: 3,
            repeat: 0,
            yoyo: false,
            ease: "power1.linear",
            motionPath:{
                path: "#path",
                align: "#path",
                autoRotate: true,
                alignOrigin: [0.5, 0.5]
            }
        });

        sidebarStats && setSidebarStats(sidebarStats);
    });
}

function addNewInputToForm() {
    const all = $(".routing-info-all");

    const form = $('.routing-info.hidden');

    const newForm = form.clone();

    newForm.removeClass("hidden");

    all.append(newForm);
}


function drawCloud() {
    document.querySelector('.svg-wrapper svg').classList.add('active');
}

function toggleClouds() {
    $('.svg-wrapper svg').toggleClass("active");
}

function setCloudOnGrid(x, y) {
    var str = `.map-weather-grid-${x}-${y}`
    const grid = $(`${str}`);
    const newCloud = $(`
    <div class="svg-wrapper">
        
    <!--?xml version="1.0" encoding="iso-8859-1"?-->
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->

<svg fill="#000000" height="100%" width="100%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 385.407 385.407" xml:space="preserve">
<g>
	<path d="M124.704,259.055c-5.523,0-10,4.478-10,10v44c0,5.522,4.477,10,10,10s10-4.478,10-10v-44
		C134.704,263.532,130.227,259.055,124.704,259.055z" class="svg-elem-1"></path>
	<path d="M124.704,195.055c-5.523,0-10,4.478-10,10v33c0,5.522,4.477,10,10,10s10-4.478,10-10v-33
		C134.704,199.532,130.227,195.055,124.704,195.055z" class="svg-elem-2"></path>
	<path d="M124.704,337.055c-5.523,0-10,4.478-10,10v13c0,5.522,4.477,10,10,10s10-4.478,10-10v-13
		C134.704,341.532,130.227,337.055,124.704,337.055z" class="svg-elem-3"></path>
	<path d="M213.704,239.055c-5.523,0-10,4.478-10,10v36c0,5.522,4.477,10,10,10s10-4.478,10-10v-36
		C223.704,243.532,219.227,239.055,213.704,239.055z" class="svg-elem-4"></path>
	<path d="M213.704,308.055c-5.523,0-10,4.478-10,10v42c0,5.522,4.477,10,10,10s10-4.478,10-10v-42
		C223.704,312.532,219.227,308.055,213.704,308.055z" class="svg-elem-5"></path>
	<path d="M213.704,193.055c-5.523,0-10,4.478-10,10v13c0,5.522,4.477,10,10,10s10-4.478,10-10v-13
		C223.704,197.532,219.227,193.055,213.704,193.055z" class="svg-elem-6"></path>
	<path d="M258.704,194.055c-5.523,0-10,4.478-10,10v13c0,5.522,4.477,10,10,10s10-4.478,10-10v-13
		C268.704,198.532,264.227,194.055,258.704,194.055z" class="svg-elem-7"></path>
	<path d="M258.704,241.055c-5.523,0-10,4.478-10,10v13c0,5.522,4.477,10,10,10s10-4.478,10-10v-13
		C268.704,245.532,264.227,241.055,258.704,241.055z" class="svg-elem-8"></path>
	<path d="M258.704,290.055c-5.523,0-10,4.478-10,10v13c0,5.522,4.477,10,10,10s10-4.478,10-10v-13
		C268.704,294.532,264.227,290.055,258.704,290.055z" class="svg-elem-9"></path>
	<path d="M258.704,337.055c-5.523,0-10,4.478-10,10v13c0,5.522,4.477,10,10,10s10-4.478,10-10v-13
		C268.704,341.532,264.227,337.055,258.704,337.055z" class="svg-elem-10"></path>
	<path d="M169.704,194.055c-5.523,0-10,4.478-10,10v13c0,5.522,4.477,10,10,10s10-4.478,10-10v-13
		C179.704,198.532,175.227,194.055,169.704,194.055z" class="svg-elem-11"></path>
	<path d="M169.704,241.055c-5.523,0-10,4.478-10,10v13c0,5.522,4.477,10,10,10s10-4.478,10-10v-13
		C179.704,245.532,175.227,241.055,169.704,241.055z" class="svg-elem-12"></path>
	<path d="M169.704,290.055c-5.523,0-10,4.478-10,10v13c0,5.522,4.477,10,10,10s10-4.478,10-10v-13
		C179.704,294.532,175.227,290.055,169.704,290.055z" class="svg-elem-13"></path>
	<path d="M169.704,337.055c-5.523,0-10,4.478-10,10v13c0,5.522,4.477,10,10,10s10-4.478,10-10v-13
		C179.704,341.532,175.227,337.055,169.704,337.055z" class="svg-elem-14"></path>
	<path d="M336.344,130.546c1.766-7.314,2.659-14.72,2.659-22.073c0-51.347-41.774-93.121-93.121-93.121
		c-20.261,0-39.524,6.398-55.706,18.502c-15.356,11.486-27.005,27.766-32.89,45.932c-0.007,0-0.014-0.001-0.021-0.001
		c-1.081-0.073-2.307-0.156-3.64-0.156c-30.291,0-57.36,19.235-68.253,48.168c-4.234-0.763-8.552-1.149-12.861-1.149
		C32.528,126.648,0,159.368,0,199.352c0,39.864,32.331,71.703,72.149,72.703c0.045,0,0.09,0,0.135,0h14.607c5.523,0,10-4.478,10-10
		s-4.477-10-10-10h-14.38C43.557,252.055,20,228.308,20,199.352s23.557-52.608,52.511-52.608c3.553,0,7.113,0.315,10.579,1.028
		c9.324,1.919,17.467-2.438,20.26-10.818c7.433-22.311,27.638-37.313,50.276-37.313c0.656,0,1.448,0.048,2.287,0.104
		c0.988,0.067,2.108,0.14,3.305,0.15c5.417,0.07,14.736-1.594,16.863-13.101c0.017-0.093,0.033-0.184,0.05-0.273
		c9.621-30.613,37.626-51.169,69.752-51.169c40.319,0,73.121,32.802,73.121,73.121c0,6.921-1.015,13.929-3.017,20.828
		c-1.617,5.57-0.35,9.625,0.998,12.046c2.924,5.253,8.22,6.733,10.214,7.29l0.275,0.077c22.334,6.439,37.934,27.374,37.934,50.637
		c0,28.956-23.558,52.703-52.514,52.703h-20.281c-5.523,0-10,4.478-10,10s4.477,10,10,10h20.281
		c39.984,0,72.514-32.72,72.514-72.703C385.407,168.397,365.402,140.481,336.344,130.546z" class="svg-elem-15"></path>
</g>
</svg>
    </div>`);
    console.log("Cloud created");
    grid.append(newCloud);
    drawCloud();
}