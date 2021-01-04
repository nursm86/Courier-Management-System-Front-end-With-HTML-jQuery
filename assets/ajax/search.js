$(document).ready(function () {
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#branch tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#release tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#employeelist tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#service tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
    $("#see").on("change", function() {
        var value = $(this).val().toLowerCase();
        $("#employeelist tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#customers tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    $("#see").on("change", function() {
        var value = $(this).val().toLowerCase();
        $("#customers tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});