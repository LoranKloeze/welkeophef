(() => {

  async function main() {
    const ophefjesJson = await (await window.fetch('./ophefjes.json')).json();
    const template = await (await window.fetch('./article.tmpl')).text();
    const ophefSectie = document.querySelector('section.opheffen');

    ophefjesJson.forEach(ophefData => {
      const datum = new Date(ophefData.datum)
      const weekdag = datum.toLocaleDateString('nl', { weekday: 'long' })
      const datumCijfers = datum.toLocaleDateString('nl', { day: '2-digit', month: '2-digit', year: 'numeric' })
      const ophefId = `${ophefData.titel.substring(0, 20).toLowerCase().replaceAll(' ', '-').replaceAll('.', '-').replaceAll("'", "").replaceAll('"', '').replace(/-\s*$/, "")}-${ophefData.id}`
      const teVervangen = {
        titel: ophefData.titel,
        inhoud: ophefData.inhoud,
        twitterLink: ophefData.twitterLink,
        twitterLabel: ophefData.twitterLabel,
        weekdag: weekdag,
        datumCijfers: datumCijfers,
        datumISO: datum.toISOString(),
        ophefId: ophefId
      }

      ophefSectie.innerHTML += vulTemplate(template, teVervangen)

    });

    const hash = document.location.hash || null;
    const activeElement = document.querySelector(hash);

    if(activeElement) {
      activeElement.scrollIntoView({
        block: 'center',
        inline: 'center'
      });
    }

    const linkjes = document.querySelectorAll('.copy-link')
    linkjes.forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();

        const newHash = el.getAttribute('data-url');

        document.location.hash = newHash;
        navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${newHash}`)
      })
    })
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
