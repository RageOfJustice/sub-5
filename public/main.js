const ENDPOINT = "http://localhost:3000/api/";

$(function() {
  $(".load-orders-button").on("click", function() {
    $("#orders-body").empty();
    $.ajax(`${ENDPOINT}orders`, {
      dataType: "json"
    })
      .done(function(data) {
        console.log(data);
        if (data && data.forEach) {
          data.forEach(function(order) {
            $("#orders-body").append(
              `<tr id="tr${-order.identifier}"><td id=${
                order.identifier
              } class="order-identifier">${order.identifier}</td><td>${
                order.description
              }</td><td>${order.price}</td><td class="order-status">${
                order.status === 3
                  ? "Pending"
                  : order.status === 2
                    ? "Declined"
                    : "Accepted"
              }</td><td class="controls"><button class="accept-button">Accept</button><button class="decline-button">Decline</button></td></tr>`
            );
            $(`#tr${-order.identifier}`)
              .find(".accept-button")
              .on("click", function() {
                const $this = $(this);
                const parent = $this.closest("tr");
                $.ajax(`${ENDPOINT}orders/${order.identifier}/accept`, {
                  dataType: "json"
                }).done(function(data) {
                  console.log(data);
                  if (data && data.result) {
                    parent.children(".order-status").text("Accepted");
                  }
                });
              });
            $(`#tr${-order.identifier}`)
              .find(".decline-button")
              .on("click", function() {
                const $this = $(this);
                const parent = $this.closest("tr");
                $.ajax(`${ENDPOINT}orders/${order.identifier}/decline`, {
                  dataType: "json"
                }).done(function(data) {
                  console.log(data);
                  if (data && data.result) {
                    parent.children(".order-status").text("Declined");
                  }
                });
              });
          });
        }
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      });
  });
});
