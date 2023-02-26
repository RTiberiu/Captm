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

    $("#add-trip").click(addNewInputToForm);

    addNewInputToForm();

    $("#start-trip").click(startTrip);

    for (let point in interestPoints) {
        if (Object.hasOwn(interestPoints, point)) {
            setItemOnGrid(interestPoints[point][0], interestPoints[point][1], interestPoints[point][2]);
        }
    }
});

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

        data.push({
            start: start,
            quantity: quantity,
            end: end
        });
    }

    // todo hook this up to the calculation part
    console.log(data);
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

function addNewInputToForm() {
    const all = $(".routing-info-all");

    const form = $('.routing-info.hidden');

    const newForm = form.clone();

    newForm.removeClass("hidden");

    all.append(newForm);
}