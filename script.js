const initialContacts = [
    { name: "Amélie Laurent", role: "Photographe", phone: "0612345678", email: "amelie@exemple.fr", color: "#ef6475" },
    { name: "Lucas Martin", role: "Client · Portrait", phone: "0623456789", email: "lucas@exemple.fr", color: "#39a8f5" },
    { name: "Sofia Benali", role: "Maquilleuse", phone: "0634567890", email: "sofia@exemple.fr", color: "#e5a73e" },
    { name: "Thomas Leroy", role: "Vidéaste", phone: "0645678901", email: "thomas@exemple.fr", color: "#7856f5" }
];

const stored = JSON.parse(localStorage.getItem("artiste-contacts") || "null");
let contacts = stored || initialContacts;

const list = document.querySelector("#contacts");
const empty = document.querySelector("#empty");
const template = document.querySelector("#contact-template");

function initials(name) {
    return name.split(" ").map(x => x[0]).slice(0, 2).join("").toUpperCase();
}

function save() {
    localStorage.setItem("artiste-contacts", JSON.stringify(contacts));
}

function render() {
    list.replaceChildren();

    contacts.forEach((c) => {
        const node = template.content.cloneNode(true);
        const card = node.querySelector(".contact-card");

        node.querySelector(".avatar").textContent = initials(c.name);
        node.querySelector(".avatar").style.setProperty("--color", c.color);
        node.querySelector(".role").textContent = c.role;
        node.querySelector(".name").textContent = c.name;

        const email = node.querySelector(".email");
        email.textContent = c.email || "E-mail non renseigné";
        if (c.email) email.href = `mailto:${c.email}`;

        const call = node.querySelector(".call");
        call.href = `tel:${c.phone}`;

        card.querySelector(".delete").onclick = () => {
            contacts = contacts.filter(x => x !== c);
            save();
            render();
        };

        list.append(node);
    });

    empty.hidden = contacts.length !== 0;
}

render();