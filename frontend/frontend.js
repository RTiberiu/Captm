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
});

function addNewInputToForm() {
    const all = $(".routing-info-all");

    const form = $('.routing-info.hidden');

    const newForm = form.clone();

    newForm.removeClass("hidden");

    all.append(newForm);
}