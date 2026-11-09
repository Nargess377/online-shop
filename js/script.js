$(document).ready(function () {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    $("#password").on("keyup", function () {
        let val = $(this).val();
        let indicator = $("#strengthIndicator");

        if (val.length === 0) {
            indicator.text("");
        } else if (val.length < 6) {
            indicator.text("Weak Password").removeClass("medium strong").addClass("weak");
        } else if (val.length >= 6 && val.length < 10) {
            indicator.text("Medium Password").removeClass("weak strong").addClass("medium");
        } else {
            indicator.text("Strong Password").removeClass("weak medium").addClass("strong");
        }
    });

    $("#confirmPassword").on("keyup", function () {
        let pass = $("#password").val();
        let confirm = $(this).val();
        if (confirm !== pass) {
            $("#confirmError").text("Passwords do not match.").addClass("error-msg");
        } else {
            $("#confirmError").text("Passwords match.").removeClass("error-msg").addClass("success-msg");
        }
    });

    $("#regForm").submit(function (event) {
        event.preventDefault();
        let isValid = true;

        if ($("#name").val().trim() === "") {
            $("#nameError").text("Name is required.");
            isValid = false;
        } else {
            $("#nameError").text("");
        }

        if (!emailRegex.test($("#email").val())) {
            $("#emailError").text("Please enter a valid email.");
            isValid = false;
        } else {
            $("#emailError").text("");
        }

        if ($("#password").val().length < 6) {
            isValid = false;
        }

        if ($("#password").val() !== $("#confirmPassword").val()) {
            isValid = false;
        }

        if (isValid) {
            alert("Registration Successful!");
            $("#regForm")[0].reset();
            $("#strengthIndicator").text("");
            $("#confirmError").text("");
        } else {
            alert("Please fix the errors before submitting.");
        }
    });

    $("#addProductBtn").click(function () {
        let name = $("#newProductName").val().trim();
        let price = $("#newProductPrice").val().trim();

        if (name !== "" && price !== "") {
            let row = `<tr>
                <td>${name}</td>
                <td>${price}</td>
                <td>
                    <button class="btn btn-sm btn-warning edit-btn">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn">Delete</button>
                </td>
            </tr>`;

            $("#productTableBody").append(row);
            $("#newProductName").val("");
            $("#newProductPrice").val("");
        } else {
            alert("Please fill in both fields.");
        }
    });

    $("#productTableBody").on("click", ".delete-btn", function () {
        if (confirm("Are you sure you want to delete this product?")) {
            $(this).closest("tr").remove();
        }
    });

    $("#productTableBody").on("click", ".edit-btn", function () {
        let row = $(this).closest("tr");
        let currentName = row.find("td").eq(0).text();
        let currentPrice = row.find("td").eq(1).text();

        let newName = prompt("Edit Product Name:", currentName);
        let newPrice = prompt("Edit Product Price:", currentPrice);

        if (newName !== null && newPrice !== null && newName !== "" && newPrice !== "") {
            row.find("td").eq(0).text(newName);
            row.find("td").eq(1).text(newPrice);
        }
    });

});