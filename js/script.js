$(document).ready(function() {

    $("#addProductBtn").click(function() {
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

    $("#productTableBody").on("click", ".delete-btn", function() {
        if (confirm("Are you sure you want to delete this product?")) {
            $(this).closest("tr").remove();
        }
    });

    $("#productTableBody").on("click", ".edit-btn", function() {
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