// CodeMzansi - myfirstscript.js (Part 3)
// This file is used by every page. Each function first checks that the
// page has the element it needs, so it only runs on the correct page.

// ---------- Data: the services we offer ----------
var services = [
    { name: "Computer basics and digital literacy", category: "Digital skills", weeks: 6, seats: 24,
      description: "Learn how to use a computer, manage files and use keyboard shortcuts." },
    { name: "Internet safety and communication", category: "Digital skills", weeks: 4, seats: 30,
      description: "Stay safe online and learn to use email and messaging." },
    { name: "Computer hardware and repair", category: "Hardware", weeks: 8, seats: 12,
      description: "Learn the parts of a computer, how they work and how to fix them." },
    { name: "Circuits and electronics basics", category: "Hardware", weeks: 8, seats: 10,
      description: "Understand circuits and safely repair electrical devices." },
    { name: "Introduction to software development", category: "Software", weeks: 10, seats: 15,
      description: "Write your first programs and improve your problem solving." },
    { name: "Careers and freelance tech repair", category: "Careers", weeks: 4, seats: 20,
      description: "Learn how to start a repair business or find an IT job." },
    { name: "E-waste awareness and recycling", category: "Community", weeks: 2, seats: 40,
      description: "Find out why e-waste is dangerous and how to recycle it." }
];

// ---------- Home page: modal (pop-up box) ----------
function setupModal() {
    $("#openModal").click(function () {
        $("#modal").fadeIn();
    });

    $("#closeModal").click(function () {
        $("#modal").fadeOut();
    });

    // clicking on the dark background also closes the modal
    $("#modal").click(function (event) {
        if (event.target.id == "modal") {
            $("#modal").fadeOut();
        }
    });
}

// ---------- About page: tabs ----------
function setupTabs() {
    $(".tabButtons button").click(function () {
        var tabId = $(this).data("tab");

        $(".tabButtons button").removeClass("activeTab");
        $(this).addClass("activeTab");

        $(".tabContent").hide();
        $("#" + tabId).fadeIn();
    });

    // show the first tab when the page loads
    $(".tabButtons button").first().click();
}

// ---------- Services page: accordion ----------
function setupAccordion() {
    $(".accordionTitle").click(function () {
        var text = $(this).next(".accordionText");

        // close the other answers, then open or close this one
        $(".accordionText").not(text).slideUp();
        text.slideToggle();
    });
}

// ---------- Services page: show, search, filter and sort ----------
function showServices() {
    if ($("#serviceList").length == 0) {
        return;
    }

    // fill the category drop-down with each category once
    var categories = [];
    for (var i = 0; i < services.length; i++) {
        if (categories.indexOf(services[i].category) == -1) {
            categories.push(services[i].category);
            $("#category").append("<option>" + services[i].category + "</option>");
        }
    }

    // build the list again every time the user searches, filters or sorts
    function updateList() {
        var searchText = $("#searchBox").val().toLowerCase();
        var chosenCategory = $("#category").val();
        var results = [];

        for (var i = 0; i < services.length; i++) {
            var s = services[i];
            var matchesSearch = (s.name + " " + s.description).toLowerCase().indexOf(searchText) != -1;
            var matchesCategory = (chosenCategory == "all" || s.category == chosenCategory);

            if (matchesSearch && matchesCategory) {
                results.push(s);
            }
        }

        // sort the results
        var sortBy = $("#sortBy").val();
        results.sort(function (a, b) {
            if (sortBy == "za") {
                return b.name.localeCompare(a.name);
            } else if (sortBy == "weeks") {
                return a.weeks - b.weeks;
            } else {
                return a.name.localeCompare(b.name);
            }
        });

        // create a card for each result
        $("#serviceList").empty();
        for (var j = 0; j < results.length; j++) {
            var card = $("<div class='card'></div>");
            card.append("<h3>" + results[j].name + "</h3>");
            card.append("<p><b>" + results[j].category + "</b> | " + results[j].weeks + " weeks | " + results[j].seats + " seats</p>");
            card.append("<p>" + results[j].description + "</p>");
            $("#serviceList").append(card);
        }

        if (results.length == 0) {
            $("#serviceList").append("<p>No services found. Try a different search.</p>");
        }
        $("#resultCount").text(results.length + " of " + services.length + " services shown");
    }

    $("#searchBox").on("input", updateList);   // runs every time the text changes
    $("#category").change(updateList);
    $("#sortBy").change(updateList);
    updateList();
}

