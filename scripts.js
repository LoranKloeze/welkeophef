(() => {

  async function main() {
    const ophefjesJson = await (await window.fetch('/ophefjes.json')).json();
    const template = await (await window.fetch('/article.tmpl')).text();
    const ophefSectie = document.querySelector('section.opheffen');

    ophefjesJson.forEach(ophefData => {
      const datum = new Date(ophefData.datum)
      const weekdag = datum.toLocaleDateString('nl', { weekday: 'long' })
      const datumCijfers = datum.toLocaleDateString('nl', { day: '2-digit', month: '2-digit', year: 'numeric' })
      const teVervangen = {
        titel: ophefData.titel,
        inhoud: ophefData.inhoud,
        twitterLink: ophefData.twitterLink,
        twitterLabel: ophefData.twitterLabel,
        weekdag: weekdag,
        datumCijfers: datumCijfers,
        datumISO: datum.toISOString()
      }

      ophefSectie.innerHTML += vulTemplate(template, teVervangen)

    });
  }

  function vulTemplate(template, tokens) {
    let html = template;

    Object.keys(tokens).forEach(token => {
      const re = new RegExp(`{{${token}}}`, 'g');
      html = html.replace(re, tokens[token]);
    })
    return html;
  }

  window.addEventListener("DOMContentLoaded", main);
})();