// ---------- Enquiry page: form ----------
function setupEnquiryForm() {
    if ($("#enquiryForm").length == 0) {
        return;
    }

    // fill the service drop-down from the services array
    for (var i = 0; i < services.length; i++) {
        $("#service").append("<option value='" + i + "'>" + services[i].name + "</option>");
    }

    $("#enquiryForm").submit(function (event) {
        event.preventDefault();   // stop the page from reloading
        $(".error").text("");     // clear old error messages
        var valid = true;

        var name = $("#fullName").val().trim();
        var email = $("#email").val().trim();
        var phone = $("#phone").val().replace(/ /g, "");   // remove spaces
        var serviceNumber = $("#service").val();
        var people = Number($("#people").val());
        var message = $("#message").val();

        if (name.length < 2) {
            $("#nameError").text("Please enter your full name (at least 2 letters).");
            valid = false;
        }
        if (!/^[^ @]+@[^ @]+\.[a-z]{2,}$/i.test(email)) {
            $("#emailError").text("Please enter a valid email, for example name@example.com.");
            valid = false;
        }
        if (!/^0[0-9]{9}$/.test(phone)) {
            $("#phoneError").text("Please enter a 10 digit phone number starting with 0, for example 0788276619.");
            valid = false;
        }
        if (serviceNumber == "") {
            $("#serviceError").text("Please choose a service.");
            valid = false;
        }
        if (isNaN(people) || people < 1 || people > 50) {
            $("#peopleError").text("Please enter a number from 1 to 50.");
            valid = false;
        }
        if (message.length > 300) {
            $("#messageError").text("Please keep your message under 300 characters.");
            valid = false;
        }
        if (!$("#agree").is(":checked")) {
            $("#agreeError").text("Please tick the box to continue.");
            valid = false;
        }

        if (valid == false) {
            return;   // stop here and let the user fix the errors
        }

        // work out the response (cost and availability)
        var chosen = services[serviceNumber];
        var reply = "<h2>Thank you, " + name + "!</h2>";
        reply += "<p>Service: <b>" + chosen.name + "</b></p>";
        reply += "<p>Cost: this service is free of charge.</p>";

        if (people <= chosen.seats) {
            reply += "<p>Availability: there are " + chosen.seats + " seats left, so there is space for " + people + " people.</p>";
        } else {
            reply += "<p>Availability: only " + chosen.seats + " seats are left. We can add the other " + (people - chosen.seats) + " people to our waiting list.</p>";
        }
        reply += "<p>We will contact you within 3 working days.</p>";
        reply += "<p id='sendStatus'>Sending your enquiry...</p>";

        $("#response").html(reply).fadeIn();

        // send the form to the action URL with AJAX (no page reload)
        $.ajax({
            url: $("#enquiryForm").attr("action"),
            method: "POST",
            data: $("#enquiryForm").serialize(),
            headers: { "Accept": "application/json" },
            success: function () {
                $("#sendStatus").text("Your enquiry was sent to our team.");
                $("#enquiryForm")[0].reset();
            },
            error: function () {
                $("#sendStatus").text("We could not send your enquiry. Please email maxcatgr11@gmail.com instead.");
            }
        });
    });
}

// ---------- Contact page: form that builds an email ----------
function setupContactForm() {
    if ($("#contactForm").length == 0) {
        return;
    }

    $("#contactForm").submit(function (event) {
        event.preventDefault();
        $(".error").text("");
        var valid = true;

        var name = $("#fullName").val().trim();
        var email = $("#email").val().trim();
        var phone = $("#phone").val().replace(/ /g, "");
        var type = $("#messageType").val();
        var message = $("#message").val().trim();

        if (name.length < 2) {
            $("#nameError").text("Please enter your full name.");
            valid = false;
        }
        if (!/^[^ @]+@[^ @]+\.[a-z]{2,}$/i.test(email)) {
            $("#emailError").text("Please enter a valid email address.");
            valid = false;
        }
        if (!/^0[0-9]{9}$/.test(phone)) {
            $("#phoneError").text("Please enter a 10 digit phone number starting with 0.");
            valid = false;
        }
        if (type == "") {
            $("#typeError").text("Please choose the type of message.");
            valid = false;
        }
        if (message.length < 20 || message.length > 1000) {
            $("#messageError").text("Your message must be between 20 and 1000 characters.");
            valid = false;
        }

        if (valid == false) {
            return;
        }

        // build the email
        var subject = "CodeMzansi - " + type;
        var body = "Hello CodeMzansi team,\n\n" + message + "\n\nKind regards,\n" + name + "\nEmail: " + email + "\nPhone: " + phone;

        $("#emailSubject").text(subject);
        $("#emailBody").text(body);
        $("#sendEmail").attr("href", "mailto:maxcatgr11@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body));
        $("#emailBox").fadeIn();
    });
}

// ---------- Contact page: interactive map (Leaflet) ----------
function setupMap() {
    if ($("#map").length == 0) {
        return;
    }

    var map = L.map("map").setView([-26.2041, 28.0473], 10);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    L.marker([-26.2041, 28.0473]).addTo(map).bindPopup("CodeMzansi head office, Johannesburg").openPopup();
    L.marker([-26.2678, 27.8585]).addTo(map).bindPopup("Outreach site: Soweto");
    L.marker([-26.1043, 28.0991]).addTo(map).bindPopup("Outreach site: Alexandra");

    // show where the visitor is
    $("#findMe").click(function () {
        if (!navigator.geolocation) {
            $("#mapMessage").text("Your browser cannot find your location.");
            return;
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            L.marker([lat, lng]).addTo(map).bindPopup("You are here").openPopup();
            map.setView([lat, lng], 11);
            $("#mapMessage").text("");
        }, function () {
            $("#mapMessage").text("We could not find your location.");
        });
    });
}

// ---------- Run everything when the page has loaded ----------
$(document).ready(function () {
    setupModal();
    setupTabs();
    setupAccordion();
    showServices();
    setupEnquiryForm();
    setupContactForm();
    setupMap();
});
